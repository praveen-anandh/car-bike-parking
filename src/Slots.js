import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {add} from './Slice';
import {green, red} from "@material-ui/core/colors";
import swal from 'sweetalert';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

function Slot(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        booked: { 
            "background-color": red.A200,
            height:100,
            width:100,
            "font-size": 20
        },
        available: {
            "background-color": green.A200,
            height:100,
            width:100,
            "font-size": 20
        }
    }));
    let bookedOrAvailableAll = [];
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleBooking = (e) => {
        props.booking.slotId = e.target.value ? e.target.value : e.target.parentNode.value;
        let startTime = getStartTime(props.booking);
        let startTimeMsg = "You're booked at " + startTime.toDateString() + " for "+ props.booking.duration + " hours \n\nSlot ID " + props.booking.slotId;
        dispatch(add(props.booking));
        console.log("e target valye is",e.target.value, e.target.parentNode)
        swal(startTimeMsg + " \n\n Your parking fee is " + calculatePakingFee());
        props.gotoHome();
    }

    const getStartTime = (booking) => {
        return getStartAndEndTime(booking)["startTime"];
    }

    const calculatePakingFee = () => {
        if (props.booking.type === 1) {
            return (props.booking.duration -1) * 30;
        } else if (props.booking.type === 2){
            return (props.booking.duration -1) * 50;
            
        }
        else {
          return (props.booking.duration -1) * 100;

        }
    }

    const renderHeader = () => {
        return (
            <div>
                {props.static? <h1> Parking availability</h1> : <h1> Select the parking space to book</h1>}
            </div>
        )
    }

    const getStartAndEndTime = (booking) => {
        let startTime = new Date(booking.date);
        startTime.setHours(booking.startTime + booking.AMPM);
        let endTime = new Date(startTime);
        endTime.setHours(endTime.getHours() + booking.duration);
        return {"startTime": startTime, "endTime": endTime};
    }

    const ifOverlap = (currentStartEnd, previousStartEnd) => {
        return (
            (currentStartEnd.startTime <= previousStartEnd.endTime &&
            currentStartEnd.startTime >= previousStartEnd.startTime)
            ||
            (currentStartEnd.endTime <= previousStartEnd.endTime &&
                currentStartEnd.endTime >= previousStartEnd.startTime)
        ) ;
    }

    const noOverlap = (currentStartEnd, previousStartEnd) => {
        return !ifOverlap(currentStartEnd, previousStartEnd);
    }

    const filterSlotsByVechileTypeAndTime = () => {
        let bookedOrAvailable = {};
        props.slots.forEach((slot) => {
            if (slot.bookings.length === 0 && slot.type === props.booking.type) {
                bookedOrAvailable[slot.slotId] = {available:true, error: "Click to book slot"}
            } else {
                bookedOrAvailable[slot.slotId] = {available:false, error: "Not Available for vechile type"}
            }
            slot.bookings.forEach((booking) => {
                let previousStartAndEnd = getStartAndEndTime(booking)
                let currentStartAndEnd = getStartAndEndTime (props.booking)
                let isNoOverlap = noOverlap(currentStartAndEnd, previousStartAndEnd);
                if (isNoOverlap && props.booking.type === slot.type) {
                    bookedOrAvailable[slot.slotId] = {available:true, error: "Click to book slot"}
                } else if (props.booking.type !== slot.type) {
                    bookedOrAvailable[slot.slotId] = {available:false, error: "Not Available for vechile type"}
                } else if (!isNoOverlap) {
                    bookedOrAvailable[slot.slotId] = {available:false, error: "Slot booked during this time"}
                }
            })
        })
        bookedOrAvailableAll = bookedOrAvailable;
    }

    const renderSlot = () => {
        filterSlotsByVechileTypeAndTime();
      return (
          <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12}>
                {renderHeader()}
              </Grid>
              {props.slots.map((x, i) => {
                  let available = bookedOrAvailableAll[x.slotId].available;
                  return (
                      <Tooltip title={bookedOrAvailableAll[x.slotId].error}>
                          <Button value={x.slotId} onClick={available ? handleBooking: () => {}}
                                  className={ available? classes.available: classes.booked}>
                              SLOT {x.slotId}
                          </Button>
                      </Tooltip>
                  );
              })}
          </Grid>
      )
    }

    return (
        <div>
            {renderSlot()}
        </div>
    );
}

export default Slot;