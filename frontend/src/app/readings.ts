import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReadingsService } from './readings.service';

@Component({
  selector: 'app-readings',
  imports: [AsyncPipe],
  template: `
    <main>
      <h2>Live sensor readings <span>LIVE</span></h2>
      <ul>
        @for (reading of (liveReadings | async) ?? []; track reading.id) {
          <li>
            <strong>{{ reading.name }}</strong>
            <span>{{ reading.value }} {{ reading.unit }}</span>
          </li>
        }
      </ul>
    </main>
  `,
})
export class Readings {
  protected readonly liveReadings = inject(ReadingsService).getLiveReadings();
}
