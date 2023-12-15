import PhotographersServices from '../services/photographers.services.js';
import PhotographerHelpers from '../helpers/photographer.helper.js'
import Element from '../helpers/element.helper.js';
import LightBox from '../templates/lightbox.template.js';
import MediaFactory from '../factrories/media.factory.js';
import PhotographerTemplate from '../templates/photographer.template.js';

class Photographer {
  photographer;
  media;
  mediaFolder;
  userLikes = [];
  photographMedia = document.querySelector('#photograph-media');

  _header;

  constructor(id) {
    (async () => {
      this.photographer = await PhotographersServices.getPhotographerById(id);
      this.media = await PhotographersServices.getPhotographersMedia(id);
      this.mediaFolder = this.photographer.name.split(' ')[0].replace('-', ' ');
      document.querySelector(".modal h2").innerHTML = `Contactez moi <br/> ${this.photographer.name}`;

      this.generateHeader();
      this.generateMedia();
      this.generateFooter();
    })();
  }

  /**
   * Gerer l'affichae d'informations du photographe
   * @param {JSON} data informations sur le photographe
   */
  generateHeader() {
    const photographer_information = document.querySelector('#photographer-information');
    new Element('h1', {}, this.photographer.name, photographer_information);
    new Element('span', { class: 'localisation' }, this.photographer.city + ', ' + this.photographer.country, photographer_information);
    new Element('span', { class: 'tagline' }, this.photographer.tagline, photographer_information);

    const photographer_img_container = document.querySelector('#photographer-img-container');
    new Element('img', { src: `assets/photographers/${this.photographer.portrait}` }, '', photographer_img_container)
  }

  /**
   * Ajoute les images au DOM
   * @param {JSON} medium Le Json contenant les informations sur l'image
   * @param {string} mediaFolder Le nom du dossier dans lequel ce trouve les images
   */
  generateMedia() {
    this.media.forEach(medium => {
      const img_container = new Element('div', { id : `media_${medium.id}`, class : "media"}, '', this.photographMedia);

      img_container.addEventListener("click", () => this.lightboxHandler(medium));

      
      // TODO: a mettre dans une factory
      //new MediaFactory(medium, this.mediaFolder, img_container);
      
      if (medium.image) new Element('img', { src: `assets/photographers_media/${this.mediaFolder}/${medium.image}` }, '', img_container);
      else if (medium.video) new Element('video', { src: `assets/photographers_media/${this.mediaFolder}/${medium.video}`, 'type': 'video/mp4', preload: 'metadata' }, '', img_container)
      

      const img_container_info = new Element('div', { class: 'media-info' }, '', img_container);
      new Element('span', {}, `${medium.title}`, img_container_info);
      new Element('span', { class: "likes" }, medium.likes, img_container_info);
    });
    this.likesInteractionHandler();
  }

  /**
   * Génère le footer
   */
  generateFooter() {
    const footer = document.querySelector("#photograph-footer");
    const likes = footer.querySelector(".likes");
    const price = footer.querySelector(".price");

    let totalLikes = 0;
    this.media.forEach(element => {
      totalLikes += element.likes;
    })
    likes.textContent = totalLikes;
    price.textContent = this.photographer.price;
  }

  lightboxHandler(medium){
    new LightBox(this.media, medium.id, `assets/photographers_media/${this.mediaFolder}/`)
    document.querySelector("#lightbox_modal").style.display = "flex";
  }

  /**
   * Trie les medias selon le paramètre souhaité
   * @param {string} sort Type de trie
   */
  sortMedia(sort) {
    this.photographMedia.innerHTML = "";
    this.media = PhotographerHelpers.SortMedia(this.media, sort);
    this.generateMedia();
  }

  /**
   * Gestion des likes de l'utilisateur
   */
  likesInteractionHandler() {
    // recupère la listes de tout le media sous forme de noeuds html
    const likesCounter = document.querySelectorAll("#photograph-media .media .media-info .likes");

    likesCounter.forEach(element => {
      element.addEventListener('click', () => {
        //récupère l'id de l'element
        const id = element.closest('.media').id.replace("media_", "");

        //recherche cet id dans les media
        const medium = this.media.find(element => element.id == id);
        
        // incremente ou décremente les likes du medium selon si l'id est déjà présent dans le tableau des likes de l'utilisateur
        this.userLikes.find(element => element.id == id) ? medium.likes-- : medium.likes++;
        this.userLikes.find(element => element.id == id) ? this.userLikes.pop(medium) : this.userLikes.push(medium);

        // met à jour le nombre de like dans le dom
        element.textContent = medium.likes;

        // regénère le footer
        this.generateFooter();
      });
    });
  }
}

let photographer = new Photographer(new URLSearchParams(window.location.search).get('id'));

document.getElementById('tri').addEventListener('change', (e) => photographer.sortMedia(e.target.value));