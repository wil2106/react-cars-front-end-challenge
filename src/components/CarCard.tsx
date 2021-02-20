import React, { useMemo } from "react";
import Car from "../shared/interfaces/car.interface";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import EuroSymbolIcon from "@material-ui/icons/EuroSymbol";
import {
  selectDistancefilter,
  selectDurationFilter,
} from "../features/catalogSlice";

import { useSelector } from "react-redux";

interface CarCardProps {
  car: Car;
}

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    top: theme.spacing(7),
    right: theme.spacing(2),
  },
}));

const CarCard = ({ car }: CarCardProps) => {
  const classes = useStyles();
  const distanceFilter = useSelector(selectDistancefilter);
  const durationFilter = useSelector(selectDurationFilter);

  //only recalculate if durationFilter or distanceFilter changed
  const price = React.useMemo(() => {
    let decreasePercentage: number = 1;
    let distance: number = Number(distanceFilter);
    let duration: number = Number(durationFilter);

    if (duration > 10) {
      decreasePercentage = 0.5;
    } else if (duration > 4) {
      decreasePercentage = 0.7;
    } else if (duration > 1) {
      decreasePercentage = 0.9;
    }

    return (
      (car.pricePerDay * duration + car.pricePerKm * distance) *
      decreasePercentage
    );
  }, [durationFilter, distanceFilter]);

  return (
    <Box m={1} width="300px">
      <Card>
        <CardActionArea>
          <Box display="flex" width="100%" justifyContent="center">
            <img src={car.picturePath} alt="test" style={{ maxWidth: 300 }} />
          </Box>
          {car.pricePerDay &&
            car.pricePerKm &&
            (durationFilter || distanceFilter) && (
              <Fab className={classes.fab} color="secondary">
                <Box color="white" display="flex">
                  {price} €
                </Box>
              </Fab>
            )}

          <CardContent>
            <Box
              display="flex"
              width="100%"
              justifyContent="center"
              fontSize={16}
              mb={0.5}
            >
              {car.brand} {car.model}
            </Box>
            <Divider />
            <Box mt={1} display="flex" width="100%" justifyContent="center">
              <Typography variant="body2" color="textSecondary" component="p">
                Max duration: {car.availability?.maxDuration} • Max distance:{" "}
                {car.availability?.maxDistance}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default CarCard;
