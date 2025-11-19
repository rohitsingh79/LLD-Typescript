import {Passenger} from "./Passenger";
import {Driver} from "./Driver";

export enum RideStatus {
    requested = 'REQUESTED',
    booked = 'BOOKED',
    inProgress = 'IN_PROGRESS',
    completed = 'COMPLETED',

}

// builder pattern
export class RideBuilder{
    public passenger:Passenger | null;
    public driver:Driver | null;
    public id:number = 0;
    public status:RideStatus  = RideStatus.requested
    public src?:string | undefined;
    public dst?:string | undefined;

    constructor(){
        this.passenger = null;
        this.driver = null;
        this.src = '';
        this.dst = '';
    }

    assignPassenger(passenger:Passenger):RideBuilder{
        this.passenger = passenger;
        return this;
    }

    assignDriver(driver:Driver):RideBuilder{
        this.driver = driver;
        return this;
    }
    setSrc(source:string):RideBuilder{
        this.src = source;
        return this;
    }
    setDest(dst:string):RideBuilder{
        this.dst = dst;
        return this;
    }

    build():Ride{
        return Ride.getInstance(this)
    }

}

export class Ride {
    private static rideCounter : number = 0;
    private static instance:Ride;
    public passenger:Passenger | null;
    public driver?:Driver;
    public id:number = 0;
    public status:RideStatus  = RideStatus.requested
    public src?:string;
    public dst?:string;
    constructor(builder:RideBuilder) {
        this.passenger = builder.passenger;
        this.id = Ride.rideCounter+1;
        this.src= builder.src;
        this.dst = builder.dst;
    }

    // singleton patten
    public static getInstance(RideBuilder:RideBuilder):Ride{
        if(!Ride.instance){
             Ride.instance = new Ride(RideBuilder)
        }
        return Ride.instance;
    }

    assignDriver(driver:Driver):void{
        this.driver = driver
    }

    getRideDetails():void {
        console.log(`--------ride id ${this.id}--------`)
        console.log(`passenger --> ${this.passenger?.getPassenger()}`)
        console.log(`driver --> ${this.driver?.getDriver()}`);
        console.log(`status --> ${this.getStatus()}`)
        console.log(`----------------`)
    }

    getStatus():RideStatus{
        return this.status
    }
}
