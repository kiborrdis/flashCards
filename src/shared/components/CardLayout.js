import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BACKGROUND_COLOR } from '../styles';

const CardLayout = ({
  controlPanel,
  topPanel,
  children,
  error,
}) => (
    <View style={styles.container}>
      <View style={styles.topPanel}>
        {topPanel}
      </View>

     {children}

      <View style={styles.controlPanel}>
        {controlPanel}
      </View>
    </View>
)

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: BACKGROUND_COLOR,
  },
  topPanel: {
    height: 50,
    width: '70%',
  },
  controlPanel: {
    height: 50,
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default CardLayout;
