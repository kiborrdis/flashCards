import Connector from './Connector';

const appLanguageToApiLanguage = {
  'ru': 'rus',
  'en': 'eng',
};

const constructTranslationParams = (text, fromLanguage, toLanguage) => {
  return {
    from: appLanguageToApiLanguage[fromLanguage],
    phrase: text,
    dest: appLanguageToApiLanguage[toLanguage],
    format: 'json',
    pretty: true
  };
}

class TranslationAPI {
  constructor(connector) {
    this.connector = connector;
  }

  translate(text = '', fromLanguage, toLanguage) {
    return this.connector.sendRequest(
      '/translate',
      constructTranslationParams(text.toLowerCase(), fromLanguage, toLanguage)
    ).then(this.parseTranslateResult);
  }

  parseTranslateResult({ json, status }) {
    let translations = [];

    if (json.tuc) {
      translations = json.tuc.reduce((memo, translation) => {
        if (translation.phrase) {
          memo.push(translation.phrase.text);
        }

        return memo;
      }, []);
    }

    return translations;
  }
}

const connector = new Connector('https://glosbe.com/gapi');

export default new TranslationAPI(connector);



