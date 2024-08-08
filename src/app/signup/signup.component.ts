import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { User } from '../userInterface';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  user:User={
    email:"",
    password:"",
  }
  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(): void {
      this.authService.getLoginStatus().subscribe(status=>{
        if(status){
          this.router.navigate(['/account'])
        }
      })
  }
  signUp(){
    this.authService.signUp(this.user);
  }
  navigateToSignin(){
    this.router.navigate(['/account/signin'])
  }
}
