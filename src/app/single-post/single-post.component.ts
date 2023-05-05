import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SinglePostComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
