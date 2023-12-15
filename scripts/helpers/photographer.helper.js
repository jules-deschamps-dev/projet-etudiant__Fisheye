class PhotographerHelpers {
  constructor() {
    document.getElementById('tri').addEventListener('change', (e) => photographer.sortMedia(e.value));
  }
  static SortMedia(media, sort) {
    if (sort == "title") media.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort == "date") media.sort((a, b) => new Date(a.date) - new Date(b.date));
    else media.sort((a, b) => b.likes - a.likes);

    return media;
  }
}

export default PhotographerHelpers;