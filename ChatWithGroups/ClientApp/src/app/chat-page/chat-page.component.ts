import { IMessage } from './../models/message';
import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../services/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.sass']
})
export class ChatPageComponent implements OnInit {
  public form!: FormGroup;

  constructor(public signalRService: SignalRService, private http: HttpClient, private fb: FormBuilder, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.form = this.fb.group({
      message: this.fb.control('')
    });
    this.signalRService.startConnection().then(() => {
      this.signalRService.addChatListener();
      this.signalRService.chatId = this.activatedRoute.snapshot.url[0]?.path;
      debugger;
      if (this.signalRService.chatId) {
        //todo reset list
        this.signalRService.joinChat(this.signalRService.chatId);
      }
    });
  }

  public onSend(){
    const message = this.form.get('message')?.value;
    this.form.reset();
    this.signalRService.sendMessage({user: "1", content: message, chatId: this.signalRService.chatId} as IMessage);
  }

  public createChat(){
    //todo reset list
    this.signalRService.createChat();
  }
}
