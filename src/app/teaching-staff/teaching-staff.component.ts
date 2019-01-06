import { Component, OnInit } from '@angular/core';
import { LecturersService } from '../services/lecturers.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-teaching-staff',
  templateUrl: './teaching-staff.component.html',
  styleUrls: ['./teaching-staff.component.css']
})
export class TeachingStaffComponent implements OnInit {

  public lecturers = [] ;

  lecturer = {
    name: '',
    dep_id: 0,
    st_id: 0
  }

  constructor(public lecturersService: LecturersService,
              public snackBar:MatSnackBar) {
    
  }

  ngOnInit() {
    
  }


  // get lecturers
  getLecturers() {
    this.lecturersService.get( this.lecturer )
      .subscribe ( 
        data => {
          this.lecturers = data;
        }
      )
  }


  // delete
  deleteLecturer(item) {
    console.log(item);
    this.lecturersService.delete(item)
      .subscribe ( 
        data => {
          if (data["success"]) {
            this.snackBar.open("تم حذف العنصر بنجاح" , "تم" , {
              duration: 2000,
            });
            this.getLecturers();
          } else {
            window.alert("An error to delete this item ...")
          }
        }
      )
  }


  // add
  addLecturers() {
    if (this.lecturer.name != '' && this.lecturer.dep_id != 0 && this.lecturer.st_id != 0) {
      console.log(this.lecturer)
      this.lecturersService.add( this.lecturer )
        .subscribe (
          data => {
            if (data["success"]) {
              this.getLecturers()
            } else {
              window.alert("An error to delete this item ...")
            }
          }
        )

    } else {
        this.snackBar.open( "من فضلك تأكد من انك قد قمت بأختيار القسم و المرحلة و ادخلت اسم الاستاذ" , "تم" , {
          duration: 2000,
        });
    }
  }


  // get slected department & stage & name data from html page
  selectDepartment( event ) {
    this.lecturer.dep_id =  event.target.value
    if ( this.lecturer.dep_id != 0 && this.lecturer.st_id != 0) {
      this.getLecturers()
    }
  }

  selectstage( event ) {
    this.lecturer.st_id =  event.target.value
    if ( this.lecturer.dep_id != 0 && this.lecturer.st_id != 0) {
      this.getLecturers()
    }
  }

  selectName( event ) {
    this.lecturer.name =  event.target.value
  }


}
