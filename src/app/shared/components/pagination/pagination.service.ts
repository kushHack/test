import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  tableLength = new BehaviorSubject(0);
  tableLengthMin = new BehaviorSubject(0);
  tableLengthMax = new BehaviorSubject(0);
  constructor() { }
}
