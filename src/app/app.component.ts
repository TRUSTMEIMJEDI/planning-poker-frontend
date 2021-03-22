import { Component, OnInit } from '@angular/core';

@Component({
  selector : 'app-root',
  templateUrl : './app.component.html',
  styleUrls : [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  title = 'planning-poker';

  ngOnInit(): void {
    const backgroundStyle = localStorage.getItem('background-style');

    if (backgroundStyle.match('white')) {
      document.getElementById('gradient').style.background = 'white';
    } else {
      document.getElementById('gradient').style.background = '';
    }
  }

  changeBackground(): void {
    const style = document.getElementById('gradient').style.background;
    if (style.match('white')) {
      localStorage.setItem('background-style', 'gradient');
      document.getElementById('gradient').style.background = '';
    } else {
      localStorage.setItem('background-style', 'white');
      document.getElementById('gradient').style.background = 'white';
    }
  }

}
