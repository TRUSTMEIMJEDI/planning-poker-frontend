import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { CreateRoomComponent } from './pages/create-room/create-room.component';
import { JoinRoomComponent } from './pages/join-room/join-room.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RoomPageComponent } from './pages/room-page/room-page.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CardComponent } from './components/card/card.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { CardPickerComponent } from './components/card-picker/card-picker.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { CardShowerComponent } from './components/card-shower/card-shower.component';
import { FormsModule } from '@angular/forms';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { myRxStompConfig } from './rx-stomp.config';
import { VoteShowerComponent } from './components/vote-shower/vote-shower.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MoscowResultShowerComponent } from './components/moscow-result-shower/moscow-result-shower.component';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// tslint:disable-next-line:typedef
export function initApp(http: HttpClient, translate: TranslateService) {
  return () => new Promise<boolean>((resolve: (res: boolean) => void) => {

    const defaultLocale = 'pl';
    const translationsUrl = '/assets/i18n';
    const suffix = '.json';
    const storageLocale = localStorage.getItem('locale');
    const locale = storageLocale || defaultLocale;

    http.get(`${translationsUrl}/${locale}${suffix}`).pipe(
      catchError(() => of(null))
    ).subscribe((translatedKeys: any) => {
      translate.setTranslation(defaultLocale, translatedKeys || {});
      translate.setTranslation(locale, translatedKeys || {}, true);

      translate.setDefaultLang(defaultLocale);
      translate.use(locale);

      resolve(true);
    });

    // forkJoin([
    //   http.get(`/assets/i18n/dev.json`).pipe(
    //     catchError(() => of(null))
    //   ),
    //   http.get(`${translationsUrl}/${locale}${suffix}`).pipe(
    //     catchError(() => of(null))
    //   )
    // ]).subscribe((response: any[]) => {
    //   const devKeys = response[0];
    //   const translatedKeys = response[1];
    //
    //   translate.setTranslation(defaultLocale, devKeys || {});
    //   translate.setTranslation(locale, translatedKeys || {}, true);
    //
    //   translate.setDefaultLang(defaultLocale);
    //   translate.use(locale);
    //
    //   resolve(true);
    // });
  });
}

@NgModule({
  declarations : [
    AppComponent,
    CreateRoomComponent,
    JoinRoomComponent,
    HomePageComponent,
    RoomPageComponent,
    CardComponent,
    UserCardComponent,
    CardPickerComponent,
    CardShowerComponent,
    VoteShowerComponent,
    AdminPageComponent,
    UserSettingsComponent,
    MoscowResultShowerComponent
  ],
  imports : [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ClipboardModule,
    MatSliderModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    AppRoutingModule,
    MatInputModule,
    HttpClientModule,
    MatGridListModule,
    FormsModule,
    MatMenuModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
    TranslateModule.forRoot()
  ],
  providers : [
    {
      provide : InjectableRxStompConfig,
      useValue : myRxStompConfig
    },
    {
      provide : RxStompService,
      useFactory : rxStompServiceFactory,
      deps : [ InjectableRxStompConfig ]
    },
    {
      provide : LocationStrategy,
      useClass : HashLocationStrategy
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [HttpClient, TranslateService],
      multi: true
    }
  ],
  bootstrap : [ AppComponent ]
})
export class AppModule {
}
