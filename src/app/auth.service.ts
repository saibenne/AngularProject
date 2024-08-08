import { Injectable } from '@angular/core';
import { User } from './userInterface';
import { UserDbService } from './user-db.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private userDbService: UserDbService) { }

  private loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private observableLoginStatus = this.loginStatus.asObservable();
  private activeUser:BehaviorSubject<User> =new BehaviorSubject<User>({} as User);
  private observableActiveUser=this.activeUser.asObservable();
  getLoginStatus(): Observable<boolean> {
    return this.observableLoginStatus;
  }
  signIn(user: User) {
    if (this.userDbService.validateUser(user)) {
      this.loginStatus.next(true);
      this.activeUser.next(user);
    }
    
  }
  signUp(user: User) {
    if (this.userDbService.addUser(user)) {
      this.loginStatus.next(true);
      this.activeUser.next(user);
    }
  }
  getActiveUser(): Observable<User> {
    return this.observableActiveUser;
  }
  signOut() {
    this.loginStatus.next(false);
    this.activeUser.next({} as User);
  }
}
