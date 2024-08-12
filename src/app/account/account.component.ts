import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserDbService } from '../user-db.service';
import { NgIf } from '@angular/common';
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
        let userEmail:string=user.email;
          this.activeUser.email=userEmail.substring(0,userEmail.indexOf('@'));
          this.userData.email=userEmail;
        });
        
       }
       
       
       
    })
    
  }
 

  updateUserData(){
    let status:boolean=this.userDbService.updateUserData(this.activeUser.email,this.userData??{} as UserData);
    alert(status?"user details updated successfully...":"user details not updated..")
  }
  signOut(){
    this.authService.signOut();
  }
}
