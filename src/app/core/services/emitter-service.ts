import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmitterService {
  // Event Dictionary
  private emitters: { [id: string]: EventEmitter<any> } = {};

  // Set a new event in the store with a given id
  // as key
  public Get(id: string): EventEmitter<any> {
    if (!this.emitters[id]) {
      this.emitters[id] = new EventEmitter();
    }
    return this.emitters[id];
  }
}
