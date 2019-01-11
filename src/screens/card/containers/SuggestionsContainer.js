import React from 'react';
import PropTypes from 'prop-types';
import TranslationApi from 'shared/api/Translation';
import debounce from 'lodash/debounce';
import Suggestions from '../components/Suggestions';

class SuggestionsContainer extends React.Component {
  static propTypes = {
    frontside: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  state = {
    loaded: true,
    suggestions: [],
    lastSuggestionsLoadedFor: '',
  }

  componentDidMount() {
    const { frontside } = this.props;

    this.loadSuggestionsFor(frontside);
  }

  componentDidUpdate() {
    const { frontside } = this.props;
    const { lastSuggestionsLoadedFor } = this.state;

    if (frontside === '' && lastSuggestionsLoadedFor !== '') {
      this.resetSuggestions();
    }

    this.loadSuggestionsFor(frontside);
  }

  resetSuggestions = () => {
    this.setState({
      loaded: true,
      suggestions: [],
      lastSuggestionsLoadedFor: '',
    });
  }

  loadSuggestionsFor = debounce((text) => {
    const { lastSuggestionsLoadedFor } = this.state;

    if (lastSuggestionsLoadedFor === text) {
      return;
    }

    this.setState({ loaded: false, lastSuggestionsLoadedFor: text });

    TranslationApi.translate(text, 'en', 'ru').then((translations) => {
      this.setState({
        loaded: true,
        suggestions: translations.slice(0, 10),
        lastSuggestionsLoadedFor: text,
      });
    });
  }, 1000)

  handlePress = (index) => {
    const { onPress } = this.props;
    const { suggestions } = this.state;

    if (onPress) {
      onPress(suggestions[index]);
    }
  }

  constructChildProps() {
    const { loaded, suggestions } = this.state;

    return {
      suggestions,
      loaded,
      onPress: this.handlePress,
    };
  }

  render() {
    return (
      <Suggestions {...this.constructChildProps()} />
    );
  }
}

export default SuggestionsContainer;
