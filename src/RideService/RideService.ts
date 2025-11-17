
import {Driver} from "./Driver";
import {Passenger} from "./Passenger";
import {Ride, RideStatus} from "./Ride";
import {DriverStrategyInterface} from "./DriverSelectorStrategy/DriverStrategyInterface";
import {regularDriverSelector} from "./DriverSelectorStrategy/RegularDriverSelector";
import {DriverSubject} from "./DriverObserver/DriverSubject";


export class RideService {
    private drivers:Driver[]
    private passenger:Passenger[];
    private driverSelectionStrategy:DriverStrategyInterface
    private DriverNotifier:DriverSubject;

    constructor(){
        this.drivers = [];
        this.passenger = [];
        this.driverSelectionStrategy = new regularDriverSelector()
        this.DriverNotifier = new DriverSubject()
    }

    addDriver(driver:Driver):void{
        this.drivers.push(driver);
    }

    addPassenger(passenger:Passenger):void{
        this.passenger.push(passenger);
    }

    requestRide(passenger:Passenger , src:string , dst:string , ):Ride{
            return new Ride(passenger , undefined , src , dst)
    }

    findDriverForPassenger(rideDetails:Ride):Driver[] {
        const selectedDrivers:Driver[] = this.driverSelectionStrategy.findDrivers(this.drivers)
        this.DriverNotifier.sendNotificationToDrivers(selectedDrivers ,rideDetails )
        return selectedDrivers
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

    acceptRideRequest(ride:Ride ,  driver:Driver):void {
         this.assignRider(ride , driver);
}
}