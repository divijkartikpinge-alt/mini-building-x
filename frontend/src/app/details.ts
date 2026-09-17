import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [RouterLink],
  template: `
    <main>
      <h2>Building details</h2>
      <p>This view is routed separately from the live sensor readings.</p>
      <a routerLink="/readings">Back to readings</a>
    </main>
  `,
})
export class Details {}
