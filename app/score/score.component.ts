import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-score',
  imports: [CommonModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent {
  score:any=0;
  allAnswer:any=[];
  data:any='';

  constructor(private activatedRoute:ActivatedRoute)
  {

  }
  ngOnInit(): void 
  {
    this.activatedRoute.queryParamMap.subscribe(queryParameters=>this.score=queryParameters.get("score"))
    this.activatedRoute.queryParamMap.subscribe(queryparameters=>{this.data=queryparameters.get('allanswers');this.allAnswer=JSON.parse(this.data);})
  }
  compare(submittedAnswer:string,correctAnswer:string)
  {
    if(submittedAnswer==correctAnswer)
      return "green";
    else
    return "red"
  }


}
