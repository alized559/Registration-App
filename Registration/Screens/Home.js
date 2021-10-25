import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import auth from '@react-native-firebase/auth';

const Home = ({navigation}) => {

  const Logout = () => {
    auth().signOut()
    .then(() => {
      navigation.navigate('Login');
    });
  }

  return(
    <View style={styles.container}>
      <FastImage
          style={styles.image}
          source={{
              uri: 'https://abcntechnologies.com/wp-content/uploads/2019/12/reactjs.png',
              headers: { Authorization: 'someAuthToken' },
              priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.welcome}>Welcome :)</Text>
      <TouchableOpacity
          style={styles.button}
          activeOpacity={0.5}
          onPress={Logout}>
          <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  welcome: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 18,
  },

  button: {
    backgroundColor: '#00bfff',
    borderWidth: 0,
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },

  buttonText: {
    color: 'white',
    paddingVertical: 7,
    fontSize: 16,
  },

  image: {
    height: 150,
    width: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
})

export default Home;