import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker'; 

import bottomImage from './assets/bottom.png';

function UserDataScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleSaveData = () => {
    // Validate age
    if (age < 0 || age > 120) {
      showAlert('Invalid Age', 'Age must be between 0 and 120.');
      return; // Don't proceed with navigation
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert('Invalid Email', 'Please enter a valid email.');
      return; // Don't proceed with navigation
    }

    // If validations pass, navigate to DisplayData screen
    navigation.navigate('DisplayData', { name, age, email, avatar });
  };

  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: 'OK', onPress: () => console.log('OK pressed') }],
      { cancelable: false }
    );
  };

  const handleChooseAvatar = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
        compressImageQuality: 0.8,
        mediaType: 'photo',
      });

      setAvatar(image.path);
    } catch (error) {
      console.log('ImagePicker Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button title="Upload your photo" onPress={handleChooseAvatar} />
      {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}
      <Button title="Let's see our details!" onPress={handleSaveData} />
    
      <Image source={bottomImage} style={styles.bottomImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#98A2B3', 
  },
  avatar: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  bottomImage: {
    position: 'absolute', 
    bottom: 10,
    width: '100%', 
    height: 'auto', 
  },
});


export default UserDataScreen;
