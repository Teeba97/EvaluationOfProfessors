import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../services/questions.service';
import { LecturersService } from '../services/lecturers.service';
import { EvaluationsService } from '../services/evaluations.service';


@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})

export class EvaluationComponent implements OnInit {

  questions = [] ;

  lecturers = [] ;

  answers = [] ;

  slectedLecturerId : 0

  constructor(  private questionsService: QuestionsService ,
                private lecturersService: LecturersService ,
                private evaluationsService: EvaluationsService ) { }

  ngOnInit() {
    this.getQuestions()
    this.getLecturers()
  }

  // add evaluation to database 
  submitEvaluation() {

    var answers = this.countAnswers()
    var info = { 
      "lecturer_id": this.slectedLecturerId ,
      "yes": answers.yes ,
      "some": answers.some , 
      "no": answers.no
    }

    console.log(info)

    this.evaluationsService.add(info)
      .subscribe( data => {
        if ( data["success"]) {
          console.log("successfully added..")
        } else {
          console.log("faild to add")
        }
      })
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
    this.lecturersService.get()
      .subscribe ( 
        data => {
          this.lecturers = data;
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

    console.log( " length : " + this.answers.length )
    console.log(this.answers)

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

  // get id of slected lecturer
  getSlectedLecturer( event ) {
    this.slectedLecturerId = event.target.value
    console.log(event.target.value)
  }

}
