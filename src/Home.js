import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Booking from "./booking";
import Cancelling from "./Cancelling";
import {connect, useSelector} from "react-redux";
import {selectSlots} from "./Slice";
import {makeStyles} from "@material-ui/core/styles";
import {blue} from "@material-ui/core/colors";

function Home() {
    const[page, setPage] = useState('Home');
    const slots = useSelector(selectSlots);
    console.log(slots)
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
        }
    }));
    const classes = useStyles();

    const gotoHome = () => {
        setPage('Home');
    }

    const selectPage = (e) => {
        let value = e.target.value ? e.target.value : e.target.parentNode.value;
        setPage(value);
    }

    const showHome = () => {
        if (page === 'Home') {
            return (
            <div>
                <h1> Please choose one of the option </h1>
                <div>
                    <Button value="Book" onClick={selectPage} className={classes.HomePage}>
                        Click For New Booking !
                    </Button>
                    <Button value="Cancel" onClick={selectPage} className={classes.HomePage}>
                        Click to Cancel booking!
                    </Button>
                </div>
            </div>);
        }
    }

    const showBooking = () => {
        if (page === 'Book') {
            return <Booking slots={slots} gotoHome={gotoHome}/>
        }
    }

    const showCancellation = () => {
        if (page === 'Cancel') {
            return <Cancelling slots={slots} gotoHome={gotoHome}/>
        }
    }

    return(
        <div>
            {showHome()}
            {showBooking()}
            {showCancellation()}
        </div>
    );
}
// connect(selectSlots, Home);
export default Home