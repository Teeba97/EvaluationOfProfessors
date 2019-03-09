import { Component, OnInit } from '@angular/core';
import { LecturersService } from '../services/lecturers.service';
import { MatSnackBar } from '@angular/material';
import * as XLSX from 'xlsx';

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

  exlecturers = []

  defaultView = "lecturers"
  excelView = false

  constructor(public lecturersService: LecturersService,
              public snackBar:MatSnackBar) {
                
  }

  ngOnInit() {
    
  }

  // set view for ng-switch
  setView( view:string ) {
    if ( view == "addExcelFile") {
      this.excelView = true;
    }
    this.defaultView = view;
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
      this.exlecturers = XLSX.utils.sheet_to_json(ws, { header: 1 })
      console.log(this.exlecturers)
    }

    reader.readAsBinaryString(target.files[0]);
    
  }

  // add the excel file to data base
  addFromExcil() {

    this.exlecturers.forEach ( lec => {
      this.lecturer.name = lec[0]
      this.addLecturers()
    })

    this.defaultView = "lecturers"
    this.excelView = true;
    this.snackBar.open("تم اضافة جميع الاساتذة بنجاح" , "تم" )
  }


  // delete someone form uploaded excel file ...
  deleteOneFromExcel( item: any ) {
    const index: number = this.exlecturers.indexOf(item);
    if (index !== -1) {
        this.exlecturers.splice(index, 1);
    }   
  }


  // get slected department & stage & name data from html page
  selectDepartment( event ) {
    this.lecturer.dep_id =  event.target.value
    if ( this.lecturer.dep_id != 0 && this.lecturer.st_id != 0) {
      this.getLecturers()
    }
    this.setView( 'lecturers' )
    this.excelView = false;
  }

  selectstage( event ) {
    this.lecturer.st_id =  event.target.value
    if ( this.lecturer.dep_id != 0 && this.lecturer.st_id != 0) {
      this.getLecturers()
    }
    this.setView( 'lecturers' )
    this.excelView = false;
  }

  selectName( event ) {
    this.lecturer.name =  event.target.value
  }


}
