import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalClickService {
  public globalClickEvent: EventEmitter<MouseEvent> = new EventEmitter();

  constructor() {
    this.handleGlobalClick();
  }

  private handleGlobalClick() {
    document.addEventListener('click', (event) => {
      this.globalClickEvent.emit(event);
    });
  }
}
