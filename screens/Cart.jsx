import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { colors, defaultStyle } from '../styles/styles';
import Header from '../components/Header';
import Heading from '../components/Heading';
import { Button } from 'react-native-paper';
import CartItem from '../components/CartItem';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export const cartItems=[{
   name:"Macbook",
   image:"https://cdn.pixabay.com/photo/2019/04/26/07/14/store-4156934_1280.png",
   product:"avshsddsb",
   stock:3,
   price:49999,
   quantity:2,
},

{
    name:"Puma-Shoes",
    image:"https://cdn.pixabay.com/photo/2019/04/26/07/14/store-4156934_1280.png",
    product:"avshsb",
    stock:5,
    price:499,
    quantity:5,
},

{
    name:"Puma-Shoes",
    image:"https://cdn.pixabay.com/photo/2019/04/26/07/14/store-4156934_1280.png",
    product:"avssb",
    stock:5,
    price:499,
    quantity:5,
},

{
    name:"Puma-Shoes",
    image:"https://cdn.pixabay.com/photo/2019/04/26/07/14/store-4156934_1280.png",
    product:"ashsb",
    stock:5,
    price:499,
    quantity:5,
},

{
    name:"Puma-Shoes",
    image:"https://cdn.pixabay.com/photo/2019/04/26/07/14/store-4156934_1280.png",
    product:"vshsb",
    stock:5,
    price:499,
    quantity:5,
},];

const Cart = () => {

  const navigate=useNavigation();
  const dispatch=useDispatch();

  const {cartItems}=useSelector(state=>state.cart);

  const incrementHandler = (id, name, price, image, stock, quantity) => {
    const newQty = quantity + 1;
    if (stock <= quantity)
      return Toast.show({
        type: "error",
        text1: "Maximum value added",
      });
    dispatch({
      type: "addToCart",
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
        quantity: newQty,
      },
    });
  };
   
    const decrementHandler = (id, name, price, image, stock, quantity) => {
      const newQty = quantity - 1;
  
      if (1 >= quantity) return dispatch({ type: "removeFromCart", payload: id });
  
      dispatch({
        type: "addToCart",
        payload: {
          product: id,
          name,
          price,
          image,
          stock,
          quantity: newQty,
        },
      });
    };




  return (
    <View style={{
        ...defaultStyle,
        padding:0,
    }}>
{/* Header */}
     <Header back={true} emptyCart={true}/> 

       {/* Heading */}
       <Heading text1="Shopping" text2="Cart" containerStyle={{paddingTop:70,marginLeft:35}}/>
       <View style={{
        paddingVertical:20,
        flex:1,
       }}>
<ScrollView showsVerticalScrollIndicator={false}>
  {
   cartItems.length>0 ? cartItems.map((i,index)=>(
      <CartItem 
      navigate={navigate}
      key={i.product} 
      id={i.product}
      name={i.name}
      stock={i.stock}
      amount={i.price}
      imgSrc={i.image}
      index={index}
      qty={i.quantity}
      incrementHandler={incrementHandler}
      decrementHandler={decrementHandler}

      />  
    )):(
      <Text style={{textAlign:"center",fontSize:20}}>No Items Yet</Text>
    )}  
</ScrollView>
       </View>
       <View style={{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:35,
       }}>
      <Text>{cartItems.length} Items</Text>
      <Text>{ cartItems.reduce((prev, curr) => prev + curr.quantity * curr.price, 0)}</Text>
      </View>

      <TouchableOpacity onPress={cartItems.length > 0? ()=> navigate.navigate("confirmorder"): null }>
        <Button style={{
            backgroundColor:colors.color3,
            borderRadius:100,
            padding:5,
            margin:30,
        }}
        icon={"cart"}
        textColor={colors.color2}
        >Checkout</Button>
      </TouchableOpacity>

    </View>
  );
};



export default Cart;