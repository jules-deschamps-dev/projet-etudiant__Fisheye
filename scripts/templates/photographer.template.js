class PhotographerTemplate {

  constructor(photographer) {
    console.log(photographer)
    generateHeader(photographer);
  }

  generateHeader(photographer) {
    const photographer_information = document.querySelector('#photographer-information');

    new Element('h1', {}, photographer.name, photographer_information);
    new Element('span', { class: 'localisation' }, photographer.city + ', ' + photographer.country, photographer_information);
    new Element('span', { class: 'tagline' }, photographer.tagline, photographer_information);

    const photographer_img_container = document.querySelector('#photographer-img-container');
    new Element('img', { src: `assets/photographers/${photographer.portrait}` }, '', photographer_img_container)
  }
}

export default PhotographerTemplate;