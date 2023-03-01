import React, { useContext } from 'react'
import { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

import Context from '../context';

export const SignUp = ({ navigation, route }) => {
  const value = useContext(Context);

  const [ fname, setFname ] = useState('');
  const [ lname, setLname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const addProfile = () => {
    console.log('Adding profile...');
    console.log(fname, lname, email, password);
    value.setProfile({ FName: fname, LName: lname, Email: email, Password: password });
  }

  return (
    <View>
        <Text>SignUp</Text>

        <Text>First Name</Text>
        <TextInput editable value={fname} onChangeText={setFname} />

        <Text>Last Name</Text>
        <TextInput editable value={lname} onChangeText={setLname} />

        <Text>Email</Text>
        <TextInput editable value={email} onChangeText={setEmail} />

        <Text>Password</Text>
        <TextInput editable value={password} onChangeText={setPassword} />

        <Button title='Create Account' onPress={addProfile} />

    </View>
   
  )
}
