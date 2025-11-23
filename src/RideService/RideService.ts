
import {Driver} from "./Driver";
import {Passenger} from "./Passenger";
import {Ride, RideStatus} from "./Ride";
import {DriverStrategyInterface} from "./DriverSelectorStrategy/DriverStrategyInterface";
import {regularDriverSelector} from "./DriverSelectorStrategy/RegularDriverSelector";


export class RideService {
    private drivers:Driver[]
    private passenger:Passenger[];
    private driverSelectionStrategy:DriverStrategyInterface

    constructor(){
        this.drivers = [];
        this.passenger = [];
        this.driverSelectionStrategy = new regularDriverSelector()
    }

    addDriver(driver:Driver):void{
        this.drivers.push(driver);
    }

    addPassenger(passenger:Passenger):void{
        this.passenger.push(passenger);
    }

    assignRider(ride:Ride, driver:Driver ):void{
        ride.assignDriver(driver)
    }

    bookRide(ride:Ride):void{
        ride.status = RideStatus.booked;
    }

    startRide(ride:Ride):void{
        ride.status = RideStatus.inProgress;
    }

    completeRide(ride:Ride):void{
        ride.status = RideStatus.completed;
    }

    setDriverSelectionStrategy(driverSelectionStrategy:DriverStrategyInterface){
        this.driverSelectionStrategy = driverSelectionStrategy
    }

    acceptRideRequest(ride:Ride,  driver:Driver):void {
         this.assignRider(ride , driver);
}

    // TODO: send the list of drivers based on filtering and strategy used
    getAvailableDrivers():void{

    }
}