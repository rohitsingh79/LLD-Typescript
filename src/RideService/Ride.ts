import {Passenger} from "./Passenger";
import {Driver} from "./Driver";

export class Ride {
    private passenger:Passenger;
    private driver:Driver;
    private id:number = 0;
    constructor(driver:Driver , passenger:Passenger) {
        this.driver = driver;
        this.passenger = passenger;
        this.id = this.id+1
    }

    getRideDetails():void {
        console.log(`ride id ${this.id}`)
        this.passenger.getPassenger()
        this.driver.getDriver();
    }
}