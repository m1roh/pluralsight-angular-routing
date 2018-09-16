import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../user/user';
import { MessageService } from '../messages/message.service';

@Injectable()
export class AuthService {
  private authManager_: BehaviorSubject<AuthState> = new BehaviorSubject(AuthState.LoggedOut);
  private userManager_: BehaviorSubject<IUser> = new BehaviorSubject(null);
  private authState_: AuthState;
  private userState_: IUser;
  public authChange: Observable<AuthState>;
  public userChange: Observable<IUser>;
  public currentUser: IUser;

  constructor(private messageService: MessageService) {
    this.authChange = this.authManager_.asObservable();
    this.userChange = this.userManager_.asObservable();
  }

  login(userName, password):void {
    if (!userName || !password) {
      this.messageService.addMessage('Please enter your userName and password');
      return;
    }
    if (userName === 'admin') {
      this.currentUser = {
        id: 1,
        userName: userName,
        isAdmin: true
      };
      // this.messageService.addMessage('Admin login');
      this.setAuthState_(AuthState.LoggedIn, this.currentUser);
    }
    this.currentUser = {
      id: 2,
      userName: userName,
      isAdmin: false
    };
    // this.messageService.addMessage(`User: ${this.currentUser.userName} logged in`);
    this.setAuthState_(AuthState.LoggedIn, this.currentUser);
  }

  logout():void {
    this.setAuthState_(AuthState.LoggedOut, null);
  }

  emitAuthState():void {
    this.authManager_.next(this.authState_);
    this.userManager_.next(this.userState_);
  }

  private setAuthState_(newAuthState:AuthState, newUserState:IUser):void {
    this.authState_ = newAuthState;
    this.userState_ = newUserState;
    this.emitAuthState();
  }
}

export const enum AuthState {
  LoggedIn,
  LoggedOut
}
