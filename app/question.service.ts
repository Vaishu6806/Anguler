import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from './admin.service';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  

  constructor(private httpclient:HttpClient)
  {
  
  }
  getallQuestions(subject:string)
  {
    return this.httpclient.get<Question[]>("http://localhost:8000/examapi/getAllQuestions/"+subject)
  }
  viewQuestion(qno:number,subject:string)
  {
    return this.httpclient.get<Question>("http://localhost:8000/examapi/viewQuestion/"+qno+"/"+subject)
  }
  addQuestion(question:Question)
  {
    return this.httpclient.post<boolean>("http://localhost:8000/examapi/addQuestion/" , question);
  }

  updateQuestion(question: Question) 
  {
    return this.httpclient.put<boolean>("http://localhost:8000/examapi/updateQuestion/" , question);
  }

  deleteQuestion(qno:number,subject:string)
  {
    return this.httpclient.delete<boolean>("http://localhost:8000/examapi/deleteQuestion/"+qno+"/"+subject);
  }

  saveResult(result:Result)
  {
    return this.httpclient.post("http://localhost:8000/examapi/saveResult/",result);
  }

}

export class Question
{
  qno:number;
  qtext:string;
  answer:string;
  op1:string;
  op2:string;
  op3:string;
  op4:string;
  subject:string;
  submittedAnswer: string='';
  

  constructor(qno:number,qtext:string,answer:string,op1:string,op2:string,op3:string,op4:string,subject:string)
  {
    this.qno=qno;
    this.qtext=qtext;
    this.answer=answer;
    this.op1=op1;
    this.op2=op2;
    this.op3=op3;
    this.op4=op4;
    this.subject=subject;
  }
}

export class Answer
{
  qno:number;
  qtext:string;
  submittedAnswer:string;
  correctAnswer:string;

  constructor(qno:number,qtext:string,submittedAnswer:string,correctAnswer:string)
  {
    this.qno=qno;
    this.qtext=qtext;
    this.submittedAnswer=submittedAnswer;
    this.correctAnswer=correctAnswer;
  }

}
