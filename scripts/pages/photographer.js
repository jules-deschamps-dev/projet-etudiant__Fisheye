import PhotographerHelpers from '../helpers/photographer.helper.js'
import PhotographersServices from '../services/photographers.services.js';
import LightBox from '../templates/lightbox.template.js';
import PhotographerTemplate from '../templates/photographer.template.js';

class Photographer {
  userLikes = [];
  photographMedia = document.querySelector('#photograph-media');
  mediaFolder;

  constructor(id) {
    (async () => {
      this.photographer = await PhotographersServices.getPhotographerById(id);
      this.media = await PhotographersServices.getPhotographersMedia(id);
      this.mediaFolder = this.photographer.name.split(' ')[0].replace('-', ' ');

      PhotographerTemplate.generateHeader(this.photographer);
      PhotographerTemplate.generateMedia(this.media, this.mediaFolder);
      PhotographerTemplate.generateFooter(this.media, this.photographer.price);

      document.querySelector(".modal h2").innerHTML = `Contactez moi <br/> ${this.photographer.name}`;

      this.media.forEach(element => {
        this.likesInteractionHandler(element);
      });
    })();
  }


  /**
   * Gère l'affichage des images dans la lightbox
   * @param {array} media 
   * @param {json} medium 
   * @param {string} mediaFolder 
   */
  static lightboxHandler(media, medium, mediaFolder) {
    new LightBox(media, medium.id, `assets/photographers_media/${mediaFolder}/`)
    document.querySelector("#lightbox_modal").style.display = "flex";
  }


  /**
   * Trie les medias selon le paramètre souhaité
   * @param {string} sort Type de trie
   */
  sortMedia(sort) {
    this.photographMedia.innerHTML = "";
    this.media = PhotographerHelpers.SortMedia(this.media, sort);
    PhotographerTemplate.generateMedia(this.media, this.mediaFolder);
  }


  /**
   * Gestion des likes de l'utilisateur
   */
  likesInteractionHandler(medium) {
    //TODO : mettre userLike ici
    const element = document.querySelector(`#media_${medium.id} .media-info .likes`);

    element.addEventListener('click', () => {
      // incremente ou décremente les likes du medium selon si l'id est déjà présent dans le tableau des likes de l'utilisateur
      this.userLikes.find(element => element.id == medium.id) ? medium.likes-- : medium.likes++;
      this.userLikes.find(element => element.id == medium.id) ? this.userLikes.pop(medium) : this.userLikes.push(medium);

      // met à jour le nombre de like dans le dom
      element.textContent = medium.likes;

      // regénère le footer
      PhotographerTemplate.generateFooter(this.media, this.photographer.price);
    });
  }
}

export default Photographer;


const id = new URLSearchParams(window.location.search).get('id');
const photographer = new Photographer(id);

document.getElementById('tri').addEventListener('change', (e) => photographer.sortMedia(e.target.value));