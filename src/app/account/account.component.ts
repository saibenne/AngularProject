import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserDbService } from '../user-db.service';
import { NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { UserData } from '../userDataInterface';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../userInterface';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterModule,NgIf,FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit{
  signedIn:boolean=false;
  tempUserData:UserData|undefined;
  userData:UserData={} as UserData;
  activeUser:User={} as User;
  constructor(private authService:AuthService,private userDbService:UserDbService,private router:Router){}
  ngOnInit(): void {
    
    this.authService.getLoginStatus().subscribe(status=>{
      this.signedIn=status;
      if(!this.signedIn){
        this.router.navigate(["/account/signin"])
       }
       else{
        this.router.navigate(["/account"])
        
        this.authService.getActiveUser().subscribe(user=>{
          this.tempUserData=this.userDbService.getUserData(user.email);
        if(this.tempUserData){
          this.userData=this.tempUserData;
        }
          this.activeUser.email=user.email;
          this.userData.email=user.email;
        });
        
       }
       
       
       
    })
    
  }

  updateUserData(){
    this.userDbService.updateUserData(this.activeUser.email,this.userData??{} as UserData);
   
  }
  signOut(){
    this.authService.signOut();
  }
}
