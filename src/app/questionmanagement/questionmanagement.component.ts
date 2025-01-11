import { Component } from '@angular/core';
import { Question, QuestionService } from '../question.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionmanagement',
  imports: [FormsModule,CommonModule],
  templateUrl: './questionmanagement.component.html',
  styleUrl: './questionmanagement.component.css'
})
export class QuestionmanagementComponent{
  
  question:Question=new Question(0,'','','','','','','');
  message: string='';
  
  constructor(private questionService:QuestionService ,private router:Router)
  {

  }
  addQuestion()
  {
    this.questionService.addQuestion(this.question).subscribe(answer=>this.message="question added");
  }


  viewQuestion()
  {
    this.questionService.viewQuestion(this.question.qno,this.question.subject).subscribe(questionobj=>this.question=questionobj)
  }
  updateQuestion()
  {
    this.questionService.updateQuestion(this.question).subscribe(response=>this.message="record updated")
  }

  deleteQuestion()
  {
    this.questionService.deleteQuestion(this.question.qno,this.question.subject).subscribe(response=>this.message="record deleted")
  }
  
}
