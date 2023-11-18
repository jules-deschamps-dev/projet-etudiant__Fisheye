import Element from "./template.js";

/**
 * 
 * Création de thumbnail de chaque photographe
 */
class PhotographersTemplate {
  constructor(data, parent) {
    // destructuring
    const { name, portrait, id, country, city, tagline, price } = data;

    // creation de la structure du template
    const link = new Element('a', { href: `./photographer.html?id=${id}` }, '', parent);
    const article = new Element('article', {}, '', link)
    const img_container = new Element('div', { class: 'image-container' }, '', article);
    const details = new Element('div', { class: 'details' }, '', article);

    // ajout des éléments
    new Element('img', { src: `assets/photographers/${portrait}` }, '', img_container);
    new Element('h2', {}, name, details);
    new Element('span', { class: 'localisation' }, `${city}, ${country}`, details);
    new Element('span', { class: 'description' }, tagline, details);
    new Element('span', { class: 'price' }, price, details);
  }
}

export default PhotographersTemplate;