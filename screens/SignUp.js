import React, { useContext } from 'react'
import { useState } from 'react'
import { View, Text, TextInput, Button } from 'react-native'

import Context from '../context';

export const SignUp = () => {
  const value = useContext(Context);

  const [ fname, setFname ] = useState('');
  const [ lname, setLname ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const addProfile = () => {
    console.log('Adding profile...');
    value.setProfile({ FName: fname, LName: lname, Email: email, Password: password });
    value.storeProfile({ FName: fname, LName: lname, Email: email, Password: password });
  }

  return (
    <View>
        <Text>SignUp</Text>

        <Text>First Name</Text>
        <TextInput editable value={fname} onChange={setFname} />

        <Text>Last Name</Text>
        <TextInput editable value={lname} onChange={setLname} />

        <Text>Email</Text>
        <TextInput editable value={email} onChange={setEmail} />

        <Text>Password</Text>
        <TextInput editable value={password} onChange={setPassword} />

        <Button title='Create Account' onPress={addProfile} />

    </View>
   
  )
}
