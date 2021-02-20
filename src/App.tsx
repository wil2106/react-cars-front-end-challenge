import React, { useState, useEffect, createRef } from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import CarCard from "./components/CarCard";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";

import {
  selectCars,
  fetchCars,
  selectIsLoading,
  selectNoResults,
  setDistanceFilter, 
  setDurationFilter,
  selectDistancefilter,
  selectDurationFilter
} from "./features/catalogSlice";

import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
}));

const App = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const isLoading = useSelector(selectIsLoading);
  const noResults = useSelector(selectNoResults);
  const distanceFilter = useSelector(selectDistancefilter);
  const durationFilter = useSelector(selectDurationFilter);
 
  const [durationFilterError, setDurationFilterError] = useState(false);
  const [distanceFilterError, setDistanceFilterError] = useState(false);

  const containerRef = createRef();

  useEffect(() => {
    dispatch(fetchCars());
  }, []);

  const handleScrollToTop = () => {
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleDurationFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setDurationFilter(event.target.value));
  };

  const handleDistanceFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setDistanceFilter(event.target.value));
  };

  const handleApplyFilters = () => {
    setDurationFilterError(false);
    setDistanceFilterError(false);
    //check input
    let distance: number = Number(distanceFilter);
    let duration: number = Number(durationFilter);
    let inputsValid: boolean = true;

    if (distance !== 0 && (distance < 50 || distance > 3000)) {
      setDistanceFilterError(true);
      inputsValid = false;
    }

    if (duration !==0 && (duration < 1 || duration > 30)) {
      setDurationFilterError(true);
      inputsValid = false;
    }

    if (inputsValid) dispatch(fetchCars());
  };

  const handleClearFilters = () => {
    dispatch(setDurationFilter(""));
    dispatch(setDistanceFilter(""));
    setDurationFilterError(false);
    setDistanceFilterError(false);
    dispatch(fetchCars());
  };

  return (
    <Container ref={containerRef}>
      <Box fontWeight="fontWeightBold" fontSize={32} fontFamily="fontFamily">
        Rent a car
      </Box>
      <Box mb={3}>
        <Divider />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Card>
            <Box p={1}>
              <Box mb={1} fontFamily="fontFamily">
                Filter by
              </Box>
              <Box my={2}>
                <Input
                  type="number"
                  error={durationFilterError}
                  id="duration-filter-input"
                  value={durationFilter}
                  onChange={handleDurationFilterChange}
                  inputProps={{ min: "1", max: "30", step: "1" }}
                  endAdornment={
                    <InputAdornment position="end">days</InputAdornment>
                  }
                  fullWidth
                />
                {durationFilterError && (
                  <Box color="red" fontFamily="fontFamily">
                    Must be between 1 and 30
                  </Box>
                )}
              </Box>
              <Box my={2}>
                <Input
                  type="number"
                  error={distanceFilterError}
                  id="distance-filter-input"
                  value={distanceFilter}
                  onChange={handleDistanceFilterChange}
                  inputProps={{ min: "50", max: "3000", step: "50" }}
                  endAdornment={
                    <InputAdornment position="end">km</InputAdornment>
                  }
                  fullWidth
                />
                {distanceFilterError && (
                  <Box color="red" fontFamily="fontFamily">
                    Must be between 50 and 3000
                  </Box>
                )}
              </Box>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                style={{ textTransform: "none" }}
                fullWidth
                onClick={handleApplyFilters}
              >
                Apply filters
              </Button>
              <Button
                color="primary"
                disableElevation
                style={{ textTransform: "none" }}
                fullWidth
                onClick={handleClearFilters}
              >
                Clear filters
              </Button>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={10}>
          {isLoading && (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}
          {cars && cars.length > 0 && (
            <React.Fragment>
              <Box m={1} fontFamily="fontFamily">{cars.length} results</Box>
              <Box display="flex" flexWrap="wrap" m={1}>
                {cars.map((car, index) => (
                  <CarCard key={index} car={car} />
                ))}
              </Box>
            </React.Fragment>
          )}
          {noResults && (
            <Box display="flex" justifyContent="center">
              <Box>Sorry no results, try different filters</Box>
            </Box>
          )}
        </Grid>
      </Grid>
      <Fab className={classes.fab} color="primary" onClick={handleScrollToTop}>
        <KeyboardArrowUpIcon />
      </Fab>
    </Container>
  );
};

export default App;
