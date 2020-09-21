import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notice-dialog',
  templateUrl: './notice-dialog.component.html',
  styleUrls: ['./notice-dialog.component.scss']
})
export class NoticeDialogComponent implements OnInit {

  @Output() modalEvent = new EventEmitter<boolean>();
  @Input() public title: string;
  @Input() public body: string;

  constructor() { }

  ngOnInit(): void {
  }

  closeModalFunction() {
    this.modalEvent.emit();
  }

}
