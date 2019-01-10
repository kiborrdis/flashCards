import * as creators from './queryCreators'

const copy = input => input;
const extractSingleResult = data => data[0];

const createAction = (action) => (...args) => {
  return (executor) => action(executor, ...args);
}

const createSingleQueryAction = (queryCreator, resultParser = copy) => createAction((executor, ...args) => {
  return executor.executeQuery(queryCreator(...args)).then(resultParser);
});

export const createCardInDeck = createSingleQueryAction(creators.createCardInDeck);
export const createDeck = createSingleQueryAction(creators.createDeck);
export const getCardsFromDeck = createSingleQueryAction(creators.getCardsFromDeck);
export const getDecks = createSingleQueryAction(creators.getDecks);
export const createTrial = createSingleQueryAction(creators.createTrial);
export const getTrialCardsFromDeck = createSingleQueryAction(creators.getTrialCardsFromDeck);
export const updateCardViewAndMatch = createSingleQueryAction(creators.updateCardViewAndMatch);
export const updateTrialViewAndMatch = createSingleQueryAction(creators.updateTrialViewAndMatch);
export const updateDeck = createSingleQueryAction(creators.updateDeck);
export const updateCardSides = createSingleQueryAction(creators.updateCardSides);
export const deleteDeck = createSingleQueryAction(creators.deleteDeck);
export const deleteCard = createSingleQueryAction(creators.deleteCard);

export const getLastTrialForDeck = createSingleQueryAction(creators.getLastTrialForDeck, extractSingleResult);
export const getTrial = createSingleQueryAction(creators.getTrial, extractSingleResult);
export const getDeckStats = createSingleQueryAction(creators.getDeckStats, extractSingleResult);
export const getCard = createSingleQueryAction(creators.getCard, extractSingleResult);

export const getTrialWithCards = createAction(async (executor, trialId) => {
  const { getTrial, getTrialCardsFromDeck } = creators; 
  const trial = await executor.executeQuery(getTrial(trialId)).then(extractSingleResult);
  const cards = await executor.executeQuery(getTrialCardsFromDeck(trial.deckId, trial.numberOfCards));

  return {
    ...trial,
    cards,
  };
})
