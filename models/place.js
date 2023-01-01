export class Place {
  constructor(title, imageUri, location) {
    this.title = title
    this.imageUri = imageUri
    this.address = location.address
    this.location = {lat: location.lat, lng: location.lng} // { lat: 0.2345, lng: 121.00858 }
    this.id = new Date().toString() + Math.random().toString()
  }
}
