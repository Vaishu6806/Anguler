import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './question/question.component';
import { ScoreComponent } from './score/score.component';
import { QuestionmanagementComponent } from './questionmanagement/questionmanagement.component';
import { Component } from '@angular/core';
import { ManageresultComponent } from './manageresult/manageresult.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    {path:'question',component:QuestionComponent},
    {path:'score',component:ScoreComponent},
    {path:'questionmanagement',component:QuestionmanagementComponent},
    {path:'manageresult',component:ManageresultComponent},
    {path:'admindashboard',component:AdmindashboardComponent},
    {path:'',redirectTo:'login',pathMatch:'full'}

];
