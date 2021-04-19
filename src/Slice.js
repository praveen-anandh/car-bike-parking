import { createSlice } from '@reduxjs/toolkit'

const BIKE = 1;
const CAR = 2;
const SUV = 3;
export const slotsSlice = createSlice({
  name: 'booking',
  initialState: {
      slots:[
        {type: BIKE, bookings: [], slotId: "B1"},
        {type: BIKE, bookings: [], slotId: "B2"},
        {type: BIKE, bookings: [], slotId: "B3"},
        {type: BIKE, bookings: [], slotId: "B4"},
        {type: BIKE, bookings: [], slotId: "B5"},
        {type: BIKE, bookings: [], slotId: "B6"},
        {type: BIKE, bookings: [], slotId: "B7"},
        {type: BIKE, bookings: [], slotId: "B8"},
        {type: CAR, bookings: [], slotId: "C1"},
        {type: CAR, bookings: [], slotId: "C2"},
        {type: CAR, bookings: [], slotId: "C3"},
        {type: CAR, bookings: [], slotId: "C4"},
        {type: CAR, bookings: [], slotId: "C5"},
        {type: CAR, bookings: [], slotId: "C6"},
        {type: SUV, bookings: [], slotId: "S1"},
        {type: SUV, bookings: [], slotId: "S2"},
        {type: SUV, bookings: [], slotId: "S3"},
        {type: SUV, bookings: [], slotId: "S4"},
        {type: SUV, bookings: [], slotId: "S5"},
        {type: SUV, bookings: [], slotId: "S6"},
      ], },

  reducers: {
    add: (state,action) => {
      const newArray = [...state.slots];
      newArray.forEach((slot) => {
          if (action.payload.type === slot.type && action.payload.slotId === slot.slotId) {
              slot.bookings.push(action.payload);
          }
      })
      state = {slots: newArray};
    },
    remove: (state,action) => {
      const newArray = [...state.slots];
      let check = 0;
      console.log("action.payload")
      console.log(action.payload)
      newArray.forEach((slot) => {
          slot.bookings.forEach((booking, i) => {
              console.log(booking.plate.trim())
              if (booking.plate.trim() === action.payload.plateNumber.trim()) {
                  console.log(check)
                  console.log(parseInt(action.payload.index))
                  console.log(check === parseInt(action.payload.index))
                  if (check === parseInt(action.payload.index)) {
                      slot.bookings.splice(i, 1);
                      console.log("splice")
                  }
                  console.log("slot length is", slot.bookings.length);
                  check++;
              }
          })
      })
      state = {slots: newArray};
    },
  }
})

export const {add, remove} = slotsSlice.actions
export const selectSlots = state => state.slots.slots;
export default slotsSlice.reducer