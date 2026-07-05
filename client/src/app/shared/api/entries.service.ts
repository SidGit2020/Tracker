import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Entry, EntryInput } from './entry.model';
import { RequestState } from './request-state';

@Injectable({ providedIn: 'root' })
export class EntriesService {
  private readonly state = signal<RequestState<Entry[]>>({ status: 'loading' });
  readonly entriesState = this.state.asReadonly();

  constructor(private readonly http: HttpClient) {}

  async load(): Promise<void> {
    this.state.set({ status: 'loading' });
    try {
      const entries = await firstValueFrom(this.http.get<Entry[]>('/api/entries'));
      this.state.set({ status: 'default', data: entries });
    } catch {
      this.state.set({ status: 'error', message: 'Could not load entries.' });
    }
  }

  async create(input: EntryInput): Promise<Entry> {
    const created = await firstValueFrom(this.http.post<Entry>('/api/entries', input));
    this.prepend(created);
    return created;
  }

  async update(id: number, input: EntryInput): Promise<Entry> {
    const updated = await firstValueFrom(this.http.put<Entry>(`/api/entries/${id}`, input));
    this.replace(updated);
    return updated;
  }

  async remove(id: number): Promise<void> {
    await firstValueFrom(this.http.delete<void>(`/api/entries/${id}`));
    this.removeFromState(id);
  }

  private prepend(entry: Entry): void {
    const current = this.state();
    const data = current.status === 'default' ? current.data : [];
    this.state.set({ status: 'default', data: [entry, ...data] });
  }

  private replace(entry: Entry): void {
    const current = this.state();
    if (current.status !== 'default') {
      return;
    }
    this.state.set({
      status: 'default',
      data: current.data.map((existing) => (existing.id === entry.id ? entry : existing)),
    });
  }

  private removeFromState(id: number): void {
    const current = this.state();
    if (current.status !== 'default') {
      return;
    }
    this.state.set({ status: 'default', data: current.data.filter((existing) => existing.id !== id) });
  }
}
