import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CascadeComponent } from './cascade/cascade.component';
import { BubbleComponent } from './bubble/bubble.component';
import { HeatmapComponent } from './heatmap/heatmap.component';


@NgModule({
  declarations: [
    AppComponent,
    CascadeComponent,
    BubbleComponent,
    HeatmapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
