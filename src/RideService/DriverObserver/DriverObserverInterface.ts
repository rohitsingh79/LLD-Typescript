import {Ride} from "../Ride";

export interface DriverObserverInterface {
    notifyRideRequest:(ride:Ride) => void;
}