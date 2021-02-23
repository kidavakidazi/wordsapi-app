export default class WapiService {

  _apiBase = 'https://wordsapiv1.p.rapidapi.com/words/';


  async getData(wordName) {

    const API_KEY = `/.netlify/functions/getApiKey`
    const response = await fetch(`${this._apiBase}${wordName}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
        "x-rapidapi-key": `${API_KEY}`
      }
    });
    return await response.json();
  };

  getDefinition(wordName) {
    return this.getData(`${wordName}/definitions`)
      .then(res => res.definitions[0].definition);
  };

  getPartOfSpeech(wordName) {
    return this.getData(`${wordName}/definitions`)
      .then(res => res.definitions[0].partOfSpeech)
      .catch(() => 'No info');
  };

  getSynonyms(wordName) {
    return this.getData(`${wordName}/synonyms`)
      .then(res => res.synonyms)
      .catch(() => 'No info');
  };

  getAntonyms(wordName) {
    return this.getData(`${wordName}/antonyms`)
      .then(res => res.antonyms)
      .catch(() => 'No info');
  };

  getSimilar(wordName) {
    return this.getData(`${wordName}/similarTo`)
      .then(res => res.similarTo)
      .catch(() => 'No info');
  };

  getSyllables(wordName) {
    return this.getData(wordName)
      .then(res => res.syllables.list)
      .catch(() => 'No info');
  };

  getPronunciation(wordName) {
    return this.getData(wordName)
      .then(res => res.pronunciation.all)
      .catch(() => 'No info');
  };

  getTypeOf(wordName) {
    return this.getData(`${wordName}/typeOf`)
      .then(res => res.typeOf)
      .catch(() => 'No info');
  };
};
