import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../components/Button/Button'

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text><Button title={'Fawad'} onPress={()=> alert("Hello Fawad")}/></Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  