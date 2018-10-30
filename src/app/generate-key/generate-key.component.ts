import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-key',
  templateUrl: './generate-key.component.html',
  styleUrls: ['./generate-key.component.css']
})
export class GenerateKeyComponent implements OnInit {

  randomKey =[]
  constructor() { 
    
  }

  ngOnInit() {
    
  }



 
  getRandomNumber(nNumber:number) {
  
    this.randomKey=[]
    var i = 0

    while(i<nNumber){
       
      const random = Math.floor(Math.random() * (99999999 - 10000000)) + 10000000;
      if(this.randomKey.indexOf(random)==-1){
        this.randomKey.push(random)
        i++;
      }
     
      
    }
    console.log(this.randomKey)
  }

}
