import React from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, Platform, StyleSheet } from 'react-native';

const Button = ({ title, onPress }) => {
  // Choose the appropriate touchable component based on the platform
  const TouchableComponent = Platform.OS === 'ios' ? TouchableOpacity : TouchableHighlight;

  return (
    <TouchableComponent
      style={styles.button}
      activeOpacity={0.7} // Only for TouchableOpacity on iOS
      underlayColor="#DDDDDD" // Only for TouchableHighlight on Android
      onPress={onPress}
    >
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableComponent>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Platform.OS === 'ios' ? 'black' : 'green', // Change color based on platform
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    elevation: 2, // Android shadow
    shadowColor: 'rgba(0, 0, 0, 0.2)', // iOS shadow
    shadowOffset: { width: 2, height: 2 }, // iOS shadow
    shadowOpacity: 0.8, // iOS shadow
    shadowRadius: 4, // iOS shadow
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
