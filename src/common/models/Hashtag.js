class Hashtag {
  constructor(graphQLData) {
    let hashtag = graphQLData.hashtag;
    this.name = hashtag.name;
    this.id = hashtag.id;
    this.mediaCount = hashtag.media_count;
    this.searchResultSubtitle = hashtag.search_result_subtitle;
  }

  readableLine() {
    return `#${this.name}` + `  (${this.searchResultSubtitle})`;
  }
}

export default Hashtag;

/*
{
      "position": 0,
      "hashtag": {
        "name": "bali",
        "id": 17841563530116038,
        "media_count": 54986201,
        "search_result_subtitle": "54.9m posts"
      }
    }
 */