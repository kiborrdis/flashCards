import React from 'react';
import { Navigation } from 'react-native-navigation';
import storageContext from '../storage/storageContext';

const withStorageData = rawActions => (Component) => {
  let actions = rawActions;

  if (!Array.isArray(rawActions)) {
    actions = [rawActions];
  }

  class WithStorageData extends React.Component {
    static contextType = storageContext;

    state = {
      loaded: false,
      data: [],
    }

    constructor(props) {
      super(props);

      if (props.componentId) {
        Navigation.events().bindComponent(this);
      }
    }

    componentDidAppear() {
      this.updateData();
    }

    componentDidMount() {
      this.updateData();
    }

    componentWillUnmount() {
      this.unmounted = true;
    }

    updateData = () => {
      const storage = this.context;
      const actionExecutionPromises = actions.map(actionCreator => storage.performAction(actionCreator(this.props)), []);

      return Promise.all(actionExecutionPromises).then((results) => {
        if (!this.unmounted) {
          this.setState({
            data: [...results],
            loaded: true,
          });
        }
      });
    }

    constructChildProps() {
      const { data, loaded } = this.state;
      let dataForComponent = data;

      if (actions.length === 1) {
        dataForComponent = data[0];
      }

      return {
        data: dataForComponent,
        loaded,
        updateData: this.updateData,
        storage: this.context,
        ...this.props,
      };
    }

    render() {
      return <Component {...this.constructChildProps()} />;
    }
  }

  return WithStorageData;
};

export default withStorageData;
