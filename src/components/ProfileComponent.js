import React , { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import {verifyToken} from '../shared/http'

import './CSS/Profile.css';
// import './icon-font.css';
// import Navbar from './navbar';
// import Sidebar from './sidebar';
import Form from './Form';


const useStyles = theme => ({
      formControl: {
            minWidth: '100%',
            marginBottom: '2%'
      }, 
})

class Profile extends Component{

      constructor(props) {
            super(props)
      
            this.state = {
                  rawData: {}, 
                  open: false
            }
            this.uploadFile = this.uploadFile.bind(this)
            this.handleClickOpen = this.handleClickOpen.bind(this)
            this.handleClose = this.handleClose.bind(this)
            this.renderData = this.renderData.bind(this)
      }
      
      handleClickOpen(){
            console.log('hello')
            this.setState({
                  open: true
            })
            // console.log(this.state.open)
      };

      handleClose() {
            this.setState({
                  open: false
            })
      }

      renderData(data){
            this.setState({
                  rawData: data
            })
      }

      uploadFile(event) {
            var myHeaders = new Headers();
            myHeaders.append("authorization", "Bearer "+localStorage.token);

            var formdata = new FormData();
            formdata.append("subject", "Maths");
            formdata.append("sampleFile", document.getElementById("myFile").files[0],document.getElementById("myFile").value);

            var requestOptions = {
                  method: 'POST',
                  headers: myHeaders,
                  body: formdata,
                  redirect: 'follow'
                  };

            fetch("https://education4all.herokuapp.com/uploadDP", requestOptions)
                  .then(response => response.json())
                  .then(result => {
                        console.log(result)
                        let obj = this.state.rawData
                        obj.profilePic = "https://education4all.herokuapp.com/uploads/" + result.name
                        this.setState({
                              rawData: obj
                        })
                  })
                  .catch(error => console.log('error', error));
      }


      render(){
      const { classes } = this.props
      return(
      <div className="container">
      <div className="content">
            <div className="col1">
            <div className="card card1">
                  <label className="dp">
                        <input type="file"  className="fileu" onChange={this.uploadFile} id="myFile" name="filename"/>
                        <img className="dp_img" src={this.state.rawData.profilePic}></img>
                  </label>
                  <div className="details">
                        <p>{this.state.rawData.userName}</p>
                        <p>{this.state.rawData.class}th Grade &diams; {this.state.rawData.board}</p>
                        <p><a className = "btn btn1" href="#" onClick={this.handleClickOpen}>Change Password</a></p>
                        <Dialog
                              open={this.state.open}
                              onClose={this.handleClose}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">Change Password</DialogTitle>
                        <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                              <form>
                              <FormControl className={classes.formControl}>
                                    <FormLabel>Current Password</FormLabel>
                                    <TextField ref='password'
                                          hintText="Password"
                                          floatingLabelText="Password"
                                          type="password">
                                    </TextField>
                              </FormControl>
                              <FormControl className={classes.formControl}>
                                    <FormLabel>New Password</FormLabel>
                                    <TextField ref='password'
                                          hintText="Password"
                                          floatingLabelText="Password"
                                          type="password">
                                    </TextField>
                              </FormControl>
                              <FormControl className={classes.formControl}>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <TextField ref='password'
                                          hintText="Password"
                                          floatingLabelText="Password"
                                          type="password">
                                    </TextField>
                              </FormControl>
                              </form>
                              </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                              <Button onClick={this.handleClose} color="primary">
                                    Close
                              </Button>
                              <Button onClick={this.handleClose} color="primary" autoFocus>
                                    Change Password
                              </Button>
                        </DialogActions>
                        </Dialog>
                  </div>
            </div>
            <div className="card card2">
                  <div className="price-header">
                        <div className="adjust">
                              <p className="title">Yearly</p>
                              <p className="sub-title">Subscription</p>
                        </div>
                        <div className="cost">
                              <span class="discount">$35</span>
                              $29.75
                              <span class="text">/mo</span>
                        </div>
                  </div>
                  
                  <div className="plan-details">
                        <div className="_content">
                              <span>Limited time offer for fight against COVID-19.</span>
                              <p>Our most popular plan previously sold for $299 and is now only $10.6/month . This plan saves you over 60% in comparison to the monthly plan.
                              (prices are marked in USD)</p>
                        </div>
                        <div className="btn">
                              <a className="btn2" href="#">Subscribe</a>
                        </div>
                  </div>
            </div>            
            </div>
            <div className="col2">
                  <div className="card card1">
                        <div className="heading">
                              <h2>Account Info</h2>
                        </div>
                        <div className="about-info">
                              <ul>
                                    <li>
                                          <label>Email</label>
                                          <p>{this.state.rawData.userName}</p>
                                    </li>
                                    <li>  
                                          <label>Phone Number</label>
                                          <p>{this.state.rawData.phone}</p>
                                    </li>
                              </ul>
                        </div>
                  </div>
                  <div className="card card2">
                        <div className="heading">
                              <h2>Personal Info</h2>
                        </div>
                        <div className="about-info">
            
                             <Form renderData={this.renderData}/>
                        </div>
                  </div>
            </div>
      </div>
      </div>
                  
      );
      };
}

export default withStyles(useStyles)(Profile)