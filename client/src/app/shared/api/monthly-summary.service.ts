import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { MonthlySummary } from './monthly-summary.model';
import { RequestState } from './request-state';

@Injectable({ providedIn: 'root' })
export class MonthlySummaryService {
  private readonly state = signal<RequestState<MonthlySummary>>({ status: 'loading' });
  readonly summaryState = this.state.asReadonly();

  constructor(private readonly http: HttpClient) {}

  async load(year?: number, month?: number): Promise<void> {
    this.state.set({ status: 'loading' });
    try {
      const query = year !== undefined && month !== undefined ? `?year=${year}&month=${month}` : '';
      const summary = await firstValueFrom(
        this.http.get<MonthlySummary>(`/api/entries/monthly-summary${query}`),
      );
      this.state.set({ status: 'default', data: summary });
    } catch {
      this.state.set({ status: 'error', message: 'Could not load monthly summary.' });
    }
  }
}
