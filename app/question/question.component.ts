import { Component, OnInit } from '@angular/core';
import { Answer, Question, QuestionService } from '../question.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Result } from '../admin.service';

@Component({
  selector: 'app-question',
  imports: [FormsModule,CommonModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit
{
  index:number=0;
  subject:any='';
  questions:Question[]=[]
  question:Question=new Question(0,'','','','','','','');
  submittedAnswer:string='';
  allAnswers:any[]=[];
  username:any='';
  
  selected:boolean=false;

  duration:any=181;//181seconds
  durationMessage='';
  durationInterval:any='';

  constructor(private questionservice:QuestionService,private router:Router)
  {
      this.subject=sessionStorage.getItem('subject');

      console.log("subject is"+this.subject);

      this.username=sessionStorage.getItem('username');

      this.durationInterval=setInterval(()=>
      {
        this.duration=this.duration-1;//178

        var minutes=Math.floor(this.duration/60);//2
        var seconds=this.duration%60;//58

        this.durationMessage=minutes+ ":"+ seconds;//2:58

        if(this.duration==0)
          this.endexam();

      },1000);//after 1sec setInterval will execute given arrow fun
  }


  ngOnInit(): void 
  {
    // [ [] question array   subscribe() ]  observable object

    this.questionservice.getallQuestions(this.subject).subscribe(array=>{ this.questions=array ; this.question=this.questions[0]; });
  }

  getColor(option:string)
  {
    //console.log(this.allAnswer.length);

    for(var i=0;i<this.allAnswers.length;i++)
    {
      let answer=this.allAnswers[i];

      // console.log(answer.submittedAnswer+" "+option);

      if(answer.qno==this.question.qno && answer.submittedAnswer.trim()==option.trim())
      {
        return "green";
      }
        
    }
    return "red";
  }

  isChecked(option:string)
  {
    //console.log (this.allAnswers.length);

    for(var i=0;i<this.allAnswers.length;i++)
    {
      let answer=this.allAnswers[i];

      console.log(answer.submittedAnswer+ " "+option);

      if(answer.qno=this.question.qno && answer.submittedAnswer.trim()==option.trim())
      {
        return true;
      }
    }
    return false;
  }

  nextQuestion()
  {
  
    if(this.index<this.questions.length-1)
    {
         this.index=this.index+1;
         this.question=this.questions[this.index];
    }
    else
    {
        this.question=this.questions[this.questions.length-1];
    }

  }

  previousQuestion()
  {
    
      if(this.index>0)
      {
        this.index=this.index-1;

        this.question=this.questions[this.index];
      }
      else
      {
        this.question=this.questions[0];
      }

  }

  saveAnswer()
  {
    let answer=new Answer(this.question.qno,this.question.qtext,this.submittedAnswer,this.question.answer)

    console.log(answer)

    let indexofelement=this.allAnswers.findIndex(answer2=>answer2.qno==answer.qno);

    if(indexofelement==-1)
    {
        this.allAnswers.push(answer);
    }
    else
    {
      this.allAnswers[indexofelement].submittedAnswer=answer.submittedAnswer
    }

    console.log(JSON.stringify(this.allAnswers))

  }


  endexam()
  {

    clearInterval(this.durationInterval);

    let score=0;

    console.log(this.allAnswers)

    for (var i=0;i<this.allAnswers.length;i++) 
    {
      var answer=this.allAnswers[i];

      console.log(answer.submittedAnswer + " " + answer.correctAnswer);
      if(answer.submittedAnswer==answer.correctAnswer)
        {
            score=score+1;
        }
  
    }
    
     this.router.navigate(['score'],{queryParams:{'score':score,'allanswers':JSON.stringify(this.allAnswers)}});
    //var result=new Result(this.username,this.subject,score);
  }



}