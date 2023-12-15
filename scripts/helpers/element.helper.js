
/**
 * 
 * Création et ajout d'élément dans le DOM
 */
class Element
{
  constructor(type, attributs = {}, text = '', parent){
    const element = document.createElement(type);
    for (const [key, value] of Object.entries(attributs)) {
      element.setAttribute(key, value);
    }
    element.textContent = text;
    parent.appendChild(element);

    return element;
  }
}

export default Element;