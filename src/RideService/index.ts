import {RideService} from "./RideService";
import {Driver, RideType} from "./Driver";
import {Passenger} from "./Passenger";
import {DriverSubject} from "./DriverObserver/DriverSubject";
import {PremiumDriverSelector} from "./DriverSelectorStrategy/PremiumDriverSelector";


const rideService = new RideService()
const driverSubjectController= new DriverSubject();

const driver1 = new Driver('John' , RideType.Regular);
const driver2 = new Driver('Michael' , RideType.Premium);
const driver3 = new Driver('Ajay' , RideType.Premium);
const passenger1 = new Passenger('Tim');

// add driver
rideService.addDriver(driver1);
rideService.addDriver(driver2);
rideService.addDriver(driver3);

// add passenger
rideService.addPassenger(passenger1);

// set ride selection strategy
rideService.setDriverSelectionStrategy(new PremiumDriverSelector())

// add subject observer
driverSubjectController.addDriver(driver1);
driverSubjectController.addDriver(driver2);
driverSubjectController.addDriver(driver3);

// request a ride from passenger

const rideP1 = rideService.requestRide(passenger1 , '72.334' , '75.335')

// driver accepts the request
driver2.acceptRideRequest(rideP1)

rideP1.getRideDetails()

// book the ride
rideService.bookRide(rideP1);

rideP1.getRideDetails()

// start the ride
rideService.startRide(rideP1);

rideP1.getRideDetails()

// complete the ride
rideService.completeRide(rideP1);

rideP1.getRideDetails()



