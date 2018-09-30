import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  public messages: string[];

  constructor(public messageService: MessageService,
              private router: Router) {
  }

  ngOnInit() {
    this.messageService.getMessages().subscribe(
      (messages) => {
        this.messages = messages;
      }
    );
  }

  close(): void {
    // Close the popup.
    this.router.navigate([{ outlets: { popup: null } }]);
    this.messageService.isDisplayed = false;
  }
}
