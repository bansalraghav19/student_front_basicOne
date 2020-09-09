import React , { Component } from 'react';
import { Switch, Route, Redirect, NavLink,useHistory} from 'react-router-dom';
import './CSS/Login.css';
import {sendotp,verifyotp,register,login} from '../shared/http';

function Votp({input,contactnumber,assignnumber}){
    const history=useHistory();

    if(contactnumber==null){
        history.push("/signup");
    }
    const myinput = {
        otp:''
    }

    const handlesubmit=async (event)=>{
        event.preventDefault();
        alert("data "+myinput.otp.value);
        var res= await verifyotp(myinput.otp.value,contactnumber);
        if(res.message=="OTP Verified"){
            history.push("/register");
        }
        else{
            assignnumber(null);
        }
    }
  
    return(
            <form onSubmit={handlesubmit}>
            <input type="text" id="contactnumber" ref={(input)=>myinput.otp=input} placeholder="OTP" required/>
            <input type="submit" id="submit" placeholder="Verify Otp" required/>
            </form>     
    );
}

function Register({input,changestate,contactnumber}){

    const history=useHistory();
    if(contactnumber==null){
        history.push("/signup");
    }

    const myinput = {
        fname:'',
        lname:'',
        pass:'',
        email:'',
        state:'',
        city:'',
        grade:'',
        board:''
    }

    const handlesubmit= async (event)=>{
        event.preventDefault();
        alert("data "+myinput.fname.value+" "+myinput.lname.value+" "+myinput.pass.value+" "+
        myinput.email.value+" "+myinput.state.value+" "+myinput.city.value+" "+myinput.grade.value+" "+myinput.board.value);
        var res= await register(myinput.fname.value,myinput.lname.value,contactnumber,myinput.pass.value,
        myinput.email.value,myinput.state.value,myinput.city.value,myinput.grade.value,myinput.board.value);
        console.log(res,'2');
        if(res.message=="Successfully registered"){
            localStorage.setItem("token",res.token)
            changestate(true);
        }
    }
  
    return(
            <form className="register" onSubmit={handlesubmit}>
            <input type="text" id="contactnumber" ref={(input)=>myinput.fname=input} placeholder="First Name" required/>
            <input type="text" id="password" ref={(input)=>myinput.lname=input} placeholder="Last Name" required/>
            <input type="password" id="password" ref={(input)=>myinput.pass=input} placeholder="Password" required/>
            <input type="text" id="password" ref={(input)=>myinput.email=input} placeholder="Email Id" required/>
            <input type="text" id="password" ref={(input)=>myinput.state=input} placeholder="State" required/>
            <input type="text" id="password" ref={(input)=>myinput.city=input} placeholder="City" required/>
            <input type="text" id="password" ref={(input)=>myinput.grade=input} placeholder="Grade" required/>
            <input type="text" id="password" ref={(input)=>myinput.board=input} placeholder="Board" required/>
            <input type="submit" id="submit" placeholder="Register" required/>
            </form>     
    );
}


function SignIn({input,changestate}){
    const history=useHistory();
    console.log("hi");

    const myinput = {
        num:'',
        pass:''
    }

    const handlesubmit=async (event)=>{
        event.preventDefault();
        alert("data "+myinput.num.value+" "+myinput.pass.value);
        var res=await login(myinput.num.value,myinput.pass.value);
        console.log(res,' res ');
        if(res.err){
            console.log(res.err);
        }
        if(res.token){
            localStorage.token=res.token;
            changestate(true);
        }
    }
  
    return(
            <form onSubmit={handlesubmit}>
            <input type="text" id="contactnumber" ref={(input)=>myinput.num=input} placeholder="Mobile Number" required/>
            <input type="password" id="password" ref={(input)=>myinput.pass=input} placeholder="Enter Password" required/>
            <input type="submit" id="submit" placeholder="Login" required/>
            <NavLink className="nav-link n-link"  to='/signup'>create account</NavLink>
            </form>     
    );
}

function SignUp({input,assignnumber}){
    console.log("hello");
    const history=useHistory();
    const myinput = {
        num:''
    }

    const handlesubmit=async (event)=>{
        event.preventDefault();
        alert("data "+myinput.num.value);
        var res=await sendotp(myinput.num.value);
        // res=
        console.log(res.message,"otp")
        if(res.message=="OTP Sent"){
            assignnumber(myinput.num.value);
            // this.setState({})
            history.push("/verifyotp");
        }
    }

    return(     
        <form onSubmit={handlesubmit}>
            <input type="text" id="contactnumber" ref={(input)=>myinput.num=input} placeholder="Mobile Number" required/>
            <input type="submit" id="submit" required/>
            <NavLink className="nav-link n-link"  to='/signin'>signin</NavLink>
        </form>     
    );
}

class Login extends Component{

    constructor(props){
        super(props);
        this.input = React.createRef();
        this.state={
            contactnumber:null
        };
        this.assignnumber=this.assignnumber.bind(this);
    }

    assignnumber(num){
        this.setState({
            contactnumber:num
        });
    }
    

   
    render(){
        return(
            <div className="row clearfix">
                <div className="login-col1">
                    <h1>Welcome to smplified</h1>
                    <h1>online learning</h1>
                    <img src="./assets/student2.jpg" alt="student"></img>
                </div>
                <div className="login-col2">
                    <h1><span>Quick</span> Study</h1>
                    <Switch>
                        <Route path='/signin' component={()=><SignIn input={this.input} changestate={this.props.changestate}/>} />
                        <Route path='/signup' component={()=><SignUp input={this.input} assignnumber={this.assignnumber}/>}/>
                        <Route path='/verifyotp' component={()=><Votp input={this.input} contactnumber={this.state.contactnumber} assignnumber={this.assignnumber}/>}/>
                        <Route path='/register' component={()=><Register input={this.input} changestate={this.props.changestate} contactnumber={this.state.contactnumber}/>}/>
                        <Redirect to="/signin"/>
                    </Switch>    
                </div>
            </div>
            
        );
    }
}
export default Login;