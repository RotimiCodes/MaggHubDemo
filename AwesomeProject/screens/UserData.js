// UserDataScreen.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; 
import AppStyles from '../styles/AppStyles';

const UserDataScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); 
  const [error, setError] = useState('');

  const handleSaveUserData = () => {
    // Validate input data
    if (!name.trim()) {
      setError('Name is required');
      return;
    }

    if (!email.trim() || !validateEmail(email)) {
      setError('Invalid Email');
      return;
    }

    if (!age.trim() || !validateAge(age)) {
      setError('Invalid Age');
      return;
    }

    if (!selectedImage) {
      setError('Please upload an image');
      return;
    }

    // Reset error state
    setError('');

    const userData = { name, email, age, photo: selectedImage };
    navigation.navigate('DisplayData', { userData });
  };

  const validateEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateAge = (age) => {
    // Check if age is a valid integer
    return !isNaN(parseInt(age, 10));
  };

  const handleImageUpload = async () => {
    // Request permission to access camera roll
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please grant access to your camera roll to upload images.');
      return;
    }

    // Launch image picker and handle selected image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  return (
    <View style={AppStyles.container}>
      <View style={AppStyles.userDataContainer}>
        <TextInput
          style={AppStyles.input}
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={AppStyles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={AppStyles.input}
          placeholder="Enter Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        {error ? <Text style={AppStyles.errorText}>{error}</Text> : null}
        <TouchableOpacity style={AppStyles.button} onPress={handleImageUpload}>
          <Text style={AppStyles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
        {selectedImage && <Image source={{ uri: selectedImage }} style={AppStyles.image} />}
      </View>
      <TouchableOpacity style={AppStyles.button} onPress={handleSaveUserData}>
        <Text style={AppStyles.buttonText}>Save Data</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserDataScreen;
