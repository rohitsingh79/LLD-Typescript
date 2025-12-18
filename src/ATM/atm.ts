// ATM --> Banking service && Cash dispenser
// Banking service --> validate the account && deduct the money from user acct
// Account --> holds account details
// Transaction class to hold withdrawl transaction or balance check transaction

class Acc {
    public id:number;
    public balance:number
    constructor(id:number , balance:number) {this.id = id; this.balance = balance;}
}

class BS {
    public acc:Acc[];
    constructor(){this.acc = [];}
    add(acc:Acc):void{this.acc.push(acc)}
    getDetails(id:number):Acc|undefined {return this.acc.find((a:Acc) => a.id === id)}
    withdraw(acc:Acc , amount:number):void{
        this.acc = this.acc.map((a:Acc):Acc => {if(a.id === acc.id){
            a.balance-=amount;
        }return a;})
    }
}

// chain of responsibility pattern
interface Chain{
    setNextChain(chain:Chain):void;
    dispenseAmount(amount:number):void;
}

abstract class Dispenser implements Chain {
    public notes:number;
    protected nextHandler?:Chain;
    protected noteValue:number
    protected constructor(notes:number , value:number){
        this.notes = notes
        this.noteValue = value;
    }
    setNextChain(handler:Chain){this.nextHandler = handler;}
    dispenseAmount(amount:number):void{
        console.log('dispensing amount' , amount)
        console.log('number of notes to be used' , this.notes)
        let  noOfNotes:number = Math.floor(amount/this.noteValue)
         noOfNotes = this.notes>=noOfNotes? noOfNotes: this.notes
        console.log('remaining amount' , amount - (noOfNotes * this.noteValue))
        this.notes-= this.notes>=noOfNotes? noOfNotes: this.notes;
        this.nextHandler?.dispenseAmount(amount - (noOfNotes * this.noteValue));   // check the logic if more notes can be disbursed
    }

}

class noteHundred extends Dispenser{
    constructor(notes:number , value:number){
        super(notes , value)
    }
}
class noteFiveHundred extends Dispenser{
    constructor(notes:number , value:number){
        super(notes , value)
    }
}

class NoteDispenser {
    public dis:Chain;
    constructor(dis:Chain){
        this.dis = dis;
    }
    dispenseCash(amount:number){
        this.dis.dispenseAmount(amount);
    }
}


class ATM{
    public bs:BS
    public cashDispenser:NoteDispenser
    constructor(bs:BS){
        this.bs = bs
        const dis1 = new noteHundred(1 , 100);
        const dis2 = new noteFiveHundred(1 , 500);
        dis1.setNextChain(dis2);
        this.cashDispenser = new NoteDispenser(dis1);

    }
    withdraw(acc:Acc , amount:number):void{
        this.bs.withdraw(acc, amount);
        this.cashDispenser.dispenseCash(amount)
    }

}



// demo;
const acc = new Acc(123 , 1000 );
const bs = new BS();
bs.add(acc);
const atm = new ATM(bs);

// withdraw transaction
atm.withdraw(acc , 600);





