
import {Driver} from "./Driver";
import {Passenger} from "./Passenger";
import {Ride} from "./Ride";
import {DriverStrategyInterface} from "./DriverSelector/DriverSelectorStrategyInterface";
import {standardDriverSelector} from "./DriverSelector/StandardDriverSelector";

// add the list of driver , passengers
// search for the drivers based on the strategy
// create a ride and add it to the ride list


export class RideService {
    private drivers:Driver[]
    private passenger:Passenger[];
    private rideList: Ride[];
    private driverSelectionStrategy:DriverStrategyInterface

    constructor(){
        this.drivers = [];
        this.passenger = [];
        this.rideList = [];
        this.driverSelectionStrategy = new standardDriverSelector()
    }

    addDriver(driver:Driver):void{
        this.drivers.push(driver);
    }

    addPassenger(passenger:Passenger):void{
        this.passenger.push(passenger);
    }

    findDriver(start:string , end:string):Driver {
        // 1. strategy check (premium , normal)
        // 2. use the algorithms to find the nearest based in the strategy
        // 3. filters the one who are busy
        // 3. notify the remaining  drivers
        // 4. if accept create a ride and mark the driver as busy
        return this.driverSelectionStrategy.findDriver(this.drivers)
    }

    createRide(passenger:Passenger , driver:Driver ):Ride{
        return new Ride(driver , passenger)
    }

    addRideToTheList(ride:Ride){
        this.rideList.push(ride);
    }

    setDriverSelectionStrategy(driverSelectionStrategy:DriverStrategyInterface){
        this.driverSelectionStrategy = driverSelectionStrategy
    }

}