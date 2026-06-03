import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.html',
  styleUrl: './loading-screen.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingScreen {}
