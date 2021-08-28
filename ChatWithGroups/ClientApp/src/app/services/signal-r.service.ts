import { IMessage } from './../models/message';
import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";  // or from "@microsoft/signalr" if you are using a new library

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  public messages!: IMessage[];

  constructor() {
    this.messages = new Array<IMessage>();
  }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://localhost:5001/chatHub')
                            .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addChatListener = () => {
    this.hubConnection.on('receivemessage', (message: IMessage) => {
      this.messages.push(message);
      console.log(message);
    });
  }

  public sendMessage = (message: IMessage) => {
    this.hubConnection.invoke('sendmessage', message)
    .catch(err => console.error(err));
  }
}
