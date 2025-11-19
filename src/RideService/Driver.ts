import {DriverObserverInterface} from "./DriverObserver/DriverObserverInterface";
import {RideService} from "./RideService";
import {Ride, Ride1} from "./Ride";

export enum RideType {
    Regular = "REGULAR",
    Premium = "PREMIUM"
}

export class Driver implements DriverObserverInterface{
    public name:string
    public rideService:RideService;
    public serviceType:RideType

    constructor(name:string , serviceType:RideType) {
        this.name = name
        this.rideService = new RideService();
        this.serviceType = serviceType
    }

    getDriver():string{
        return this.name
    }

    notifyRideRequest(ride:Ride):void{
        console.log(`${this.name} driver has received ride request from ${ride.src} for the passenger 
        ${ride.passenger?.getPassenger()}`);
    }

    acceptRideRequest(ride:Ride1):void{
         this.rideService.acceptRideRequest( ride, this)
    }
}