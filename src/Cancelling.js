import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import {blue, green} from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";
import {remove} from "./Slice";


function Cancelling (props) {
    let temp;
    let localdate;

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        HomePage: {
            "background-color": blue.A100,
            height:40,
            width:200,
            "font-size": 10,
            margin: 20
        },
        available: {
            "background-color": green.A200,
            height:200,
            width:200,
            "font-size": 10
        }
    }));
    const classes = useStyles();
    const dispatch = useDispatch();
    const[plateNumber, setPlateNumber] = useState("");
    const[showBookings, setShowBookings] = useState(false);
    const[bookingsToCancel, setBookingsToCancel] = useState([]);

    let now = new Date();
    // let m = q.getMonth();
    // let d = q.getDay();
    // let y = q.getFullYear();

    // let now = new Date(y,m,d);
    // console.log("m is",m,"d is",d, "y is",y)
    console.log("now at line 47", now)
    // let today = now.getDate()

    const handlePlate = (e) =>{
        setPlateNumber(e.target.value);
    }

    const listBookings = () => {
        let bookingsToCancelLocal = []
        props.slots.forEach((slot) => {
            console.log("line no 48", slot.bookings)
            slot.bookings.forEach((booking) => {
                if (booking.plate.trim() === plateNumber.trim()) {
                    temp = (booking.date)
                    // console.log("plate nos is", booking.plate)
                     console.log("line no 53", temp)
                    bookingsToCancelLocal.push(booking)
                }
            })
        });
        setBookingsToCancel(bookingsToCancelLocal);

        if (bookingsToCancel.length > 0) {
            console.log(bookingsToCancel)
            setShowBookings(true);
        }
    }

    const renderHeader = () => {
        return (
            <div>
                <h1> Select the bookings to cancel</h1>
            </div>
        )
    }

    const handleCancel = (e) => {
        let index = e.target.value ? e.target.value : e.target.parentNode.value;
        console.log("line 71");
        // console.log("current date is", today, "plate no is" );
        ///let localdate = temp.getDate();
        // console.log("today is", today, "local date is", temp)
        props.slots.forEach((slot) => {
            slot.bookings.forEach((booking) => {
                if(booking.plate.trim() === plateNumber.trim()) {
                    temp = new Date (booking.date);
                    temp.setHours(booking.startTime + booking.AMPM)
                    // localdate = temp.getDate();

                }
            })
        }) 
                if(temp < now)  {
        swal("You cannot cancel past bookings")
        console.log("temp is", temp, "today is", now)
        console.log(" before dispatch")
         }
        else if (temp > now){
        console.log("index is ",index)
        dispatch(remove({index: index, plateNumber: plateNumber}));
        console.log("dispatch")
        props.gotoHome();
        }
    }

    const renderBookings = () => {
        if (showBookings) {
            return (<Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    {renderHeader()}
                </Grid>
                {bookingsToCancel.map((x, i) => {
                    return (
                        <Button onClick={handleCancel} className={classes.available} value={i}>
                            {x.date} {x.startTime} {x.AMPM === 0 ? " AM " : " PM "}
                            Duration: {x.duration} hours
                            SLOT: {x.slotId}
                        </Button>
                    );
                })}
            </Grid>);
        }
    }

    return(
        <form className={classes.root} noValidate autoComplete="off">
            <h1> Enter the details to view all your Bookings </h1>
            <div>
                <div className="form-check">
                    <TextField required id="standard-required" label="Enter Number Plate"
                     id="plate" placeholder="Enter Number Plate" onChange={handlePlate}/>
                </div>
                <div>
                    <Button onClick={listBookings} className={classes.HomePage}>
                        List all the cancellations
                    </Button>
                    <Button onClick={props.gotoHome} className={classes.HomePage}> Back </Button>
                </div>
            </div>
            {renderBookings()}
        </form>
    );
}

export default Cancelling;