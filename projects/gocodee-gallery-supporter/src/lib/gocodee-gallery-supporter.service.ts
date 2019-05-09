import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GocodeeGallerySupporterService {
    visible = new BehaviorSubject(false);

    public show() {
        this.visible.next(true);
    }
    constructor() { }
}
