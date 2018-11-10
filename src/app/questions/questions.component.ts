import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../services/questions.service';

import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  public questions = [] ;

  data = { 
    question: ''
  }

  constructor(
    private questionsService:QuestionsService,
    public snackBar:MatSnackBar
  ) { }


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


  // add
  addQuestion() {

    // check if the qusetion feild empty
    if (this.data.question != '') {

      console.log(this.data)
      this.questionsService.add( this.data )
        .subscribe (
          data => {

            // if data geted from php page == seccess
            if (data["success"]) {
              this.snackBar.open("تم اضافة العنصر بنجاح" , "تم" , {
                duration: 2000,
              });

              // get the new items form database ...
              this.getQuestions();
            } 
            
            // if data geted from php page != seccess
            else {
              this.snackBar.open( "حدث خطأ في اضافة البيانات" , "تم" , {
                duration: 3000,
              });
            }
          }
        )
    // else if the user not enter the equstion in the input feild
    } else {
      this.snackBar.open( "قم بكتابة السؤال اولاً" , "تم" , {
        duration: 3000,
      });
    }
  }


  // get data from html page
  selectQuestion( event ) {
    this.data.question =  event.target.value
  }

}
