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
      <View style={styles.content}>
        {children}
      </View>

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
  content: {
    padding: 20,
  },
  topPanel: {
    width: '70%',
    flex: 1,
  },
  controlPanel: {
    height: 50,
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  }
});

export default CardLayout;
