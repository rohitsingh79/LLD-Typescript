// chain of responsbility pattern
// facade pattern
// observer pattern

// modals
class Course {
    public id:string = '';
    public name:string = '';
    public preReq:Course | null  = null;
    constructor(id:string , name:string , preReq?:Course){
        this.id = id;
        this.name = name;
        this.preReq = preReq || null
    }
}

class CourseBuilder{
    public prof:Professor | null = null;
    public students:Student[] = [];
    public waitList:Student[] = [];
    public course:Course|null = null
    public cap:number = 0;
    assignProd(prof:Professor):CourseBuilder{
        this.prof = prof;
        return this;
    }
    assignStudents(student:Student):CourseBuilder{
        this.students.push(student);
        return this;
    }
    addCourse(course:Course):CourseBuilder{this.course = course; return this;}
    addCap(cap:number):CourseBuilder{this.cap = cap; return this}
    build():CourseOfferings{return new CourseOfferings(this);}


}
class CourseOfferings{
    public prof:Professor | null;
    public regStudents:Student[];
    public waitList:Student[] | null = [];
    public course:Course|null;
    public cap:number = 0;
    public WaitListManager:WaitListManager | null = null
    constructor(Builder:CourseBuilder){
        this.prof = Builder.prof;
        this.regStudents = Builder.students;
        this.waitList = Builder.waitList;
        this.course = Builder.course;
        this.cap = Builder.cap;
    }
    addStudent(student:Student):void{
        console.log(`${student.name} is registered for the course--> ${this.course?.name}`)
        this.regStudents.push(student);
    }
    decreaseCapacity():void{
        this.cap-=1;
    }
    addObserver(listObserver:WaitListManager){
        this.WaitListManager = listObserver
    }

    increaseCapacity():void{
        this.cap+=1;
        this.WaitListManager?.onSpotFree(this)
    }
}

class Professor{
    public id:string = ''
    public name:string = ''
    constructor(id:string , name:string){
        this.id = id;
        this.name = name;
    }
}
class Student{
    public id:string = ''
    public name:string = ''
    public completedCourses:Course[] = [];
    constructor(id:string , name:string , completedCourses:Course[]){
        this.id = id;
        this.name = name;
        this.completedCourses = completedCourses;
    }
}

// res chain handler
abstract class RegistrationHandler{
    public nextHandler:RegistrationHandler|null = null;
    setNextChain(handler:RegistrationHandler):void{this.nextHandler = handler; }
    handle(c:CourseOfferings , s:Student):void{}
    protected abstract handleNext(c:CourseOfferings , s:Student):void;

}
class PreReqHandler extends RegistrationHandler {
    handle(c:CourseOfferings , s:Student):void{
        // check logic for preRequisite
        const completedCourseByStudent:Course[]= s.completedCourses;
        const preReqToBeCompleted:Course | null | undefined = c?.course?.preReq;
        const isPreReqCompleted = completedCourseByStudent.find((course) => course.id === preReqToBeCompleted?.id)
        if(isPreReqCompleted){
            console.log('pre requisite is matched for the course-->' ,isPreReqCompleted.name )
        }
        else {
            throw new Error('pre requisite is missing')
        }

        this.handleNext(c , s);
    }
    handleNext(course:CourseOfferings , student:Student):void{
        this.nextHandler?.handle(course , student)
    }


}
class CapacityHandler extends RegistrationHandler{
    handle(c:CourseOfferings , s:Student):void{
        // check logic for capacity
        const capacity:number = c.cap;
        if(capacity < c.regStudents.length){
            // throw new Error('capacity is full cannot register');
            console.log(`${s.name} cannot be assigned course because ${c?.course?.name} course is full`)
            c?.waitList?.push(s);
            console.log(`added ${s.name} to the wait list`)
        }
        else{
            console.log('there is capacity for student-->' , s.name);
            // decrease the capacity
            console.log('capacity before' , capacity)
            c.decreaseCapacity();
            console.log('after registering the capacity is' , c.cap)
            this.handleNext(c , s);
        }

    }
    handleNext(course:CourseOfferings , student:Student):void{
        course.addStudent(student);
    }
}

class RegistrationRequestService{
    registrationRuleHandler:RegistrationHandler| null = null;
    public pre:PreReqHandler | null = null;
    public cap:PreReqHandler | null = null;
    constructor(){
        this.pre = new PreReqHandler();
        this.cap = new CapacityHandler();
        this.pre.setNextChain(this.cap)
        this.registrationRuleHandler = this.pre;
    }

    handleRegistration(course:CourseOfferings , student:Student):void{
        this.registrationRuleHandler?.handle(course ,student );
    }



}

// course registration facade
class CRFacade{
    registrationRequestService:RegistrationRequestService;
    constructor(){
        this.registrationRequestService = new RegistrationRequestService();
    }
    registerStudent(course:CourseOfferings , student:Student):void{
        this.registrationRequestService.handleRegistration(course ,student)
    }
}


// demo
// create course , student , professor
const c1preReq = new Course('array-123' ,'array',)
const c1 = new Course('id-123' ,'DSA' , c1preReq)
const s1 = new Student('id-456' , 'Ronit' , [c1preReq]);
const s2 = new  Student('id-079' , 'Kalpit' , [c1preReq])
const p1 = new Professor('id-789' , 'rekha')

// create a course offering using builder

const courseBuilder = new CourseBuilder();
const courseOffering:CourseOfferings = courseBuilder
    .addCourse(c1).assignProd(p1).addCap(1).build();

// register a student for the course after checking preq and course capacity
const regFacade = new CRFacade();
regFacade.registerStudent(courseOffering , s1);
regFacade.registerStudent(courseOffering , s2);

// interface to notify the students when slot is free
interface Notify{
    onSpotFree(course:CourseOfferings):void;
}

// create a waitlist manager which observes if any student drops

class WaitListManager implements Notify{
    public registrationRequestService:RegistrationRequestService
    constructor(service:RegistrationRequestService){
        this.registrationRequestService = service
    }
    onSpotFree(course:CourseOfferings){
            const waitingStudent:Student  = course?.waitList?.shift() as Student
        this.registrationRequestService.handleRegistration(course ,waitingStudent);
    }
}

const waitListManager = new WaitListManager(new RegistrationRequestService());
courseOffering.addObserver(waitListManager)
courseOffering.increaseCapacity();




