import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../services/questions.service';
import { LecturersService } from '../services/lecturers.service';
import { EvaluationsService } from '../services/evaluations.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})

export class EvaluationComponent implements OnInit {

  questions = [] ;

  lecturers = [] ;

  answers = [] ;

  slectedLecturerId = 0
  
  loginKey = 0

  data = {
    dep_id : 0,
    st_id : 0
  }

  constructor(  private questionsService: QuestionsService ,
                private lecturersService: LecturersService ,
                private evaluationsService: EvaluationsService,
                private router: Router) {

  }
    
  
  ngOnInit() {
    this.setData()
    this.getQuestions()
    this.getLecturers()
  }


  // send key to Evaluation Done
  sendKey() {

    var info = {
      "loginKey" : this.loginKey,
      "lecID" : this.slectedLecturerId,
      "stId" : this.data.st_id
    }

    this.evaluationsService.sendEvaluation( info )
      .subscribe ( data => {
        if ( data["success"] ) {
          console.log("Seccessful Send Evaluaion")
        } else {       
          console.log("Not Seccessful Send Evaluaion")
        }
      })
  }

  // set department & stage & login Key ...
  setData() {

    this.data.dep_id  = Number(localStorage.getItem("department"));
    this.data.st_id   = Number(localStorage.getItem("stage"));
    this.loginKey     = Number(localStorage.getItem("key"));

  }



  // add evaluation to database 
  submitEvaluation() {

    var check = 0 

    // this.answers.forEach ( answer => {
      
    //   var info = {
    //     "lecturer_id" : this.slectedLecturerId,
    //     "q_id" : answer["question"] ,
    //     "answer" : answer["answer"]
    //   }

    //   this.evaluationsService.add( info )
    //     .subscribe ( data => {
    //       if ( data["success"]) {
    //         check = 1
    //         console.log("seccessful")
    //       } else {
    //         window.alert("حدث خطأ ما .")
    //       }
    //     })
    // })

    if ( this.slectedLecturerId != 0 ) {
      
      var answer = this.countAnswers();

      var info = {
        "lecturer_id" : this.slectedLecturerId,
        "yes" : answer["yes"],
        "no" : answer["no"],
        "some" : answer["some"]
      }
  
      this.evaluationsService.add( info )
        .subscribe ( data => {
          if ( data["success"]) {
            check = 1
            console.log("seccessful")
          } else {
            window.alert("حدث خطأ ما .")
          }
        })
  
      var info2 = {
        "loginKey" : this.loginKey,
        "depId" : this.data.dep_id,
        "stId" : this.data.st_id
      }
      
      if ( check = 1 ) {  // if data submited correctly
  
        this.sendKey()    // send key to evalution done
  
        // check number of lecturers evaluated to remove the login key after evaluate lastest lec.
        if ( this.lecturers.length == 1 ) {
          this.removeLoginKey(info2)
        }
        this.slectedLecturerId = 0
        this.getLecturers()
        
      } else {
        window.alert("حدث خطأ ما .")
      }
    }

  }



  // get question using question service
  getQuestions() {
    this.questionsService.get()
      .subscribe (
        data => {
          this.questions = data;
      })
  }



  // get lecturers using lecturers service
  getLecturers() {

    const info = {
      "loginKey" : this.loginKey,
      "depId" : this.data.dep_id,
      "stId" : this.data.st_id
    }

    this.lecturersService.getUnEvaluatedLec( info )
      .subscribe ( data => {
        this.lecturers = data
      })
  }



  // Get all answer
  getAnswer( question:number , answer: number ) {

    if ( this.answers.length == 0 ) {
      this.answers.push({ 
        "question" : question ,
        "answer" : answer
      })
    }
    
    if ( this.answers.length > 0 ) {

      for (var i = 0; i < this.answers.length; i++) {
        
        if (  this.answers[i]["question"] == question ) {
          this.answers[i]["answer"] = answer
          break
        }
        
        if ( i == (this.answers.length - 1) ) {
            this.answers.push({ 
              "question" : question ,
              "answer" : answer
            })
        }
      }
    }

  }




  // count number of yes , no , some in student answers ...
  countAnswers() {
    
    var yes = 0 ,
        no = 0 , 
        some = 0 ;

    this.answers.forEach ( element => {
      if ( element["answer"] == 1) {
        yes++;
      } else if ( element["answer"] == 2 ) {
        some++;
      } else {
        no++;
      }
    })

    return {
      "yes" : yes ,
      "some" : some ,
      "no" : no 
    }
  }




  // remove login key after evaluation is done ...
  removeLoginKey( info ) {
    this.evaluationsService.removeLoginKey( info )
      .subscribe( data => {
        if ( data["success"] ) {

          window.alert("لقد انتهى تقييمك لجميع الاساتذة ، شكر ا لك ")
          this.router.navigate(["/login"])

        } else {
          console.log("Login Key Not Removed")
        }
      }) 
  }



  // get id of slected lecturer
  getSlectedLecturer( event ) {
    this.slectedLecturerId = event.target.value
  }

}
