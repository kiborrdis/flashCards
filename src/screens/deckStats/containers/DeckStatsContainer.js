import React from 'react';
import { Navigation } from 'react-native-navigation';
import withStorageData from 'shared/containers/withStorageData';
import { getDeckStats, createTrial } from 'shared/storage/storageActions';
import { makeTrialScreen } from 'shared/navigation'; 
import DeckStats from '../components/DeckStats';

class DeckStatsContainer extends React.Component {
  componentDidUpdate() {
    const { componentId, parentComponentId, loaded, data } = this.props;

    if (loaded) {
      Navigation.mergeOptions(parentComponentId, {
        topBar: {
          title: {
            text: data.name,
          }
        }
      });

      Navigation.mergeOptions(componentId, {
        topBar: {
          title: {
            text: data.name,
          }
        }
      });
    }
  }

  startNewTrial = async () => {
    const { deckId, storage, componentId, parentComponentId } = this.props;
    const trialId = await createTrial(storage, deckId);
    
    Navigation.push(parentComponentId || componentId, makeTrialScreen(trialId));
  }

  constructChildProps() {
    const { data, loaded, deckId } = this.props;

    return {
      stats: data,
      loaded: this.props.loaded,
      deckId,
      startNewTrial: this.startNewTrial,
    };
  }

  render() {
    return (
      <DeckStats {...this.constructChildProps()} />
    );
  }
}

export default withStorageData(
  (storage, { deckId }) => getDeckStats(storage, deckId)
)(DeckStatsContainer);
