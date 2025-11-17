import {Passenger} from "./Passenger";
import {Driver} from "./Driver";

export enum RideStatus {
    requested = 'REQUESTED',
    booked = 'BOOKED',
    inProgress = 'IN_PROGRESS',
    completed = 'COMPLETED',

}

export class Ride {

    private static rideCounter : number = 0;
    public passenger:Passenger | null;
    public driver:Driver| null;
    public id:number = 0;
    public status:RideStatus  = RideStatus.requested
    public src:string;
    public dst:string;
    constructor(passenger:Passenger , driver?:Driver , src?:string , dst?:string) {
        this.driver = null
        this.passenger = passenger;
        this.src = src as string;
        this.dst = dst as string;
        this.id = Ride.rideCounter+1;
    }

    getRideDetails():void {
        console.log(`--------ride id ${this.id}--------`)
        console.log(`passenger --> ${this.passenger?.getPassenger()}`)
        console.log(`driver --> ${this.driver?.getDriver()}`);
        console.log(`status --> ${this.getStatus()}`)
        console.log(`----------------`)
    }


    assignDriver(driver:Driver){
        this.driver = driver
    }

    getStatus():RideStatus{
        return this.status
    }
}