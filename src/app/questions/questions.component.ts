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

  
  question: ''


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

  
  // delete
  // deleteQuestion(item) {
  //   console.log(item);
  //   this.questionsService.delete(item)
  //     .subscribe ( 
  //       data => {
  //         if (data["success"]) {
  //           this.snackBar.open("تم حذف العنصر بنجاح" , "تم" , {
  //             duration: 2000,
  //           });
  //           this.getQuestions();
  //         } else {
  //           window.alert("An error to delete this item ...")
  //         }
  //       }
  //     )
  // }


  // add
  addQuestion() {
    if (this.question != '') {
      console.log(this.question)
      this.questionsService.add( this.question )
        .subscribe (
          data => {
            if (data["success"]) {
              this.snackBar.open("تم اضافة العنصر بنجاح" , "تم" , {
                duration: 2000,
              });
              this.getQuestions();
            } else {
              this.snackBar.open( "حدث خطأ في اضافة البيانات" , "تم" , {
                duration: 3000,
              });
            }
          }
        )
    } else {
      this.snackBar.open( "قم بكتابة السؤال اولاً" , "تم" , {
        duration: 2000,
      });
    }
  }


  // get data from html page
  selectQuestion( event ) {
    this.question =  event.target.value
  }

}
