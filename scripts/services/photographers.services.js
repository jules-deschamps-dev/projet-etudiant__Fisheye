
/**
 * Met à disposition les methodes de récupérations de données photographes
 */
class PhotographersServices{
  photographers;

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
   * 
   * @returns {json || null} Retourne les informations d'un photographe
   */
  static async getPhotographerById() {
    try {
      if (!this.photographers) this.photographers = await this.getPhotographers();
      
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');

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
}

export default PhotographersServices;
