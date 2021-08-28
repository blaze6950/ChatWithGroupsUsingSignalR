import { IMessage } from './../models/message';
import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.sass']
})
export class ChatPageComponent implements OnInit {
  public form!: FormGroup;

  constructor(public signalRService: SignalRService, private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      message: this.fb.control('')
    });
    this.signalRService.startConnection();
    this.signalRService.addChatListener();
  }

  public onSend(){
    const message = this.form.get('message')?.value;
    this.form.reset();
    this.signalRService.sendMessage({user: "1", content: message} as IMessage);
  }
}
