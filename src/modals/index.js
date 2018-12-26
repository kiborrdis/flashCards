import { createStackNavigator, createAppContainer } from "react-navigation";
import NewDeckModal from './newDeck';

const ModalStack = createStackNavigator(
  {
    NewDeckModal: {
      screen: NewDeckModal,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    transparentCard: true,
  }
);

export default ModalStack;