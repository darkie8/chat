import { Component,Input, EventEmitter, Output, OnInit, SimpleChanges,ɵNgOnChangesFeature } from '@angular/core';

@Component({
  selector: 'first-char',
  templateUrl: './first-char.component.html',
  styleUrls: ['./first-char.component.css']
})
export class FirstCharComponent implements OnInit {
  @Input() name: string;
  @Input() userBg: string;
  @Input() userColor: string;

  public firstChar: string;
  private _name:string='';
  @Output() notify: EventEmitter<String> =
  new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  this._name =this.name;
  this.firstChar=this._name[0];
  }
  public userNameClick(): void {
    this.notify.emit(this.name);
  }
ngOnChanges(changes: SimpleChanges):void{
let name = changes.name;
this._name= name.currentValue;
this.firstChar= this._name[0];
}
}
