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

    if ('white'.match(backgroundStyle)) {
      document.getElementById('background-poker').style.background = 'white';
    } else {
      document.getElementById('background-poker').style.background = '';
    }
  }

  changeBackground(): void {
    const style = document.getElementById('background-poker').style.background;
    if (style.match('white')) {
      localStorage.setItem('background-style', 'gradient');
      document.getElementById('background-poker').style.background = '';
    } else {
      localStorage.setItem('background-style', 'white');
      document.getElementById('background-poker').style.background = 'white';
    }
  }

}
