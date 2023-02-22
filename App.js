import * as React from 'react';
import { useState, useEffect, createContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SignUp } from './screens/SignUp';
import { Welcome } from './screens/Welcome';

import Context from './context';

const Stack = createNativeStackNavigator();


export default function App() {

  const [ hasProfile, setHasProfile ] = useState(false);
  const [ userProfile, setUserProfile ] = useState({});

  useEffect(() => {
    async function restoreProfile() {
      let permaInfo;
      permaInfo = await getData();

      if(permaInfo === null || permaInfo === {}) {
        permaInfo = { FName: '', LName: '', Email: '', Password: '' };
        setHasProfile(false);
        setUserProfile(permaInfo);
      } else {
        setHasProfile(true);
        setUserProfile(permaInfo);
      }
    }

    restoreProfile();

  }, [userProfile]);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      console.log(jsonValue);
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
  }
  
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }


  return (
    <Context.Provider value = {{ profile: userProfile, setProfile: setUserProfile, storeProfile: storeData }}>
      <NavigationContainer>
        <Stack.Navigator>
          {
            hasProfile ? (
              <Stack.Screen name="Welcome" component={Welcome} />
            ) : (
              <Stack.Screen name="SignUp" component={SignUp} />
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
