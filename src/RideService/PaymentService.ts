// calculate the price of the ride using diff strategy
import {PaymentStatus, Ride} from "./Ride";

export interface FareCalculationStrategyInterface{
    calc: (distance:number) => number;
}

export interface PaymentStrategyInterface{
    pay(amount:number):void;
}

export class FlatRateStrategy implements FareCalculationStrategyInterface{
    calc(distance:number):number{
        return 0.5*distance;
    }
}

export class UPIPaymentStrategy implements PaymentStrategyInterface{
    pay(amount:number):void{
        console.log(`${amount} has been paid from upi`)
    }
}

// implementation of the payment gateway such as razorpay , pay pal
interface GatewayInterface{
    makePayment: (amount:number) => void
}

// abstraction for the payment method
abstract class PaymentMethod implements PaymentStrategyInterface{
     protected constructor( protected paymentGateway:GatewayInterface){
        this.paymentGateway = paymentGateway
    }
    pay(amount:number):void{}
}

// razorPayGatewayInterface implementation
export class RazorPayGateway implements GatewayInterface {
    makePayment(amount:number):void{
        console.log(`razor pay will charge you with ${amount}`)
    }
}

// connector which connected the abstraction with implementation
export class CreditCardStrategy extends PaymentMethod {
    constructor(paymentGateway:GatewayInterface){
        super(paymentGateway);
    }

    // override the method
    pay(amount:number):void{
        console.log(`payment of ${amount} is being processed through credit card `);
        this.paymentGateway.makePayment(amount);
    }

    getCreditCardName(name:string):void{
        console.log('credit card name is visa')
    }
}


// adapter pattern
export class StripeGateway {
    chargeAmount(amount:number):void {
        console.log('stripe gateway is making the payment');
    }
}

export class StripeAdapter implements GatewayInterface{
      stripe:StripeGateway = new StripeGateway();
    makePayment(amount:number):void{
        this.stripe.chargeAmount(amount);

    }

}



export class PaymentService {
    public fareCalcStrategy:FareCalculationStrategyInterface;
    public paymentStrategy:PaymentStrategyInterface;
    constructor(pricingStrategy:FareCalculationStrategyInterface ,paymentStrategy:PaymentStrategyInterface){
        this.fareCalcStrategy=pricingStrategy;
        this.paymentStrategy = paymentStrategy;
    }

    calculateFareForRide(ride:Ride):void{
        //TODO: calculate the distance from source to destination
        const rideFare:number = this.fareCalcStrategy.calc(45)
        ride.setFare(rideFare)
    }

    makePaymentForRide(ride:Ride , amount:number):void{
        // check payment status
        if(ride.getPaymentStatus() === PaymentStatus.notPaid){
            this.paymentStrategy.pay(amount)
            ride.setPaymentStatus(PaymentStatus.paid)
        }
        else {
            console.log(`payment has already been completed for ride ${ride.id}`)
        }
    }


}