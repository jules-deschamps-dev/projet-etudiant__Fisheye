import Element from "../helpers/element.helper.js";


class MediaFactory {
  static newMedia(medium, folder, container, tabindex){
    if (medium.image) return new Element('img', {alt: `${medium.title}`, src: `assets/photographers_media/${folder}/${medium.image}`, tabindex : tabindex }, '', container);
    else if (medium.video) return new Element('video', {alt:`${medium.title}`, src: `assets/photographers_media/${folder}/${medium.video}`, 'type': 'video/mp4', preload: 'metadata' }, '', container);
  }
}

export default MediaFactory;