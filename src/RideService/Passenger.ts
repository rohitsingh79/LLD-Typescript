export class Passenger {
    private name:string
    constructor(name:string) {
        this.name = name
    }
    getPassenger():void{
        console.log(this.name)
    }
}