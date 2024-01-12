
class Media {
  id;
  photographerId;
  title;
  image;
  likes;
  date;
  price;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.portrait = data.portrait;
    this.country = data.country;
    this.city = data.city;
    this.tagline = data.tagline;
    this.price = data.price;
  }
}

export default Media;