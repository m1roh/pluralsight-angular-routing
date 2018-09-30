import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public messages: string[] = [];
  public isDisplayed = false;

  addMessage(message: string): void {
    let currentDate = new Date();
    this.messages.unshift(message + ' at ' + currentDate.toLocaleString());
  }

  getMessages(): Observable<string[]> {
    return of(this.messages);
  }
}
