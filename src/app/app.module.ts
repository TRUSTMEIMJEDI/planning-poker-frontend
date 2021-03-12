import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {CreateRoomComponent} from './pages/create-room/create-room.component';
import {JoinRoomComponent} from './pages/join-room/join-room.component';
import {AppRoutingModule} from './app-routing.module';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {RoomPageComponent} from './pages/room-page/room-page.component';
import {HttpClientModule} from '@angular/common/http';
import {CardComponent} from './components/card/card.component';
import {UserCardComponent} from './components/user-card/user-card.component';
import {CardPickerComponent} from './components/card-picker/card-picker.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {CardShowerComponent} from './components/card-shower/card-shower.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CreateRoomComponent,
    JoinRoomComponent,
    HomePageComponent,
    RoomPageComponent,
    CardComponent,
    UserCardComponent,
    CardPickerComponent,
    CardShowerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    AppRoutingModule,
    MatInputModule,
    HttpClientModule,
    MatGridListModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
