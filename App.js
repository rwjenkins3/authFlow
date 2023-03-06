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
      console.log(permaInfo)
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

  }, [hasProfile]);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      console.log(jsonValue);
      await AsyncStorage.setItem('@storage_Key_rob9', jsonValue)
    } catch (e) {
      // saving error
      console.log(e.message);
    }
  }
  
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key_rob9')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }

  const saveUserProfile = (user) => {
    console.log('In saveUserProfile. The user parameter is:');
    console.log(user);
    setUserProfile(user);
    storeData(user)
    setHasProfile(true);
  }

  const saveData = (user) => {
    console.log("Actually saving...");
    storeData(userProfile);
  }


  const logOut = () => {
    console.log('logging out');
    setHasProfile(false);
    setUserProfile({});
  }

  return (
    <Context.Provider value = {{ profile: userProfile, setProfile: saveUserProfile, storeProfile: saveData, logOut: logOut }}>
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
