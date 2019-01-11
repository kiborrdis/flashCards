import { Navigation } from 'react-native-navigation';
import { TOPBAR_COLOR, BACKGROUND_COLOR, TEXT_COLOR } from 'shared/styles';
import {
  CARD, CARDS, DECKS, PROMPT, TRIAL, DECK_CARDS, DECK_STATS,
} from 'memoCards/src/shared/navigation';
import Decks from './decks';
import DeckStats from './deckStats';
import DeckCards from './deckCards';
import Card from './card';
import Trial from './trial';
import PromptModal from './promptModal';

export default screens = new Map();

screens.set(DECKS, Decks);
screens.set(PROMPT, PromptModal);
screens.set(CARD, Card);
screens.set(TRIAL, Trial);

screens.set(DECK_CARDS, DeckCards);
screens.set(DECK_STATS, DeckStats);
