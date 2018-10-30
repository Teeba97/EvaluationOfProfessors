import { Component, OnInit } from '@angular/core';
import { KeysService } from '../services/keys.service';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-generate-key',
  templateUrl: './generate-key.component.html',
  styleUrls: ['./generate-key.component.css']
})
export class GenerateKeyComponent implements OnInit {

  // var
  randomKey =[]

  data  = {
    dep_id : 0,
    st_id : 0, 
    password : 0 
  }

  constructor(private keysService:KeysService,
              public snackBar:MatSnackBar) { 
    
  }

  ngOnInit() {
    
  }
 
  // generate random numbers
  getRandomNumber(nNumber:number) {
  
    this.randomKey=[]
    var i = 0
    var check = 0 ;
    while(i<nNumber){
      const random = Math.floor(Math.random() * (99999999 - 10000000)) + 10000000;
      if(this.randomKey.indexOf(random)==-1){
        this.randomKey.push(random)
        this.data.password = random

        if ( this.data.dep_id != 0 && this.data.st_id != 0 ){
          this.keysService.add(this.data)
            .subscribe( data => {
              if ( data["success"] ) {
                check = 1
              } else { 
                check = 2
              }
            })
        } else  {
          this.snackBar.open("قم بتحديد القسم والمرحلة ", "تم" , {duration: 2000})
        }
        
        i++;
      }

      if ( check  == 1)
        this.snackBar.open(" تم توليد الرموز بنجاح ", "تم", {duration: 2000})
      else if ( check == 2) 
        this.snackBar.open(" هناك خطأ في اضافة البيانات ", "تم", {duration: 2000})
      
    }
    console.log(this.randomKey)
  }

    // get slected department & stage & name data from html page
    selectDepartment( event ) {
      this.data.dep_id =  event.target.value
    }
  
    selectstage( event ) {
      this.data.st_id =  event.target.value
    }

}
