import { View, Text,TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, defaultStyle, formHeading, 
    inputStyling,
    inputOptions,
    formStyles as styles,
} from '../styles/styles';
import { Button, TextInput } from 'react-native-paper';
import Footer from '../components/Footer';
import {useDispatch, useSelector} from "react-redux";
import { login } from '../redux/actions/userActions';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useMessageAndErrorUser } from '../utils/hooks';

const Login = ({navigation}) => {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  
  const dispatch=useDispatch();

 const loading= useMessageAndErrorUser(navigation,dispatch,"profile");

const submitHandler=()=>{
    dispatch(login(email,password));
};

return (
    <>
    <View style={{...defaultStyle,backgroundColor:colors.color2}}>
    <View style={{marginBottom:20}}>
       <Text style={formHeading}>Login</Text> 
    </View>   

    <View style={styles.container}>
 <TextInput 
 {...inputOptions} 
 placeholder="Email"
 keyboardType="email-address" 
 value={email}
 onChangeText={setEmail}
 
 />

<TextInput 
 {...inputOptions} 
 placeholder="Password"
 secureTextEntry={true}
 value={password}
 onChangeText={setPassword}
 />

 <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate("forgetpassword")}>
    <Text style={styles.forget}>Forget Password?</Text>
 </TouchableOpacity>

 <Button
 loading={loading} 
 textColor={colors.color2}
 disabled={email==="" || password===""}
 style={styles.btn} 
 onPress={submitHandler}
 
 >
Log In</Button>

<Text style={styles.or}>OR</Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("signup")}
          >
            <Text style={styles.link}>Sign Up</Text>
          </TouchableOpacity>
    </View>
   </View>

<Footer activeRoute="profile" />
</>
  );
};


export default Login;