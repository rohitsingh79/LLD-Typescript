import {RideService} from "./RideService";
import {Driver, RideType} from "./Driver";
import {Passenger} from "./Passenger";
import {DriverSubject} from "./DriverObserver/DriverSubject";
import {PremiumDriverSelector} from "./DriverSelectorStrategy/PremiumDriverSelector";
import {Ride, RideBuilder} from "./Ride";
import {
    CreditCardStrategy,
    FlatRateStrategy,
    PaymentService,
    RazorPayGateway, StripeAdapter,
    UPIPaymentStrategy
} from "./PaymentService";


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

// build a ride

const rideBuilder = new RideBuilder()
const ridePass1:Ride = rideBuilder.assignPassenger(passenger1).setSrc('82.334').setDest('85.335').build()

// driver accepts the request
driver2.acceptRideRequest(ridePass1)

ridePass1.getRideDetails()

// book the ride
rideService.bookRide(ridePass1);

ridePass1.getRideDetails()

// start the ride
rideService.startRide(ridePass1);

ridePass1.getRideDetails()

// complete the ride
rideService.completeRide(ridePass1);
//
ridePass1.getRideDetails()


// const razorpayGateWay = new RazorPayGateway();
const stripeAdapter = new StripeAdapter();

const creditCardPaymentStrategy = new CreditCardStrategy(stripeAdapter);

const paymentService:PaymentService = new PaymentService(new FlatRateStrategy() ,creditCardPaymentStrategy )

// calc the fare for ride
paymentService.calculateFareForRide(ridePass1)

console.log('fareDetails' , ridePass1.getFareDetails());

// make payment for the ride using upi

paymentService.makePaymentForRide(ridePass1 ,ridePass1.getFareDetails());

console.log(`payment status for ride id ${ridePass1.id} is ` , ridePass1.getPaymentStatus());





