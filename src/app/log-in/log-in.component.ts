import { Component } from '@angular/core';
import { ReactiveFormsModule,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})

export class LogInComponent {
   profileForm = new FormGroup({
    userName : new FormControl("",Validators.required),
    password : new FormControl("",Validators.required)
   })
   
   
   constructor(private router: Router) {} 

   login() {
        const userId = uuidv4();
       localStorage.setItem("userId",userId)
       this.router.navigate(['']);
     }
}
