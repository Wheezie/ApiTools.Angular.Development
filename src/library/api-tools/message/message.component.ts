import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'apitools-message',
  templateUrl: './message.component.html',
  styleUrls: [
    '../generic.keyframes.scss',
    './message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent implements OnInit {
  @Input()
  message: string;

  @Input()
  type: MessageType = MessageType.Information;

  constructor() { }

  ngOnInit() {
  }

  GetTypeClass() {
    switch (this.type) {
      default:
      case MessageType.Information:
        return 'info';
      case MessageType.Warning:
        return 'warning';
      case MessageType.Error:
        return 'error';
        case MessageType.Success:
          return 'success';
    }
  }

}

export enum MessageType {
  Error,
  Warning,
  Information,
  Success
}
