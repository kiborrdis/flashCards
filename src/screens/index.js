import { Navigation } from 'react-native-navigation';
import { TOPBAR_COLOR, BACKGROUND_COLOR, TEXT_COLOR } from 'shared/styles';
import Decks from './decks';
import DeckStats from './deckStats';
import DeckCards from './deckCards';
import NewCard from './newCard';
import Trial from './trial';
import PromptModal from './promptModal';
import { CARD, CARDS, DECKS, PROMPT, NEW_CARD, TRIAL, DECK_CARDS, DECK_STATS } from 'memoCards/src/shared/navigation';

export default screens = new Map();

screens.set(DECKS, Decks);
screens.set(PROMPT, PromptModal);
screens.set(NEW_CARD, NewCard);
screens.set(TRIAL, Trial);

screens.set(DECK_CARDS, DeckCards);
screens.set(DECK_STATS, DeckStats);

