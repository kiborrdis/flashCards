import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Button, StyleSheet,
} from 'react-native';

const ModalLayout = ({
  onApply, onCancel, title, children,
}) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>

      {children}

      <View style={styles.footer}>
        <Button onPress={onCancel} color="#888" title="Cancel" />
        <Button onPress={onApply} title="Apply" />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    margin: 20,
    minWidth: '80%',
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  footer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

ModalLayout.propTypes = {
  onApply: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ModalLayout;
