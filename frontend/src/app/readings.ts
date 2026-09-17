import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ReadingsService, SensorReading } from './readings.service';

@Component({
  selector: 'app-readings',
  template: `
    <main>
      <h2>Sensor readings</h2>
      <ul>
        @for (reading of sensorReadings; track reading.id) {
          <li>
            <strong>{{ reading.name }}</strong>
            <span>{{ reading.value }} {{ reading.unit }}</span>
          </li>
        }
      </ul>
    </main>
  `,
})
export class Readings implements OnInit {
  protected sensorReadings: SensorReading[] = [];

  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly readingsService = inject(ReadingsService);

  ngOnInit(): void {
    this.readingsService.getReadings().subscribe((readings) => {
      this.sensorReadings = readings;
      this.changeDetector.detectChanges();
    });
  }
}
