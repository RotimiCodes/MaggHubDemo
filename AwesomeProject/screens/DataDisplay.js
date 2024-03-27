// DisplayDataScreen.js
import React from 'react';
import { View, Text, Image } from 'react-native';
import AppStyles from '../styles/AppStyles';

const DisplayDataScreen = ({ route }) => {
  const { userData } = route.params;

  return (
    <View style={AppStyles.container}>
      <View style={AppStyles.userDataContainer}>
        <Text style={AppStyles.userDataText}>Name: {userData.name}</Text>
        <Text style={AppStyles.userDataText}>Email: {userData.email}</Text>
        <Text style={AppStyles.userDataText}>Age: {userData.age}</Text>
        {userData.photo && <Image source={{ uri: userData.photo }} style={AppStyles.image} />}
      </View>
    </View>
  );
};

export default DisplayDataScreen;
