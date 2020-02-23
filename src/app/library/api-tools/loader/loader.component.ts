import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'apitools-loader',
  templateUrl: './loader.component.html',
  styleUrls: [
    '../generic.keyframes.scss',
    './loader.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnInit {
  @Input()
  Fullsize: boolean;

  constructor() { }

  ngOnInit() {
  }

}
