class MediaFactory {

  constructor(medium, folder, container) {
    if (medium.image) new Element('img', { src: `assets/photographers_media/${folder}/${medium.image}` }, '', container);
    else if (medium.video) new Element('video', { src: `assets/photographers_media/${folder}/${medium.video}`, 'type': 'video/mp4', preload: 'metadata' }, '', container)
  }
}

export default MediaFactory;