import React, { useContext }  from 'react'
import { View, Text } from 'react-native'

import Context from '../context';

export const Welcome = () => {
  const value = useContext(Context);

  return (
    <View>
        <Text>Welcome Person </Text>
    </View>
   
  )
}
