import { Component, OnInit } from '@angular/core';
import { LecturersService } from '../services/lecturers.service';

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

  constructor(public lecturersService: LecturersService) {
    
  }

  ngOnInit() {
    this.getLecturers()
  }


  // get lecturers
  getLecturers() {
    this.lecturersService.get()
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
            this.getLecturers()
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
      window.alert("من فضلك تأكد من انك قد قمت بأختيار القسم و المرحلة و ادخلت اسم الاستاذ بشكل صحيح")
    }
  }

  selectDepartment( event ) {
    this.lecturer.dep_id =  event.target.value
  }

  selectstage( event ) {
    this.lecturer.st_id =  event.target.value
  }

  selectName( event ) {
    this.lecturer.name =  event.target.value
  }
}
