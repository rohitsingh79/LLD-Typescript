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
    public waitList:Student[] | null;
    public course:Course|null;
    public cap:number = 0;
    constructor(Builder:CourseBuilder){
        this.prof = Builder.prof;
        this.regStudents = Builder.students;
        this.waitList = null;
        this.course = Builder.course;
        this.cap = Builder.cap;
    }
    addStudent(student:Student):void{
        console.log('student is assigned')
        this.regStudents.push(student);
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
        console.log('pre requiste is matched')
        this.handleNext(c , s);
    }
    handleNext(course:CourseOfferings , student:Student):void{
        this.nextHandler?.handle(course , student)
    }


}
class CapacityHandler extends RegistrationHandler{
    handle(c:CourseOfferings , s:Student):void{
        // check logic for capacity
        console.log('capacity planning is dine')
        this.handleNext(c , s);
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
const c1 = new Course('id-123' ,'dsa' , c1preReq)
const s1 = new Student('id-456' , 'rohit' , [c1preReq]);
const p1 = new Professor('id-789' , 'rekha')

// create a course offering using builder

const courseBuilder = new CourseBuilder();
const courseOffering:CourseOfferings = courseBuilder
    .addCourse(c1).assignProd(p1).addCap(2).build();
console.log('before registering' ,courseOffering)

// register a student for the course after checking preq and course capacity
const regFacade = new CRFacade();
regFacade.registerStudent(courseOffering , s1);


console.log('after registering' ,JSON.stringify(courseOffering))

