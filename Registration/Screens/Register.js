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

const Register = ({navigation}) => {

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');

    const emailRef = createRef();
    const passwordRef = createRef();
    const confirmPassRef = createRef();

    const Submit = () => {
        if (!userEmail) {
            alert('Please enter your email');
            return;
        }
        else if (!userPassword) {
            alert('Please enter your password');
            return;
        }
        else if (!userConfirmPassword) {
            alert('Please confirm your password');
            return;
        }
        else if (userConfirmPassword != userPassword) {
            alert('Confirm password incorrect');
            return;
        }

        auth()
        .createUserWithEmailAndPassword(userEmail, userPassword)
        .then(() => {
            navigation.navigate('Home');
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                alert('Email is already in use :(');
            }

            if (error.code === 'auth/invalid-email') {
                alert('Email Invalid :(');
            }

            if (error.code === 'auth/weak-password') {
                alert('Password must be long :(');
            }
        });
        
    };
    
    return (
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
                            placeholder="Enter email"
                            onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                            keyboardType="email-address"
                            ref={emailRef}
                            onSubmitEditing={() =>
                                passwordRef.current &&
                                passwordRef.current.focus()
                            }
                            autoCapitalize="none"
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.section}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter password"
                            ref={passwordRef}
                            keyboardType="default"
                            onSubmitEditing={Keyboard.dismiss}
                            secureTextEntry={true}
                            onChangeText={(UserPassword) =>
                                setUserPassword(UserPassword)
                            }
                        />
                    </View>
                    <View style={styles.section}>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm password"
                            ref={confirmPassRef}
                            keyboardType="default"
                            onSubmitEditing={Keyboard.dismiss}
                            secureTextEntry={true}
                            onChangeText={(userConfirmPassword) =>
                                setUserConfirmPassword(userConfirmPassword)
                            }
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.5}
                        onPress={Submit}>
                        <Text style={styles.buttonText}>REGISTER</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    </View>
    )
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },

    image: {
        height: 100,
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
export default Register;