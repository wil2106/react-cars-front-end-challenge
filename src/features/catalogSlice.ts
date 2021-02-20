import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../app/store';
import Car from "../shared/interfaces/car.interface";
import axios from 'axios';

interface CarsState {
  cars: Car[],
  isLoading: boolean,
  noResults: boolean,
  durationFilter: string,
  distanceFilter: string
}

const initialState: CarsState = {
  cars: [],
  isLoading: false,
  noResults: false,
  durationFilter: '',
  distanceFilter: ''
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
    setDistanceFilter: (state, action: PayloadAction<string>) => {
      state.distanceFilter = action.payload;
    },
    setDurationFilter: (state, action: PayloadAction<string>) => {
      state.durationFilter = action.payload;
    },
  },
});

export const { setCars, setIsLoading, setNoResults, setDistanceFilter, setDurationFilter } = catalogSlice.actions;

//thunks


/**
* Fetches cars from backend with optional query parameters.
*
* @param distance - First query parameter
* @param duration - Second query parameter
* @returns An array of cars
*/
export const fetchCars = (): AppThunk => async (dispatch, getState) => {
  try {

    let distance : number = Number(getState().catalog.distanceFilter)
    let duration : number = Number(getState().catalog.durationFilter)
    
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
export const selectDistancefilter = (state: RootState) => state.catalog.distanceFilter;
export const selectDurationFilter = (state: RootState) => state.catalog.durationFilter;

export default catalogSlice.reducer;
