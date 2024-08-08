import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { User } from '../userInterface';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit{
   user:User={
    email:"",
    password:""
  }
  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.authService.getLoginStatus().subscribe(status=>{
      if(status){
        this.router.navigate(['/account'])
      }
    })
}
  signIn(){
    this.authService.signIn(this.user);
  }
  navigateToSignup(){
    this.router.navigate(['/account/signup'])
  }
}
