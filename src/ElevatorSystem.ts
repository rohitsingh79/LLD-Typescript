
interface State{
    move:(elevator:Elevator)=> void,
}
class MoveUpState implements State{
    move(e:Elevator):void {
         if(e.upwardRequestList.length===0 && e.downwardRequestList.length===0){
            console.log('no more floor requests , in idle state')
        }
        else if (e.upwardRequestList.length!==0){
            const destinationFloor:number = e.upwardRequestList[0]
            e.currentFloor+=1;
            console.log(`current floor: ${e.currentFloor}`)
            if( e.currentFloor === destinationFloor){
                console.log(`${destinationFloor} floor is reached`)
                e.upwardRequestList.shift()
            }
        }
        else {
            e.setState(new MoveDownState())
         }
        }
    }

class MoveDownState implements State{
    move(e:Elevator):void {
         if(e.downwardRequestList.length===0 && e.upwardRequestList.length===0){
            console.log('no more floor requests , in idle state')
        }
        else if(e.downwardRequestList.length!==0){
            const destinationFloor:number = e.downwardRequestList[0]
            e.currentFloor-=1;
             console.log(`current floor: ${e.currentFloor}`)
            if( e.currentFloor === destinationFloor){
                console.log(`${destinationFloor} floor is reached`)
                e.downwardRequestList.shift()
            }
        }
        else{
             e.setState(new MoveUpState())
         }
    }
}
class Elevator{
    currentFloor:number;
    currentState:State;
    upwardRequestList:Array<number>
    downwardRequestList:Array<number>
    constructor(){
        this.currentFloor  = 0;
        this.currentState = new MoveUpState();
        this.upwardRequestList = [];
        this.downwardRequestList = [];
    }
    addRequest(floor:number , direction:string):void{
        if(direction === 'U') this.upwardRequestList.push(floor)
        if(direction === 'D') this.downwardRequestList.push(floor)

    }
    move():void{
        console.log('sleep')
        setInterval(()=> this.currentState.move(this) ,  2000)
    }
    setState(state:State){
        this.currentState = state;
    }
}
class ElevatorSystem {
    public elevator:Elevator;
    constructor(){
        this.elevator = new Elevator();
    }
    start(){
        this.elevator.move();
    }
    requestFloor(floor:number , direction:string):void{
        this.elevator.addRequest(floor, direction);
    }
}

const system = new ElevatorSystem();
system.start();
system.requestFloor(1 , 'U')
system.requestFloor(4 , 'U')
system.requestFloor(2 , 'D')