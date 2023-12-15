class LightBox {
  media;
  baseUrl;
  imageIndex;

  constructor(media, id, baseUrl) {
    this.media = media;
    this.baseUrl = baseUrl;
    this.imageIndex = this.findIndex(id);
    this.printImage(this.imageIndex);

    document.querySelector("#chevron-right").addEventListener("click", () => this.printImage(Math.min(++this.imageIndex, this.media.length - 1)));
    document.querySelector("#chevron-left").addEventListener("click", () => this.printImage(Math.max(--this.imageIndex, 0)));
  }

  findIndex(id) {
    for (let i = 0; i < this.media.length; i++) {
      if (this.media[i].id == id) {
        return i;
      }
    }
  }

  printImage(index) {
    this.imageIndex = index;
    document.querySelector("#lightbox img").src = this.baseUrl + this.media[index].image;
  }
}

export default LightBox;