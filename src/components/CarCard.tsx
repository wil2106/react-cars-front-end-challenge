import * as React from 'react';
import Car from "../shared/interfaces/car.interface";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

interface CarCardProps {
    car: Car
}

const CarCard = ({ car }: CarCardProps) => {
    return (
     <Box m={1}>
        <Card>
            <CardActionArea>
            <img src={car.picturePath} alt="test" style={{maxWidth: 300}}/>
            <CardContent>
                <Box display="flex" width="100%" justifyContent="center" fontSize={24} mb={0.5}>
                    {car.brand} {car.model}
                </Box>
                <Divider/>
                <Box mt={1}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Price per day: {car.pricePerDay} • Price per Km: {car.pricePerKm}
                    </Typography>
                </Box>
            </CardContent>
            </CardActionArea>
        </Card>
     </Box>
    )

};

export default CarCard;
