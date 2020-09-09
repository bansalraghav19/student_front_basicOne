import React , { Component } from 'react';
import Login from './LoginComponent';
import Main from './MainComponent';
import {verifyToken} from '../shared/http';


class Multiplepage extends Component{

      constructor(props){
            super(props);
            this.state = {
                  isVerified: false
            };
            this.changestate=this.changestate.bind(this);
        
      }

      changestate(value){
            console.log(value);
            this.setState({
                  isVerified: value
            });
      }


      async componentDidMount(){
            //check validity of token
            if(localStorage.token){
                  var res= await verifyToken()
                  console.log(res,"res")
                  if(res.user) this.setState({isVerified:true})
                  else this.setState({isVerified:false})
            }
            else this.setState({isVerified:false})
      }

      render(){           
            if(!this.state.isVerified){
                  return(      
                        <Login changestate={this.changestate}/>
                  );
            }
            else{
                  return(      
                        <Main/>
                  );
            }            
      }
}

export default Multiplepage;