import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRoomComponent } from './pages/create-room/create-room.component';
import { JoinRoomComponent } from './pages/join-room/join-room.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RoomPageComponent } from './pages/room-page/room-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

const routes: Routes = [
  { path : 'home', component : HomePageComponent },
  { path : '', redirectTo : '/home', pathMatch : 'full' },
  { path : 'create-room', component : CreateRoomComponent },
  { path : 'room', component : RoomPageComponent },
  { path : 'join-room', component : JoinRoomComponent },
  { path : 'admin', component : AdminPageComponent },
  { path : '**', redirectTo : '' }
];

@NgModule({
  imports : [ RouterModule.forRoot(routes) ],
  exports : [ RouterModule ]
})
export class AppRoutingModule {
}
