export class Place {
  constructor(title, imageUri, location, id) {
    this.title = title
    this.imageUri = imageUri
    this.address = location.address
    this.location = {lat: location.lat, lng: location.lng} // { lat: 0.2345, lng: 121.00858 }
    this.id = id
  }
}
