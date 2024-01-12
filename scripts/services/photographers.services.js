
/**
 * Met à disposition les methodes de récupérations de données photographes
 */
class PhotographersServices{

  /**
   * Récupère la liste de tout les photographes
   * @returns {array || null} Liste des photographes
   */
  static async getPhotographers() {
    try {
      const response = await fetch("./data/photographers.json");
      const { photographers } = await response.json();
      return photographers;
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      return [];
    }
  }



  /**
   * Récupère les informations d'un photographe
   * @returns {json || null} Retourne les informations d'un photographe
   */
  static async getPhotographerById(id) {
    try {
      if (!this.photographers) this.photographers = await this.getPhotographers();

      const photographer = this.photographers.find((photographer) => photographer.id == id);
      if (photographer) {
        return photographer;
      } else {
        console.log("Photographer not found");
        return null;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      return null;
    }
  }

  

  /**
   * Recupère tout les médias d'un photographe
   * @returns {json || null} Retourne les media d'un photographe
   */
  static async getPhotographersMedia(id) {
    try {
      const response = await fetch("./data/photographers.json");
      const { media } = await response.json();
      
      const photographer_media = media.filter((medium) => medium.photographerId == id);

      return photographer_media;
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
      return [];
    }
  }
}

export default PhotographersServices;
