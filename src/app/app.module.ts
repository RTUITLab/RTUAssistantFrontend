import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { HttpClientModule } from '@angular/common/http';
import { KeywordSpottingService } from './shared/keyword-spotting.service';
import { MainPageComponent } from './main-page/main-page.component';

const appRoutes: Routes = [
  { path: '', component: AuthPageComponent},
  { path: 'main', component: MainPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [KeywordSpottingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
