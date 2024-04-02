import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

function DisplayDataScreen({ route }) {
  const { name, age, email, avatar } = route.params;

  return (
    <View style={styles.container}>
      {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Name: {name}</Text>
        <Text style={styles.text}>Age: {age}</Text>
        <Text style={styles.text}>Email: {email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  avatar: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginLeft: 20,
  },
  infoContainer: {
    marginLeft: 20, 
  },
  text: {
    marginTop: 30,
    fontSize: 18,
    marginBottom: 10,
    color: '#000000',
  },
});

export default DisplayDataScreen;
