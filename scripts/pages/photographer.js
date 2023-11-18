import PhotographersServices from '../services/photographers.services.js';

class Photographer {
  id; 

  constructor(id) {
    this.id = id;

    (async () => {
      try {
        const photographer = await PhotographersServices.getPhotographerById(this.id);
        this.printPhotographer(photographer)
      } catch (error) {
        console.error('Erreur lors de la récupération des données du photographe:', error);
      }
    })();
  }

  printPhotographer(data){
    const photographerHeader = document.querySelector('.photograph-header');
    const title = document.createElement('h1');
    title.textContent = data.name;
    photographerHeader.appendChild(title);
  }
}

new Photographer;