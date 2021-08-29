import { IMessage } from './../models/message';
import { IChat } from './../models/chat';
import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";  // or from "@microsoft/signalr" if you are using a new library
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  public messages!: IMessage[];
  public chatId!: string;

  constructor(public location: Location) {
    this.messages = new Array<IMessage>();
  }

  public startConnection = (): Promise<void> => {
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('https://localhost:5001/chatHub')
                            .build();
    return this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addChatListener = () => {
    this.hubConnection.on('receivemessage', (message: IMessage) => {
      this.messages.push(message);
      console.log(message);
    });
    this.hubConnection.on('createchat', (chat: IChat) => {
      this.location.go(chat.id);
      this.chatId = chat.id;
      console.log(chat);
    });
  }

  public sendMessage(message: IMessage) {
    this.hubConnection.invoke('sendmessage', message)
    .catch(err => console.error(err));
  }

  public createChat(){
    this.hubConnection.invoke('createchat')
    .catch(err => console.error(err));
  }

  public joinChat(id: string){
    this.hubConnection.invoke('joinchat', { id: id } as IChat)
    .catch(err => console.error(err));
  }
}
