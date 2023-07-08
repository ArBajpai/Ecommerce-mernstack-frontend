import Main from "./Main";
import {Provider} from "react-redux"
import { store } from "./redux/store";
import {StripeProvider} from "@stripe/stripe-react-native"

const stripeKey="pk_test_51NKjmuSDgUCoV9jk1nuNXamOj33GvbUyRm1quNdSOv2KvU4IO0Y81VfQJOF8rhkwM6OivSD0tuz2b12rlLsNDdMX00WT9nNfAa";
export default function App() {
  
  return(
   <StripeProvider
   threeDSecureParams={{
    backgroundColor:"#fff",
    timeout:5,
   }}
   merchantIdentifier="8-pack-ecom.com"
   publishableKey={stripeKey}
   
   >
    <Provider store={store}>
       <Main/>
    </Provider>
   </StripeProvider> 
   
  ); 
  
}


