import Element from "../helpers/element.helper.js";

class LightBox {
  media;
  baseUrl;
  imageIndex;

  constructor(media, id, baseUrl) {
    console.log(media, id, baseUrl)
    this.media = media;
    this.baseUrl = baseUrl;
    this.imageIndex = this.findIndex(id);
    this.printMedia(this.imageIndex);

    document.querySelector("#chevron-right").addEventListener("click", () => this.printMedia(Math.min(++this.imageIndex, this.media.length - 1)));
    document.querySelector("#chevron-left").addEventListener("click", () => this.printMedia(Math.max(--this.imageIndex, 0)));

    window.addEventListener("keydown", (event) => {
      // Vérifiez si la touche pressée est la touche que vous souhaitez utiliser (par exemple, la flèche gauche avec code 37)
      if (event.key === "ArrowLeft") {
        // Appelez la fonction printMedia avec le nouvel index
        this.printMedia(Math.max(--this.imageIndex, 0));
      }
      else if (event.key === "ArrowRight") {
        this.printMedia(Math.min(++this.imageIndex, this.media.length - 1))
      }
      else if (event.key === "Escape") {
        const modal = document.getElementById("lightbox_modal");
        modal.style.display = "none";
      }
    })
  }

  findIndex(id) {
    for (let i = 0; i < this.media.length; i++) {
      if (this.media[i].id == id) {
        return i;
      }
    }
  }

  printMedia(index) {
    document.querySelector("#lightbox #img-container").innerHTML = ""
    this.imageIndex = index;
    if (this.media[index].video) new Element("video", { src: this.baseUrl + this.media[index].video, 'type': 'video/mp4', controls: true, preload: 'auto', }, "", document.querySelector("#lightbox #img-container"));
    else new Element("img", { src: this.baseUrl + this.media[index].image }, "", document.querySelector("#lightbox #img-container"))
  }
}

export default LightBox;