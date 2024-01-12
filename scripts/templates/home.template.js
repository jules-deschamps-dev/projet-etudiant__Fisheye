import Element from "../helpers/element.helper.js";

/**
 * 
 * Création de thumbnail de chaque photographe
 */
class HomeTemplate {
  mainSection = document.querySelector(".photographer_section")
  constructor(photographer) {
    // destructuring
    const { name, portrait, id, country, city, tagline, price } = photographer;

    // creation de la structure du template
    const link = new Element('a', { href: `./photographer.html?id=${id}` }, '', this.mainSection);
    const article = new Element('article', {}, '', link)
    const img_container = new Element('div', { class: 'image-container' }, '', article);
    const details = new Element('div', { class: 'details' }, '', article);

    // ajout des éléments
    new Element('img', { src: `assets/photographers/${portrait}` }, '', img_container);
    new Element('h2', {}, photographer.name, details);
    new Element('span', { class: 'localisation' }, `${photographer.city}, ${photographer.country}`, details);
    new Element('span', { class: 'description' }, photographer.tagline, details);
    new Element('span', { class: 'price' }, photographer.price, details);
  }
}

export default HomeTemplate;