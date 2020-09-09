import React, { Component } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import { MenuItem } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import {verifyToken} from '../shared/http'


const useStyles = theme => ({
    formControl: {
        minWidth: '100%',
        marginBottom: '3%',
    }, 
    adjust: {
        position: 'absolute'
    }
})

const list = (data) => {
    return <MenuItem value={data}>{data}</MenuItem>
}

export class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            obj : {
                FullName: 'Raghav Bansal',
                State: 'Punjab',
                City: 'Barnala',
                Board: 'CBSE',
                Class: 6,
                Gender: 'male'
            },
            temp: true,
            states: [],
            cities: [],
            boards: ['HP Board', 'CBSE'],
            classes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.allowEdit = this.allowEdit.bind(this)
    }
    
    async componentDidMount() {
        // console.log(this.props)
        axios.get('https://raw.githubusercontent.com/bhanuc/indian-list/master/state-city.json').then((res) => {
            this.setState({
                states: Object.keys(res.data),
                cities: res.data[this.state.obj.State]
            })
        })
        var obj= await verifyToken()
        obj.user.profilePic="https://education4all.herokuapp.com/uploads/" +obj.user.profilePic
        this.props.renderData(obj.user)
        await this.setState({
            obj:{
            FullName: obj.user.name,
            State: obj.user.state,
            City: obj.user.city,
            Board: obj.user.board,
            Class: obj.user.class,
            Gender: obj.user.gender
        }
        })
        console.log(this.state.rawData)
        // this.setState({obj:this.props.rawData})
    }
    handleSubmit(event) {
        event.preventDefault()
        console.log(this.state)
        axios.post('https://jsonplaceholder.typicode.com/posts', this.state.obj).then(
            (res) => {
                console.log(res)
            }
        ).catch((e) => {
            console.log(e)
        })
    }

    async handleUpdate(event) {
        event.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append("authorization", "Bearer "+localStorage.token);
        myHeaders.append("Content-Type", "application/json");        
        var raw = JSON.stringify({
            "name":this.state.obj.FullName,
            "class":this.state.obj.Class,
            "gender":this.state.obj.Gender,
            "board":this.state.obj.Board,
            "city":this.state.obj.City,
            "state":this.state.obj.State,

        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        var res= await fetch("http://localhost:3000/editUser", requestOptions)
        res=await res.json()
        console.log(res,"gotcha")


    }

    handleChange(event) {
        const name = event.target.name
        const val = event.target.value
        let temp
        if(name == "State")
        {
            axios.get('https://raw.githubusercontent.com/bhanuc/indian-list/master/state-city.json').then((res) => {
                this.setState({
                    cities: res.data[val]
                })
            })
        }
        let obj1 = this.state.obj
        obj1[name] = val
        if(name == "State") {
            obj1['City'] = "Select City";
        }
        this.setState({
            obj: obj1
        })
    }
    allowEdit(event) {
        this.setState({
            temp: !this.state.temp
        })
    }
    render() {
        const { classes } = this.props
        const {FullName, State, City, Board, Class, Gender} = this.state.obj
        const {temp} = this.state
        return (
            <div className="head-form">
                <div className="btncls">
                    <Button disabled={!this.state.temp} variant="contained" color="primary" onClick={this.allowEdit}>
                        Edit
                    </Button>
                </div>
                <form>
                    <FormControl className={classes.formControl}>
                        <FormLabel>Full Name</FormLabel>
                        <TextField value={FullName} disabled={this.state.temp} name="FullName" onChange={this.handleChange}></TextField>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormLabel className={classes.adjust}>State</FormLabel>
                        <Select name="State" value={State} disabled={this.state.temp} onChange={this.handleChange}>
                            {
                                this.state.states.map((s) => list(s))
                            }
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormLabel className={classes.adjust}>City</FormLabel>
                        <Select name="City" value={City} disabled={this.state.temp} onChange={this.handleChange}>
                            {
                                this.state.cities.map((s) => list(s))
                            }
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormLabel className={classes.adjust}>Board</FormLabel>
                        <Select name="Board" value={Board} disabled={this.state.temp} onChange={this.handleChange}>
                            {
                                this.state.boards.map((s) => list(s))
                            }
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormLabel className={classes.adjust}>Class</FormLabel>
                        <Select name="Class" value={Class} disabled={this.state.temp} onChange={this.handleChange}>
                            {
                                this.state.classes.map((s) => list(s))
                            }
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup row name="Gender" value={Gender} onChange={this.handleChange}>
                            <FormControlLabel value="female" control={<Radio />} label="Female" disabled={this.state.temp}/>
                            <FormControlLabel value="male" control={<Radio />} label="Male" disabled={this.state.temp}/>
                            <FormControlLabel value="other" control={<Radio />} label="Other" disabled={this.state.temp}/>
                        </RadioGroup>
                    </FormControl>
                    <FormControl>
                        <Button variant="contained" color="primary" disabled={this.state.temp} onClick={this.handleUpdate}>
                            Update Info
                        </Button>
                    </FormControl>
                </form>
            </div>
            
        )
    }
}

export default withStyles(useStyles)(Form)