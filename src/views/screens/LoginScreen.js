import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import COLORS from '../consts/Colors';
import { auth } from '../config/firebase';
import { PrimaryButton } from '../components/Button';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // if the user is already signed in, navigate to Home Screen
        // navigation.navigate('Home');
      }
    });
    // clean up subscription when component unmounts
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        console.log('Login Success');
        Alert.alert("Welcome ")
        navigation.navigate('Home');
      });
    } catch (error) {
      console.log('Error Logging in', error);
    }
  };

  const handleSignUp = () => {
    navigation.navigate('Registration');
    console.log('SignUp btn clicked, navigating to Registration Page');
  };

  const handleForgotPassword = () => {
    console.log('password forgot');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <Text style={styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>
      {/* <View style={styles.btnContainer}>
              <PrimaryButton title="LOGIN"  onPress={handleLogin}  />
            </View> */}

      <View style={styles.actionContainer}>
        <View style={styles.signUpOpt}>
          <Text style={styles.noAccText}>Haven't Signed Up?</Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.forgotPasswordCont}>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  input: {
    width: '80%',
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    padding: 15,
    height: 60,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontWeight: 'bold', 
    fontSize: 18
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  signUpOpt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noAccText: {
    marginRight: 5,
  },
  signUpText: {
    color: "blue",
    fontWeight: 'bold',
  },
  forgotPasswordCont: {
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    color: "blue",
  },
 
});

export default LoginScreen;
