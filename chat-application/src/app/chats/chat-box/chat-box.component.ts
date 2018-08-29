import { Component, OnInit, ViewContainerRef, ViewChild, ElementRef } from '@angular/core';
import { SocketService } from './../../socket.service';
import{AppService} from './../../app.service';
import {Router} from '@angular/router';
import{Cookie} from 'ng2-cookies/ng2-cookies';
import { ToastsManager } from '../../../../node_modules/ng6-toastr';
@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers:[SocketService]
})
export class ChatBoxComponent implements OnInit {

  @ViewChild('scrollMe', { read: ElementRef }) 
  
  public scrollMe: ElementRef;

  public authToken: any;
  public userInfo: any;
  public receiverId: any;
  public receiverName: any;
  public userList: any = [];
  public disconnectedSocket: boolean;
  public messageText: any; 
  public messageList:any=[];
  public scrollToChatTop:boolean;
  public pageValue: number = 0;
  public loadingPreviousChat: boolean = false;


  constructor(
    public AppService: AppService,
    public SocketService: SocketService,
    public router: Router,
    private toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {

    this.receiverId = Cookie.get('receiverId');

    this.receiverName = Cookie.get('receiverName');
    
    this.toastr.setRootViewContainerRef(vcr);


  }



  ngOnInit() {

    this.authToken = Cookie.get('authtoken');

    this.userInfo = this.AppService.getUserInfoFromLocalStorage();
    if(this.receiverId!=null && this.receiverId!=undefined && this.receiverId!=''){
      this.userSelectedToChat(this.receiverId,this.receiverName)
    }


    this.checkStatus();

    this.verifyUserConfirmation();

    this.getOnlineUserList();
    this.getMessageFromAUser();



  }

  public checkStatus: any = () => {

    if (Cookie.get('authtoken') === undefined || Cookie.get('authtoken') === '' || Cookie.get('authtoken') === null) {

      this.router.navigate(['/']);

      return false;

    } else {

      return true;

    }

  } // end checkStatus



  public verifyUserConfirmation: any = () => {

    this.SocketService.verifyUser()
      .subscribe((data) => {

        this.disconnectedSocket = false;

        this.SocketService.setUser(this.authToken);
        this.getOnlineUserList()

      });
    }
  
  public getOnlineUserList :any =()=>{

    this.SocketService.onlineUserList()
      .subscribe((userList) => {

        this.userList = [];

        for (let x in userList) {

          let temp = { 'userId': x, 'name': userList[x], 'unread': 0, 'chatting': false };

          this.userList.push(temp);          

        }
        
        console.log(this.userList);

      }); // end online-user-list
  }
  public sendMessageUsingKeyPress: any=(event:any)=>
  {
if(event.keyCode===13)//enter
{
  this.sendMessage();
}
  }
  public sendMessage:any =()=>
  {
if(this.messageText)
{
let chatMsgObject=
{
  senderName : this.userInfo.firstName+" "+this.userInfo.lastName,
  senderId : this.userInfo.userId,
  receiverName:Cookie.get('recieverName'),
  receiverId:Cookie.get('recieverId'),
  message:this.messageText,
  createdOn:new Date()
}
console.log(chatMsgObject);
this.SocketService.sendChatMessage(chatMsgObject)
this.pushToChatWindow(chatMsgObject)
}
else{
  this.toastr.warning('Cannot be empty')
}
  }
  public pushToChatWindow:any=(data)=>
  {
this.messageText="";
this.messageList.push(data);
this.scrollToChatTop = false;
  }
  public getMessageFromAUser : any=()=>
  {
this.SocketService.chatByUserId(this.userInfo.userId)
.subscribe((data)=>
{
  (this.receiverId==data.senderId)?this.messageList.push(data):'';
  this.toastr.success(`${data.senderName} says :${data.message}`)
  this.scrollToChatTop=false;
})
  }
  public userSelectedToChat : any
  =(id,name)=>
  {
    this.userList.map((user)=>
  {
    if(user.userId==id)
    {
      user.chatting = true;
    }
    else{
      user.chatting = false;
    }
  })
  Cookie.set('recieverId',id);
  Cookie.set('recieverName',name);
  this.receiverName=name;
   this.receiverId=id;
   this.messageList=[];
   this.pageValue=0;
   let chatDetails = {
     userId : this.userInfo.userId,
     senderId : id
   }
  this.SocketService.markChatAsSeen(chatDetails);
  this.getPreviousChat();

  }
  public getPreviousChat=()=>
  {
    let previousData =(this.messageList.length>0?this.messageList.slice():[]);
    this.SocketService.getChat(this.userInfo.userId,this.receiverId,this.pageValue*10)
    .subscribe((apiResponse)=>
  {
    if(apiResponse.status===200)
    {
      this.messageList = apiResponse.data.concat(previousData);
    }
    else{
      this.messageList = previousData;
      this.toastr.warning('No Messages available')
    }
    this.loadingPreviousChat = false;

  }, (err) => {

    this.toastr.error('some error occured')
  })
  }
  public loadEarlierPageOfChat=()=>
  {
    this.loadingPreviousChat=true;
    this.pageValue++;
    this.scrollToChatTop=true;
    this.getPreviousChat();
  }
 
  public logout: any = () => {

    this.AppService.logout()
      .subscribe((apiResponse) => {

        if (apiResponse.status === 200) {
          console.log("logout called")
          Cookie.delete('authtoken');

          Cookie.delete('receiverId');

          Cookie.delete('receiverName');

          this.SocketService.exitSocket()

          this.router.navigate(['/']);

        } else {
          this.toastr.error(apiResponse.message)

        } // end condition

      }, (err) => {
        this.toastr.error('some error occured')


      });

  } 
  


  public showUsername(name: string) {
    this.toastr.success(`you are chatting with ${name}`);
  }







  }
