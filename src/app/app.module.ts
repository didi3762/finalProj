import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {SlideshowModule} from 'ng-simple-slideshow';


import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './comps/home/home.component';
import { PipeServicePipe } from './pipes/pipe-service.pipe';
import { SiginInComponent } from './comps/sigin-in/sigin-in.component';
import { RoutingModule } from './routing/routing.module';
import { DialogComponent } from './comps/dialog/dialog.component';
import { MatModulModule } from './mat-modul/mat-modul.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PipeServicePipe,
    SiginInComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    SlideshowModule,
    MatModulModule
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
