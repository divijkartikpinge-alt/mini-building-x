import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

interface ApiReading {
  id: number;
  device_id: string;
  metric: string;
  value: number;
  timestamp: string;
}

export interface SensorReading {
  id: string;
  name: string;
  value: number;
  unit: string;
}

@Injectable({ providedIn: 'root' })
export class ReadingsService {
  private readonly http = inject(HttpClient);
  private readonly readingsUrl = 'http://localhost:8000/readings';

  getReadings(): Observable<SensorReading[]> {
    return this.http.get<ApiReading[]>(this.readingsUrl).pipe(
      map((readings) => readings.map((reading) => ({
        id: reading.device_id,
        name: this.getMetricName(reading.metric),
        value: reading.value,
        unit: this.getMetricUnit(reading.metric),
      }))),
    );
  }

  private getMetricName(metric: string): string {
    const names: Record<string, string> = {
      temperature: 'Greenhouse temperature',
      temperature_c: 'Greenhouse temperature',
      humidity: 'Greenhouse humidity',
      light: 'Light level',
      soil_moisture: 'Soil moisture',
    };

    return names[metric] ?? metric;
  }

  private getMetricUnit(metric: string): string {
    const units: Record<string, string> = {
      temperature: 'C',
      temperature_c: 'C',
      humidity: '%',
      light: 'lux',
      soil_moisture: '%',
    };

    return units[metric] ?? '';
  }
}