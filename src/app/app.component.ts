import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'planning-poker';

  background(): void {
    const style = document.getElementById('gradient').style.background;
    if (style.match('white')) {
      document.getElementById('gradient').style.background = '';
    } else {
      document.getElementById('gradient').style.background = 'white';
    }
  }

}
