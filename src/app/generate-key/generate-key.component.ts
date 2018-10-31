import { Component, OnInit } from '@angular/core';
import { KeysService } from '../services/keys.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-generate-key',
  templateUrl: './generate-key.component.html',
  styleUrls: ['./generate-key.component.css']
})
export class GenerateKeyComponent implements OnInit {

  // var
  keys = []
  randomKey = []  // to add
  data  = {      // info 
    dep_id : 0,
    st_id : 0, 
    password : 0 
  }
  check: any    // checking var
  numberOfKeys = 0 // number of keys to gnerating

  constructor(private keysService:KeysService,
              private snackBar:MatSnackBar) { 
  }

  ngOnInit() {
    
  }


  // get keys foem database based on dep and st id's
  getKeys () {
    this.keysService.get( this.data )
      .subscribe (
        data => {
          this.keys = data;
        }          
      )
  }
  
 
  // generate random numbers
  getRandomNumber( nNumber:number ) {
  
    this.randomKey = []
    var i = 0

    while( i < nNumber ) {

      const random = Math.floor(Math.random() * (99999999 - 10000000)) + 10000000;

      if(this.randomKey.indexOf(random)==-1){

        this.randomKey.push(random)
        this.data.password = random

        if ( this.data.dep_id != 0 && this.data.st_id != 0 && this.numberOfKeys != 0 ) {
          this.keysService.add(this.data)
            .subscribe( data => {
              this.check = data
              // get Keys form data base after add to database
              this.getKeys();
            })
        } else  {
          this.snackBar.open("قم بتحديد المرحلة والقسم وعدد الرموز" , "تم" , {
            duration: 3000,
          });
        }

        i++;
        console.log(this.check);
      }
    }

    console.log(this.randomKey)

    if ( this.check["success"] ) {
      this.snackBar.open(" تم توليد الرموز بنجاح ", "تم" , {duration: 5000})
    } else {
      this.snackBar.open(" هناك خطأ في توليد الرموز ", "تم" , {duration: 5000})
    }

  }


  // get slected department & stage & nNumber data from html page
  selectDepartment( event ) {
    this.data.dep_id =  event.target.value
    if ( this.data.st_id != 0 ) {
      this.getKeys();
    }
  }

  selectstage( event ) {
    this.data.st_id =  event.target.value
    if ( this.data.dep_id != 0 ) {
      this.getKeys();
    }
  }

  selectNumber( event ) {
    this.numberOfKeys = event.target.value
  }

}
