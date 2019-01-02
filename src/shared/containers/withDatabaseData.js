import React from 'react';
import { Navigation } from "react-native-navigation";
import database from '../database/Database';

const withDatabaseData = (makeQueryFromProps) => (Component) => {
  class WithDatabaseData extends React.Component {
    state = {
      loaded: false,
      data: null,
    }

    constructor(props) {
      super(props);

      Navigation.events().bindComponent(this);
    }

    componentDidAppear() {
      this.updateData();
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

    render() {
      const { data, loaded } = this.state;

      return <Component data={data} loaded={loaded} updateData={this.updateData} {...this.props} />;
    }
  }

  return WithDatabaseData;
}

export default withDatabaseData;
