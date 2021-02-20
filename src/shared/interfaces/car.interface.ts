import Availability from "./availability.interface";

export default interface Car {
    id: number,
    picturePath?: string,
    brand: string,
    model: string,
    pricePerDay?: number,
    pricePerKm?: number,
    availability?: Availability
}
