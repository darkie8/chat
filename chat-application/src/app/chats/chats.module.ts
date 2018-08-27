import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import{RouterModule,Routes} from '@angular/router';
import{FormsModule, ReactiveFormsModule} from '@angular/forms';
import{ToastModule} from 'ng6-toastr';
import{BrowserAnimationsModule} from  '@angular/platform-browser/animations';


@NgModule({
  imports: [
    CommonModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forChild([
      {path:'chat', component: ChatBoxComponent}])
  ],
  declarations: [ChatBoxComponent]
})
export class ChatsModule { }
