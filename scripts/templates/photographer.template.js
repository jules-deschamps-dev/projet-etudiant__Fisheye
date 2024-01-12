import MediaFactory from "../factories/media.factory.js";
import Element from "../helpers/element.helper.js";
import Photographer from "../pages/photographer.js";

class PhotographerTemplate {
  static generateHeader(photographer) {
    const photographer_information = document.querySelector('#photographer-information');

    new Element('h1', {}, photographer.name, photographer_information);
    new Element('span', { class: 'localisation' }, photographer.city + ', ' + photographer.country, photographer_information);
    new Element('span', { class: 'tagline' }, photographer.tagline, photographer_information);

    const photographer_img_container = document.querySelector('#photographer-img-container');
    new Element('img', { src: `assets/photographers/${photographer.portrait}`, alt : `${photographer.name}` }, '', photographer_img_container)
  }

  static generateMedia(media, folder) {
    let tabindex = 3;
    media.forEach(medium => {
      const img_container = new Element('div', { id: `media_${medium.id}`, class: "media", tabindex : tabindex }, '', document.querySelector('#photograph-media'));

      const mediumRender = MediaFactory.newMedia(medium, folder, img_container);
      mediumRender.addEventListener("click", () => Photographer.lightboxHandler(media, medium, folder));
      img_container.addEventListener("keydown", (event) => { if (event.key === "Enter") Photographer.lightboxHandler(media, medium, folder)})
      
      //TODO: mettre le likeHandle ici aussi
      
      const img_container_info = new Element('div', { class: 'media-info' }, '', img_container);
      new Element('span', {}, `${medium.title}`, img_container_info);
      new Element('span', { class: "likes"}, medium.likes, img_container_info);

      tabindex++;
    });
  }

  /**
  * Génère le footer
  */
  static generateFooter(media, photographerPrice) {
    const footer = document.querySelector("#photograph-footer");
    const likes = footer.querySelector(".likes");
    const price = footer.querySelector(".price");

    let totalLikes = 0;
    media.forEach(element => {
      totalLikes += element.likes;
    })
    likes.textContent = totalLikes;
    price.textContent = photographerPrice;

    return totalLikes;
  }
}

export default PhotographerTemplate;