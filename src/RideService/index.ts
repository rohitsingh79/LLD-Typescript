import {RideService} from "./RideService";
import {Driver} from "./Driver";
import {Passenger} from "./Passenger";
import {Ride} from "./Ride";
import {PremiumDriverSelector} from "./DriverSelector/PremiumDriverSelector";


const rideService = new RideService()

const driver1 = new Driver('Rohit');
const driver2 = new Driver('Kalpit');
const driver3 = new Driver('Ajay');

rideService.addDriver(driver1);
rideService.addDriver(driver2);
rideService.addDriver(driver3);

const passenger1 = new Passenger('Ravindra');

rideService.addPassenger(passenger1);


// set the strategy at run time
rideService.setDriverSelectionStrategy(new PremiumDriverSelector())

// find driver for passenger 1
const driverRide1:Driver = rideService.findDriver('hebbal' , 'manyata');
const ride1:Ride = rideService.createRide(passenger1 , driverRide1)

ride1.getRideDetails();


