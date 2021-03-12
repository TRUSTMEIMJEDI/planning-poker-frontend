import {AfterContentInit, Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {
  title = 'planning-poker';
  //
  // private colors = [[62, 35, 255],
  //   [60, 255, 60],
  //   [255, 35, 98],
  //   [45, 175, 230],
  //   [255, 0, 255],
  //   [255, 128, 0]];
  //
  // private step = 0;
  // private colorIndices = [0, 1, 2, 3];
  // private gradientSpeed = 0.002;
  //
  // color1: string;
  // color2: string;

  ngAfterContentInit(): void {
    // setInterval(() => this.updateGradient(), 10);
  }

  // updateGradient(): void {
  //   const color00 = this.colors[this.colorIndices[0]];
  //   const color01 = this.colors[this.colorIndices[1]];
  //   const color10 = this.colors[this.colorIndices[2]];
  //   const color11 = this.colors[this.colorIndices[3]];
  //
  //   const istep = 1 - this.step;
  //   const r1 = Math.round(istep * color00[0] + this.step * color01[0]);
  //   const g1 = Math.round(istep * color00[1] + this.step * color01[1]);
  //   const b1 = Math.round(istep * color00[2] + this.step * color01[2]);
  //   this.color1 = 'rgb(' + r1 + ',' + g1 + ',' + b1 + ')';
  //
  //   const r2 = Math.round(istep * color10[0] + this.step * color11[0]);
  //   const g2 = Math.round(istep * color10[1] + this.step * color11[1]);
  //   const b2 = Math.round(istep * color10[2] + this.step * color11[2]);
  //   this.color2 = 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')';
  //
  //   //   this.renderer.setStyle(document.getElementById('gradient').children[0], 'background'
  //   //     , '-webkit-gradient(linear, left top, right top, from(' + color1 + '), to(' + color2 + '))');
  //   //   this.renderer.setStyle(document.getElementById('gradient').children[0], 'background'
  //   //     , '-moz-linear-gradient(left, ' + color1 + ' 0%, ' + color2 + ' 100%)');
  //
  //   this.step += this.gradientSpeed;
  //   if (this.step >= 1) {
  //     this.step %= 1;
  //     this.colorIndices[0] = this.colorIndices[1];
  //     this.colorIndices[2] = this.colorIndices[3];
  //
  //     // pick two new target color indices
  //     // do not pick the same as the current one
  //     this.colorIndices[1] = (this.colorIndices[1] + Math.floor(1 + Math.random() * (this.colors.length - 1))) % this.colors.length;
  //     this.colorIndices[3] = (this.colorIndices[3] + Math.floor(1 + Math.random() * (this.color1.length - 1))) % this.colors.length;
  //   }
  // }

}
