import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const LoadingWrapper = ({ loading, children }) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return children();
};

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default LoadingWrapper;
