import React, { useContext }  from 'react'
import { View, Text, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Context from '../context';

export const Welcome = () => {
  const value = useContext(Context);

  const logOut = () => {
    console.log('Trying...');

    async function removeItemValue() {
      try {
          await AsyncStorage.removeItem('@storage_Key_rob9');
          value.logOut();
          return true;
      }
      catch(exception) {
          return false;
      }
  }
  removeItemValue();

  }

  return (
    <View>
        <Text>Welcome {value.profile.FName} </Text>


        <Button onPress={logOut} title="Logout" />
    </View>
   
  )
}
