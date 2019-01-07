import { TOPBAR_COLOR, BACKGROUND_COLOR, TEXT_COLOR } from 'shared/styles';

const topBarOptions = {
  background: {
    color: TOPBAR_COLOR,
  },
  title: {
    color: TEXT_COLOR,
  },
  backButton: {
    color: TEXT_COLOR,
  },
};

const layoutOptions = {
  backgroundColor: BACKGROUND_COLOR,
  orientation: ['portrait'],
};

export default {
  topBar: topBarOptions,
  layout: layoutOptions,
};
