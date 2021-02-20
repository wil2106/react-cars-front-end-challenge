import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../app/store';
import Car from "../shared/interfaces/car.interface";
import axios from 'axios';

interface CarsState {
  cars: Car[],
  isLoading: boolean,
  noResults: boolean,
}

const initialState: CarsState = {
  cars: [],
  isLoading: false,
  noResults: false,
};

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setCars: (state, action: PayloadAction<Car[]>) => {
      state.cars = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setNoResults: (state, action: PayloadAction<boolean>) => {
      state.noResults = action.payload;
    },
  },
});

export const { setCars, setIsLoading, setNoResults } = catalogSlice.actions;

//thunks


/**
* Fetches cars from backend with optional query parameters.
*
* @param distance - First query parameter
* @param duration - Second query parameter
* @returns An array of cars
*/
export const fetchCars = (distance?: number, duration?: number): AppThunk => async dispatch => {
  try {
    
    //clear cars
    dispatch(setCars([]))
    dispatch(setIsLoading(true))
    dispatch(setNoResults(false))
    

    const resp = await axios.get('/cars.json', { params: { distance: distance, duration: duration } });
    const cars : Car[] = resp.data

    //simulate latency
    setTimeout(() => {
      if(cars.length === 0)
        dispatch(setNoResults(true))
      dispatch(setCars(cars))
      dispatch(setIsLoading(false))
    }, 1000);


  } catch (err) {
      console.error(err);
  }
  
};

//selectors
export const selectCars = (state: RootState) => state.catalog.cars;
export const selectIsLoading = (state: RootState) => state.catalog.isLoading;
export const selectNoResults = (state: RootState) => state.catalog.noResults;

export default catalogSlice.reducer;
