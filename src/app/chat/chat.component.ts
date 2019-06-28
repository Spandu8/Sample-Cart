import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { AuthenticationService } from '../authentication.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges {
  send = false;
  receive = false;
  user:any;
  @Input() showChat: boolean;
  @Input() receiverId: any;
  @Input() senderId: any;
  messageInfo = {
    text: '',
    from: '',
    senderId: '',
    receiverId: '',
    userName: ''
  };
  messageList: Array<any>;
  chat = {
    message: ''
  };
  socket: SocketIOClient.Socket;


  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private authService:AuthenticationService) {
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/images/send.svg'));
    this.socket = io('http://192.168.1.248:3000');

    console.log(this.socket,'socket');
  }

  ngOnInit() {
    this.messageList = new Array();
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.initializeSocket();
    this.socket.on('ReceivedMessageDetails', (data) => {
      console.log(data,'received message');
      this.messageInfo = {
        text: data.message,
        from: 'receiver',
        senderId: data.senderId,
        receiverId: data.receiverId,
        userName: data.userName
      }
      this.authService.sendNotifications(data);
        this.messageList.push(this.messageInfo);
    });

    console.log(this.showChat, 'showChat');
    
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes.senderId.currentValue,'kkkk');
    //  this.receiverId = changes.receiverId.currentValue;
    //   this.senderId = changes.senderId.currentValue; 
    //   let array = this.messageList.filter(function(el) {
    //     return el.senderId === this.senderId 
    //   });
    //   console.log(array,'array');
    //   this.messageList = [];
    //   this.messageList.push(array);
    // console.log(this.messageList,'this.messageListthis.messageList');
  
    console.log(changes,'changeschanges')

  }

  initializeSocket() {
    console.log(this.socket,'user');
    
    this.socket.on('connect', () => {
      console.log('socket connected')
      this.socket.emit('userDetails', {
        userId: this.user._id
      });
    });
     
    this.socket.on('test', (data) => {
          console.log(data,'socket data');
          
    })
  }

  sendMessage(chat) {
    this.send = true;
    this.messageInfo = {
      text: chat.message,
      from: 'sender',
      senderId: this.user._id,
      receiverId: this.user.isAdmin ? this.senderId : null,
      userName: this.user.userName,    
    }
    this.socket.emit('sentMessageDetails', {
      senderId: this.user._id,
      userName: this.user.userName,     
      message: chat.message,
      receiverId: this.user.isAdmin ? this.senderId : null,
      isAdmin: this.user.isAdmin
    });
    this.messageList.push(this.messageInfo);
    this.chat.message = '';

  }


}