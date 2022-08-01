class Place {
  constructor(graphQLData) {
    let place = graphQLData.place;
    this.title = place.title;
    this.slug = place.slug;
    this.location = place.location;
    this.pk = place.location.pk;
  }

  readableLine() {
    return `📍 ${this.title}`;
  }
}

export default Place;

/*
{
      "place": {
        "location": {
          "pk": "169269817014453"
          "name": "Indira Gandhi International Airport Terminal 3 Departure",
          "address": "D33, Terminal 3, Dial, Indira Gandhi International Airport",
          "city": "New Delhi",
          "short_name": "Indira Gandhi International Airport Terminal 3 Departure",
          "lng": 77.084780474484,
          "lat": 28.55509243407,
          "external_source": "facebook_places",
          "facebook_places_id": 169269817014453
        },
        "title": "Indira Gandhi International Airport Terminal 3 Departure",
        "subtitle": "D33, Terminal 3, Dial, Indira Gandhi International Airport, New Delhi",
        "media_bundles": [],
        "header_media": {},
        "slug": "indira-gandhi-international-airport-terminal-3-departure"
      },
      "position": 87
    }
 */