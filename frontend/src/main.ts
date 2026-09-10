import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: '<h1>Mini Building X</h1>'
})
class AppComponent {}

bootstrapApplication(AppComponent).catch((error) => console.error(error));