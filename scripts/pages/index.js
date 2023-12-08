import PhotographersServices from '../services/photographers.services.js';
import PhotographersTemplate from '../templates/photographer.template.js';

class Index {
  /**
   * Récupère la liste de tout les photographes et les dispose dans le DOM
   */
  static async init() {
    const photographers = await PhotographersServices.getPhotographers();
    photographers.forEach((photographer) => {
      new PhotographersTemplate(photographer, document.querySelector(".photographer_section"));
    });
  }
}

export default Index;

//Index.init();
