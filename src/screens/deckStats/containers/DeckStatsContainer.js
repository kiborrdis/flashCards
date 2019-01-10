import React from 'react';
import { Navigation } from 'react-native-navigation';
import withStorageData from 'shared/containers/withStorageData';
import withPreferences from 'shared/containers/withPreferences';
import { SHARE_DECK_ID } from 'shared/preferences';
import { getDeckStats, createTrial } from 'shared/storage/storageActions';
import { makeTrialScreen } from 'shared/navigation'; 
import DeckStats from '../components/DeckStats';

class DeckStatsContainer extends React.Component {
  constructor(props) {
    super(props);

    const { preferences, deckId } = props;

    this.state = {
      sharedDeck: preferences.getItem(SHARE_DECK_ID) === deckId,
    }
  }

  startNewTrial = async () => {
    const { deckId, storage, componentId, parentComponentId } = this.props;
    const trialId = await storage.performAction(createTrial(deckId));;
    
    Navigation.push(parentComponentId || componentId, makeTrialScreen(trialId));
  }

  registerAsShareDeck = () => {
    const { preferences, deckId } = this.props;

    preferences.setItem(SHARE_DECK_ID, deckId);

    this.setState({
      sharedDeck: true,
    });
  }

  constructChildProps() {
    const { data, loaded, deckId } = this.props;
    const { sharedDeck } = this.state;

    return {
      stats: data,
      loaded: this.props.loaded,
      deckId,
      sharedDeck,
      registerAsShareDeck: this.registerAsShareDeck,
      startNewTrial: this.startNewTrial,
    };
  }

  render() {
    return (
      <DeckStats {...this.constructChildProps()} />
    );
  }
}

export default withPreferences(
  withStorageData(
    ({ deckId }) => getDeckStats(deckId)
  )(DeckStatsContainer)
);
