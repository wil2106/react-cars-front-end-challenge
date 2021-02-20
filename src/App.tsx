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
import { makeStyles, useTheme } from "@material-ui/core/styles";

import {
  selectCars,
  fetchCars,
  selectIsLoading,
  selectNoResults,
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

  const containerRef = React.createRef();

  useEffect(() => {
    dispatch(fetchCars());
  }, []);

  const handleScrollToTop = () => {
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <Container ref={containerRef}>
      <Box fontWeight="fontWeightBold" fontSize={32} borderBottom={1} mb={4} fontFamily="fontFamily">
        Rent a car
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={10}>
          {isLoading && (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}
          {cars && cars.length > 0 && (
            <Box display="flex" flexWrap="wrap" borderLeft={1} p={1}>
              {cars.map((car, index) => (
                <CarCard key={index} car={car} />
              ))}
            </Box>
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
