import React, {useState, createRef} from 'react';
import {
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    Image,
    StyleSheet,
    View,
    Text,
    keyboardVerticalOffset
} from 'react-native';
import FastImage from 'react-native-fast-image';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const passwordRef = createRef();  
  
  const Submit = () => {
    if(!userEmail) {
        alert('Please enter your email');
        return;
    }
    else if (!userPassword) {
        alert('Please enter your password');
        return;
    }

    auth()
    .signInWithEmailAndPassword(userEmail, userPassword)
    .then(() => {
        navigation.navigate('Home');
    })
    .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
            alert('Email is already in use :(');
        }

        if (error.code === 'auth/user-not-found') {
            alert('Email Invalid :(');
        }

        if (error.code === 'auth/wrong-password') {
            alert('Password Incorrect :(');
        }
    });
    
  };

  return(
    <View style={styles.body}>
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
                flex: 1,
                justifyContent: 'center',
                alignContent: 'center',
        }}>
            <View>
                <KeyboardAvoidingView enabled>
                    <View style={{alignItems: 'center'}}>
                        <FastImage
                            style={styles.image}
                            source={{
                                uri: 'https://abcntechnologies.com/wp-content/uploads/2019/12/reactjs.png',
                                headers: { Authorization: 'someAuthToken' },
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>
                    <View style={styles.section}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(UserEmail) =>
                                setUserEmail(UserEmail)
                            }
                            placeholder="Enter email"
                            onSubmitEditing={() =>
                                passwordRef.current &&
                                passwordRef.current.focus()
                            }
                            keyboardType="email-address"
                            autoCapitalize="none"
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.section}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter password"
                            keyboardType="default"
                            ref={passwordRef}
                            onChangeText={(UserPassword) =>
                                setUserPassword(UserPassword)
                            }
                            onSubmitEditing={Keyboard.dismiss}
                            secureTextEntry={true}
                            returnKeyType="next"
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.5}
                        onPress={Submit}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                    <Text
                        style={styles.register}
                        onPress={() => navigation.navigate('Register')}>
                        New Here ? Register
                    </Text>
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },

    image: {
        height: 150,
        width: 200,
        resizeMode: 'contain',
    },

    input: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: 'white',
    },
    
    section: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
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
        paddingVertical: 8,
        fontSize: 16,
    },

    register: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
});

export default Login;