import { Component, OnInit, ViewContainerRef } from '@angular/core';
import{AppService} from './../../app.service';
import {Router} from '@angular/router';
import { ToastsManager } from '../../../../node_modules/ng6-toastr';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  public firstName: any;
  public lastName: any;
  public mobile: any;
  public email: any;
  public password: any;
  public apiKey: any;
  constructor(public appService:AppService,
  public router:Router,
public toastr:ToastsManager,
vcr:ViewContainerRef
) {   this.toastr.setRootViewContainerRef(vcr);}

  ngOnInit() {
  }
  public goToSignIn: any =()=>
  {
    this.router.navigate(['/']);
  }
  public signupFunction:any=()=>
  {
if(!this.firstName){
  this.toastr.warning('Enter first name');
}
else if(!this.lastName){
  this.toastr.warning('Enter last name');
}
else if(!this.mobile){
  this.toastr.warning('Enter mobile');
}
else if(!this.email){
  this.toastr.warning('Enter email');
}
else if(!this.password){
  this.toastr.warning('Enter password');
}
else if(!this.apiKey){
  this.toastr.warning('Enter apiKey');
}
else{
  let data ={
    firstName:this.firstName,
    lastName:this.lastName,
    mobile:this.mobile,
    email:this.email,
    password:this.password,
    apiKey:this.apiKey
  }
  console.log(data);
  this.appService.signupFunction(data).subscribe((apiResponse)=>
{
  if (apiResponse.status===200){
    this.toastr.success('Signup successful')
    setTimeout(() => {

      this.goToSignIn();

    }, 2000);

  }
  else {

    this.toastr.error(apiResponse.message);

  }

}, (err) => {

  this.toastr.error('some error occured');


});
}
  }

}
