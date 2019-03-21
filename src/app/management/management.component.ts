import { Component, OnInit } from '@angular/core';
import { EvaluationsService } from '../services/evaluations.service';
import { QuestionsService } from '../services/questions.service';
@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  evaluations = []
  
  data  = {      // info 
    dep_id : 0,
    st_id : 0
  }

  num_of_q = 0
  counter_of_q = 0

  constructor( private evaluationsService: EvaluationsService,
    private questionsService:QuestionsService) {
      this.questionsService.getNumOfQ()
        .subscribe ( data => {

          this.num_of_q = data[0]['counter']
          console.log(this.num_of_q)
        })
   }

  ngOnInit() {
    this.getEvaluations()
  }


  // get form data base
  getEvaluations() {
    
    this.evaluations = []
    
    this.evaluationsService.get( this.data )
      .subscribe( data => {

        data.forEach ( element => {
          
          // get number of question 
          var sum = element["counter"] * this.num_of_q;

          var finalEvaluation = {
            "id" : element["id"] ,
            "name" : element["name"] ,
            "counter" : element["counter"],
            "yes" : ( element["yes"] / sum ) * 100 ,
            "no" : ( element["no"] / sum ) * 100 ,
            "some" : ( element["some"] / sum ) * 100
          }

          this.evaluations.push( finalEvaluation )

        }) // for each 
        
      })   // subscribe
  }

  selectDepartment( event ) {
    this.data.dep_id =  event.target.value
    this.getEvaluations();
  }

  selectstage( event ) {
    this.data.st_id =  event.target.value
    this.getEvaluations();

  }

}
