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
    this.getRandomNumber(20)
  }



 
  getRandomNumber(nNumber:number) {
  
    this.randomKey=[]
    var i = 0

    while(i<nNumber){
    
      const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
      // this.randomKey.push(random)
      console.log(random)
    }
    
  }

}
