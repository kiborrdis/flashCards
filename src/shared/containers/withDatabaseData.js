import React from 'react';
import { withNavigation } from 'react-navigation';
import database from '../database/Database';

const withDatabaseData = (makeQueryFromProps) => (Component) => {
  class WithDatabaseData extends React.Component {
    state = {
      loaded: false,
      data: null,
    }

    constructor(props) {
      super(props);

      this.willFocusSubscription = props.navigation.addListener('willFocus', this.updateData);
    }

    componentWillUnmount() {
      this.willFocusSubscription.remove();
    }

    componentDidMount() {
      this.updateData();
    }

    updateData = () => {
      database.executeSql(makeQueryFromProps(this.props)).then((data) => {
        this.setState({
          loaded: true,
          data,
        })
      });
    }

    constructChildProps() {
      const { data, loaded } = this.state;
      const { navigation: _, ...restProps } = this.props;

      return {
        data,
        loaded,
        updateData: this.updateData,
        ...restProps,
      };
    }

    render() {
      return <Component {...this.constructChildProps()} />;
    }
  }

  return withNavigation(WithDatabaseData);
}

export default withDatabaseData;
