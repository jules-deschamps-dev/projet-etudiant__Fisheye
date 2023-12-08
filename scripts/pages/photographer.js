import PhotographersServices from '../services/photographers.services.js';
import PhotographerHelpers from '../helpers/photographer.helper.js'
import Element from '../templates/template.js';

class Photographer {
  photographer;
  media;
  mediaFolder;
  userLikes = [];
  photographMedia = document.querySelector('#photograph-media');

  constructor(id) {
    (async () => {
      this.photographer = await PhotographersServices.getPhotographerById(id);
      this.media = await PhotographersServices.getPhotographersMedia(id);
      this.mediaFolder = this.photographer.name.split(' ')[0].replace('-', ' ')

      this.generateHeader();
      this.generateMedia();
      this.generateFooter();
      this.likesInteractionHandler();
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

      // TODO: a mettre dans une factory
      if (medium.image) new Element('img', { src: `assets/photographers_media/${this.mediaFolder}/${medium.image}` }, '', img_container);
      else if (medium.video) new Element('video', { src: `assets/photographers_media/${this.mediaFolder}/${medium.video}`, 'type': 'video/mp4', preload: 'metadata' }, '', img_container)

      const img_container_info = new Element('div', { class: 'media-info' }, '', img_container);
      new Element('span', {}, `${medium.title}`, img_container_info);
      new Element('span', { class: "likes" }, medium.likes, img_container_info);
    });
  }

  /**
   * Génère le footer
   */
  generateFooter() {
    const footer = document.querySelector("#photograph-footer");
    footer.textContent = this.photographer.price
  }

  /**
   * Trie les medias selon le paramètre souhaité
   * @param {string} sort Type de trie
   */
  sortMedia(sort) {
    document.querySelector('#photograph-media').innerHTML = null;
    this.media = PhotographerHelpers.SortMedia(this.media, sort);
    this.generateMedia();
  }

  /**
   * Gestion des likes de l'utilisateur
   */
  likesInteractionHandler() {
    const likesCounter = document.querySelectorAll("#photograph-media .media-info .likes");
    likesCounter.forEach(element => {
      element.addEventListener('click', () => {
        const id = element.closest('.media').id.replace("media_", "");
        const medium = this.media.find(element => element.id === parseInt(id));
        
        this.userLikes.find(element => element.id === parseInt(id)) ? medium.likes-- : medium.likes++;
        this.userLikes.find(element => element.id === parseInt(id)) ? this.userLikes.pop(medium) : this.userLikes.push(medium);
        
        element.textContent = medium.likes;
      });
    });
  }
}

let photographer = new Photographer(new URLSearchParams(window.location.search).get('id'));

document.getElementById('tri').addEventListener('change', (e) => photographer.sortMedia(e.target.value));