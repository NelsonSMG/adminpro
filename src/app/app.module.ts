import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//rutas
import { APP_ROUTES } from './app.routes';

//modulos
import { pagesModule } from './pages/pages.module';

//servicios
import { SettingsService } from './services/settings.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    pagesModule,
    APP_ROUTES,
    FormsModule
  ],
  providers: [SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
