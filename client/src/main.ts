import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { register as registerSwiperElements } from 'swiper/element/bundle';
import { routes } from './app/app.routes';
registerSwiperElements();
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule), 
    provideRouter(routes),
  ]
}).catch(err => console.error(err));