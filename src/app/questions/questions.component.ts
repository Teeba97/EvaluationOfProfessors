import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../services/questions.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';

import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  public questions = [] 
  public exQuestions = []
  
  q = { 
    id: null,
    question: ''
  }

  newQuestion = {
    id: 0,
    question: ''
  }

  addFormExcelViwe = false

  constructor(
    private questionsService:QuestionsService,
    public snackBar:MatSnackBar,
    public modalService:NgbModal
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
    if (this.q.question.trim() != '') {
      
      this.questionsService.add( this.q )
        .subscribe ( data => {
            if ( data["success"] ) {
              this.getQuestions();
              window.alert(" تم اضافة السؤال بنجاح ")
            } else {
              window.alert("حدث خطأ ما")
            }
          }
        )
    } else {
      this.snackBar.open( "قم بكتابة السؤال اولاً" , "تم" , {
        duration: 3000,
      });
    }
  }

  // delete
  deleteQuestion(item) {
    this.questionsService.delete(item)
      .subscribe ( data => {
        if ( data["success"] ) {
          window.alert("تم حذف السؤال بنجاح")
          this.getQuestions();
        } else {
          window.alert("حدث خطأ ما")
        }
    })
  }

  // edit
  editQuestion() {
    this.questionsService.edit(this.newQuestion)
    .subscribe( data => {
      if (data["success"]) {
        window.alert("تم تعديل الاسم بنجاح")
        this.getQuestions();
      } else {
        window.alert("حدث خطأ ما، تأكد من اتصال الانترنت لديك")
      }
    })
  }


  // upload exile file from computer ....
  UpluadExcilFile(event: any) {

    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      alert('Cannot use multiple files');
    }

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
     
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.exQuestions = XLSX.utils.sheet_to_json(ws, { header: 1 })
      console.log(this.exQuestions)
    }

    reader.readAsBinaryString(target.files[0]);
    
  }

  // add excel file to database
  addFromExcil() {

    var check = 1
    this.exQuestions.forEach ( question => {
      
      this.q.question = question[0]
      
      this.questionsService.add(this.q)
        .subscribe( data => {
          if (!data["success"]) {
            window.alert("هناك خطأ، في اضافة بعض البيانات")
            return false
          }
        })
    })

    if ( check == 1) {
      window.alert("تم ، اضافة  الجميع بنجاح")
    }

    this.addFormExcelViwe = false
    
    setTimeout(() => {
      this.getQuestions();
    }, 100);
    
  }


  // delete one from excel
  deleteOneFromExcel( item: any ) {
    const index: number = this.exQuestions.indexOf(item);
    if (index !== -1) {
        this.exQuestions.splice(index, 1);
    }   
  }

  //set view
  setView( view ) {
    if ( view == 'AddFromExcel' ) {
      this.addFormExcelViwe = true
    } else {
      this.addFormExcelViwe = false
    }
      
  }

  // get data from html page
  selectQuestion( event ) {
    this.q.question =  event.target.value
  }
  
  chengeQuestion(event) {
    this.newQuestion.question = event.target.value
  }

  openBackDropCustomClass(content) {
    this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
  }

  openWindowCustomClass(content) {
    this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  openSm(content) {
    this.modalService.open(content, { size: 'sm' });
  }

  openLg(content, id, question) {
    this.newQuestion.id = id
    this.newQuestion.question = question
    this.modalService.open(content, { size: 'lg' });
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }


}
