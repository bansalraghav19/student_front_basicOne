import React , { Component, useState } from 'react';
import { Switch, Route, Redirect, NavLink, Link} from 'react-router-dom';
import './CSS/Main.css'
import {SUBJECTS,PHYSICS} from '../shared/subjects';
import Chapter from './ChapterComponent';
import Videoplayer from './VideoplayerComponent';
import Query from './queryComponent';
import Client from './client/client';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Profile from './ProfileComponent';
import Test from './TestComponent';
import Testform from './Testform';

import home from './SVG/home3.svg';
import books from './SVG/books.svg';
import users from './SVG/users.svg';
import note from './SVG/bell.svg';
import contact from './SVG/address-book.svg';

function Navbar(){
      const [anchorEl, setAnchorEl] = useState(null);
      const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
      };
        
      const handleClose = () => {
            setAnchorEl(null);
      };
      return (
            <div className="navbar">
                <div className="HeadPart">
                    <div className="app-description">
                        <div className="app-logo"><img  src='./assets/logo.png'/></div>
                        <div className="sep">|</div>
                        <div className="page-name">PROFILE PAGE</div>
                    </div>
                    <div className="buttons">
                        <div>
                            <a className="b1" href="#" onClick={handleClick}>My Profile</a>
                        </div>
                        <Menu
                           id="simple-menu"
                           anchorEl={anchorEl}
                           keepMounted
                           aria-controls="customized-menu"
                           aria-haspopup="true"
                           getContentAnchorEl={null}
                           open={Boolean(anchorEl)}
                           anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                           targetOrigin={{horizontal: 'left', vertical: 'top'}}
                           onClose={handleClose}
                        >
                              <MenuItem onClick={handleClose}>My Profile</MenuItem>
                              <MenuItem onClick={handleClose}>Logout</MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
      );
}

function Sidebar(){
      return (
            <div className="m-sidebar">
                  <NavLink className="nav-link btt1 wrap"  to='/subject'><img src = {books} /></NavLink>
                  <NavLink className="nav-link btt1 wrap"  to='/test'> <img src = {note} /></NavLink>
                  <NavLink className="nav-link btt1 wrap"  to='/query'><img src = {home} /></NavLink>
                  <NavLink className="nav-link btt1 wrap"  to='/profile'><img src = {users} /></NavLink>
            </div>
      );
}

function Subject(){

      const subjects=SUBJECTS.map((subject)=>{
            return(
                  <Link className="link" to={`/subject/${subject.name}`}>
                        <div className="subject main-col3" id={subject.id} key={subject.id}>
                              <h3>{subject.name}</h3>
                        </div>
                  </Link>
            );
      });
     
      const physics=PHYSICS.map((chapter)=>{
            if(chapter.name.length>25)
                  chapter.name=chapter.name.substring(0,22)+"...";
            return(
                  <div className="chapter main-col4">
                        <img src="./assets/book3.jpg"></img>
                        <h3>{chapter.name}</h3> 
                        <div className="newrow clearfix">
                              <h4>{chapter.learn}%{" "}Learnt</h4>
                              <h4>{chapter.practice}%{" "}Practiced</h4>
                        </div>
                  </div>
            );
      });

      var left=5;

      const slideleft=()=>{       
            if(left>-340){
                  left-=50;
                  var tmp=left+'%';
                  document.getElementsByClassName('chapters')[0].style.marginLeft=tmp;
            }  
      };

      const slideright=()=>{    
            if(left<5){
                  left+=50;
                  let tmp=left+'%';
                  document.getElementsByClassName('chapters')[0].style.marginLeft=tmp;
            }       
      };
      

      return(
            <div className="comp">       
                  <img className="header-img" src="./assets/book11.jpg"></img>
                  <h1>Explore by subjects</h1>
                  <div className="row1 clearfix">
                        {/* <div className="all-subject"> */}
                              {subjects}
                        {/* </div> */}
                  </div>
                  <div className="row2">
                        <div className="chapters clearfix">
                              {physics}
                        </div>
                        <button className="first-button"  onClick={slideleft}><img src="./assets/garrow1.png"></img></button> 
                        <button className="second-button" onClick={slideright}><img src="./assets/garrow.png"></img></button>
                  </div>
                 
            </div>
      );
}


class Main extends Component{
      constructor(props) {
            super(props);
            this.state = {
                  roomID: ""
            };
            this.changeRoomID = this.changeRoomID.bind(this);
      }
      changeRoomID(id) {
            
            this.setState({ roomID: id},()=>console.log("aayaa",this.state.roomID))
      }
      render(){

            const selectchapter=({match})=>{
                  console.log("hello 1");
                  return(
                        <Chapter subname={match.params.subname}/>
                  );
            }

            const selecttopic=({match})=>{
                  console.log(match.params.topic,match.params.chapter);
                  return (
                        <Videoplayer topic={match.params.topic} chapter={match.params.chapter}/>
                  );
            }

            return(
                  <div className="main">
                        <Navbar/>
                        <div className="main-container clearfix">
                              <Sidebar/>
                              <div className="side-container">
                                    <Switch>
                                          <Route exact path='/subject' component={()=><Subject/>} />
                                          <Route path='/subject/:subname' component={selectchapter} />
                                          <Route path='/chapter/:chapter/:topic' component={selecttopic} />
                                          <Route exact path='/test' component={()=><Test/>}/>
                                          <Route path='/chat' component={()=><Client Room={this.state.roomID}/>}/>
                                          <Route path="/query" component={() => <Query changeRoomID={this.changeRoomID} />} />
                                          <Route path='/Profile' component={()=><Profile/>}/>
                                          <Route path='/test/:subname' component={()=><Testform/>}/>
                                          <Redirect to="/subject"/>
                                    </Switch>
                              </div> 
                        </div>   
                       
                  </div>
            );
      }
}
export default Main;