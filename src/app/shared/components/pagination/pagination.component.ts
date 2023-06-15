import { Component, Input, OnInit } from '@angular/core';
import { PaginationService } from './pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  constructor(private paginationService: PaginationService) { }

  ngOnInit(): void {
    this.paginationService.tableLength.subscribe({
      next: (tableLength) => {
        this.paginationService.tableLengthMax.next(this.limit);
        if (tableLength % this.limit === 0) {
          this.length = tableLength / this.limit;
        }
        else if ((tableLength % this.limit) % 10 >= 5) {
          this.length = Math.trunc(this.roundToNearest10(tableLength) / this.limit) + 1
        } else if ((tableLength % this.limit) % 10 < 5) {
          this.length = Math.trunc(this.roundToNearest10(tableLength + this.limit) / this.limit)
        }
        this.pagArray = new Array(this.length)
      }
    })




  }
  @Input() limit!: number
  tableLengthMin$ = this.paginationService.tableLengthMin
  tableLengthMax$ = this.paginationService.tableLengthMax
  length!: number
  public pagArray?: any[]

  roundToNearest10(number: number) {
    return Math.round(number / 10) * 10;
  }


  setTableRange(min: number, max: number) {
    if (min < 0) {
      this.paginationService.tableLengthMin.next(0);
    } else if (min > (this.length * this.limit) - this.limit) {
      this.paginationService.tableLengthMin.next((this.length * this.limit) - this.limit)
    } else {
      this.paginationService.tableLengthMin.next(min);
    }

    if (max > (this.length * this.limit)) {
      this.paginationService.tableLengthMax.next(this.length * this.limit)
    } else if (max < this.limit) {
      this.paginationService.tableLengthMax.next(this.limit)
    } else {
      this.paginationService.tableLengthMax.next(max)
    }
  }

}
