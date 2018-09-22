import { Injectable } from '@angular/core';

import { IUser } from './user';
import { MessageService } from '../messages/message.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private _authMannager: BehaviorSubject<AuthState> = new BehaviorSubject<AuthState>(AuthState.LoggedOut);
  private _authState: AuthState;
  public authChange: Observable<AuthState>;
  public currentUser: IUser;

  constructor(private messageService: MessageService) {
    this.authChange = this._authMannager.asObservable();
  }

  public login(userName: string, password: string): void {
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
      this._setAuthState(AuthState.LoggedIn);
    }
    this.currentUser = {
      id: 2,
      userName: userName,
      isAdmin: false
    };
    // this.messageService.addMessage(`User: ${this.currentUser.userName} logged in`);
    this._setAuthState(AuthState.LoggedIn);
  }

  public logout(): void {
    this._setAuthState(AuthState.LoggedOut);
  }

  public emitAuthState(): void {
    this._authMannager.next(this._authState);
  }

  private _setAuthState(newAutState: AuthState): void {
    this._authState = newAutState;
    this.emitAuthState();
  }
}

export const enum AuthState {
  LoggedIn,
  LoggedOut
}
