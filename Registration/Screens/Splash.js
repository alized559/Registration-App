import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
import auth from '@react-native-firebase/auth';

const Splash = ({navigation}) => {

  useEffect(() => {
    setTimeout(() => {
      auth().onAuthStateChanged((user) => {
        if (user) {
          navigation.navigate('Home');
        } else {
          navigation.navigate('Login');
        }
      });
    }, 5000);
  }, []);

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
      <Text style={styles.text}>From Ali</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 50,
    },
    
    image: {
        height: 100,
        width: 200,
        position: 'absolute',
        top: 220,
    },
});

export default Splash;