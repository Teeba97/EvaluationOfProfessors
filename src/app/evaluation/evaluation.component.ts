import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  public questions = [] ;

  constructor( private questionsService:QuestionsService ) { }

  ngOnInit() {
    this.getQuestions()
  }

  getQuestions() {
    this.questionsService.get()
      .subscribe ( 
        data => {
          this.questions = data;
        }
      )
  }
}
