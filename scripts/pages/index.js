import Photographer from '../models/photographer.model.js';
import PhotographersServices from '../services/photographers.services.js';
import HomeTemplate from '../templates/home.template.js';

class Index {
  /**
   * Récupère la liste de tout les photographes et les dispose dans le DOM
   */
  static async init() {
    const photographers = await PhotographersServices.getPhotographers();
    photographers.forEach((element) => {
      const photographer = new Photographer(element);
      new HomeTemplate(photographer);
    });
  }
}

Index.init();
