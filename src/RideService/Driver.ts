export class Driver {
    private name:string
    constructor(name:string) {
        this.name = name
    }

    getDriver():void{
        console.log(this.name)
    }
}