import React from 'react';
import { Navigation } from "react-native-navigation";
import withDatabaseData from 'memoCards/src/shared/containers/withDatabaseData';
import database from 'memoCards/src/shared/database/Database';
import { getDeckStats } from 'memoCards/src/shared/database/queryCreators';
import DeckStats from '../components/DeckStats';

class DeckStatsContainer extends React.Component {
  render() {
    const { data, loaded } = this.props;

    return (
      <DeckStats
        loaded={loaded} 
        data={data} 
      />
    );
  }
}

export default withDatabaseData(({ deckId }) => getDeckStats(deckId))(DeckStatsContainer);
