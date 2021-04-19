import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Slot from "./Slots";
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel';
import {blue, red} from "@material-ui/core/colors";
// import DatePicker from '"react-datepicker
// import DatePicker from 'material-ui/DatePicker';


const Booking = (props)=>{
    const useStyles = makeStyles((theme) => ({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: 200,
            },
        },
        HomePage: {
            "background-color": blue.A100,
            height:40,
            width:200,
            "font-size": 10,
            margin: 20,
            '&:Hover': {
                color: red.A700
            }
        },
      }));

    const[booking, setBooking] = useState(null);
    const[name,setName] = useState('');
    const[mobilenum,setMobNum] = useState('');
    const[plate,setPlate] = useState('');
    const[plateError, setPlateError] = useState('');
    // const[dateError, setDateError] = useState('');  
    const[date, setDate] = useState(null);
    const[dateError, setDateError] = useState('');
    const[duration, setDuration] = useState(1);
    const[startTime, setStartTime] = useState(1);
    const[AMPM, setAMPM] = useState(0);
    const[vechileType, setvVchileType] = useState(1);

    let now = new Date();

    const handleVechileType = (e) => {
        setBooking(null);
        setvVchileType(e.target.value);
    }

    const handleName = (e) =>{
        setBooking(null);
        setName(e.target.value);
    }

    const handleMobNum = (e) => {
        setMobNum(e.target.value);
    }

    const handlePlate = (e) =>{
        setBooking(null);
        setPlate(e.target.value);
    }

    const handleDate = (e) => {
        setBooking(null); 
        if (e.target.value)
        setDate(e.target.value);
        // else 
        // setDateError("Cannot book in past time")
    }

    const handleDuration = (e) => {
        setBooking(null);
        setDuration(e.target.value);
    }

    const handleAMPM = (e) => {
        setBooking(null);
        setAMPM(e.target.value);
    }

    const handleStartTime = (e) => {
        setBooking(null);
        setStartTime(e.target.value);
    }

    const addNewBooking = () =>{
        if (plate.trim() === "") {
            setPlateError("Vehicle number is required");
            return;
        } else {
            setPlateError("");
        }

        let book_date = new Date (date)
        book_date.setHours(startTime + AMPM)
        if (date == null || date.trim() === "") {
            setDateError("Date is required");
            return;
        } 
        else if(book_date < now) {
            setDateError("Cannot book in the past");
            console.log("line 105")
            return;
        }
        else {
            setDateError("");
        }

        let newBooking = {
            mobilenum: Number(mobilenum), plate: plate, name: name,
            date: date, startTime: startTime, duration: duration,
            AMPM: AMPM, type: vechileType
        }
        setBooking(newBooking);
    }

    
    const showSlots = () => {
        if (booking != null) {
            return <Slot slots={props.slots} booking={booking} gotoHome={props.gotoHome} static={false}/>
        }
    }

    const showStartTime = () => {
        return (
            <div>
                <InputLabel id="demo-simple-select-label">Start time</InputLabel>
                <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper"
                    value={startTime} onChange={handleStartTime}>
                    <MenuItem value={1}>1</MenuItem><MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem><MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem><MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem><MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem><MenuItem value={10}>10</MenuItem>
                    <MenuItem value={11}>11</MenuItem><MenuItem value={12}>12</MenuItem>
                </Select>
                <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper"
                        value={AMPM} onChange={handleAMPM}>
                    <MenuItem value={0}>AM</MenuItem>
                    <MenuItem value={12}>PM</MenuItem>
                </Select>
            </div>
        )
    }

    const durationDropDown = () => {
        return (
            <div>
                <InputLabel id="demo-simple-select-label">Booking Duration</InputLabel>
                <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper"
                    value={duration} onChange={handleDuration}>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                </Select>
            </div>
        )
    }

    const showVechileType = () => {
        return (
            <div>
                <InputLabel id="demo-simple-select-label">Vechile Type</InputLabel>
                <Select labelId="demo-simple-select-helper-label" id="demo-simple-select-helper"
                        value={vechileType} onChange={handleVechileType}>
                    <MenuItem value={1}>Bike</MenuItem>
                    <MenuItem value={2}>Car</MenuItem>
                    <MenuItem value={3}>SUV</MenuItem>
                </Select>
            </div>
        )
    }

    const showForm = () => {
        return (
            <form className={classes.root} noValidate autoComplete="off">
            <h1> Enter the details to confirm Booking </h1>
            <div>
                <div className = "form-row">
                    <div className="form-group">
                        <TextField id="standard-required" label="Enter Name" id="employeeName"
                                   value = {name} aria-describedby="emailHelp"
                                   placeholder="Enter Name" onChange = {handleName}/>
                    </div>
                    <div className="form-group">
                        <TextField id="standard-required" label="Enter mobile number" id="employeeID"
                                   value = {mobilenum}
                                   placeholder="Enter mobile number" onChange = {handleMobNum}/>
                    </div>
                    <div className="form-check">
                        <TextField required id="standard-required" label="Enter Number Plate"
                                   error = {plateError.length === 0 ? false : true}
                                   helperText={plateError}
                                   value = {plate}
                                   id="plate" placeholder="Enter Number Plate" onChange = {handlePlate}/>
                    </div>
                    <div>
                        <TextField id="date"label="Pick the date and time"type="date"
                                   InputLabelProps={{shrink: true,}}
                                   onChange={handleDate}
                                   inputProps={{ min: "17-Apr-2021" }}
                                   error = {dateError.length === 0 ? false : true}
                                   helperText={dateError}
                        />
                    </div>
                    <br/>
                    {showStartTime()}
                    <br/>
                    {durationDropDown()}
                    <br/>
                    {showVechileType()}
                </div>
                <br/>
                <br/>
                <div>
                    <Button variant="outline-primary"  className={classes.HomePage} onClick = {addNewBooking}>Submit </Button>
                    <Button onClick={props.gotoHome} className={classes.HomePage}> Back </Button>
                </div>
            </div>
        </form>);
    }

    const classes = useStyles();

    return(
        <div>
            {showForm()}
            {showSlots()}
        </div>
    )
}

export default Booking;