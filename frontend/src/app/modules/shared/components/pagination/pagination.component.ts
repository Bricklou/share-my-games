import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface Page {
  label: string;
  value: number;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input()
  public totalItems!: number;

  @Input()
  public currentPage = 1;

  @Input()
  public maxItems = 7;

  @Input()
  public itemsPerPage!: number;

  @Output()
  public pageChange = new EventEmitter<number>();

  protected pages: Page[] = [];

  public ngOnInit(): void {
    this.createPagesArray();
  }

  protected onPageChange(page: number): void {
    this.createPagesArray();

    this.pageChange.emit(page);

    this.currentPage = page;
  }

  protected get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  protected isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  protected isLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }

  protected previous(): void {
    if (!this.isFirstPage()) {
      this.onPageChange(this.currentPage - 1);
    }
  }

  protected next(): void {
    if (!this.isLastPage()) {
      this.onPageChange(this.currentPage + 1);
    }
  }

  protected setCurrent(page: number): void {
    if (page === -1) return;
    this.onPageChange(page);
  }

  private createPagesArray(): void {
    // Generate the paginator pages array like the following
    // If maxItems is 3:
    // 1 2 3 ... 8 9 10

    const pages: Page[] = [];

    // Return 1 as default page number
    // Make sense to show 1 instead of empty when there are no items
    const totalPages = Math.max(
      Math.ceil(this.totalItems / this.itemsPerPage),
      1
    );
    const halfWay = Math.ceil(this.maxItems / 2);

    const isStart = this.currentPage <= halfWay;
    const isEnd = totalPages - halfWay < this.currentPage;
    const isMiddle = !isStart && !isEnd;

    const ellipsesNeeded = this.maxItems < totalPages;
    let i = 1;

    while (i <= totalPages && i <= this.maxItems) {
      const pageNumber = this.calculatePageNumber(
        i,
        this.currentPage,
        this.maxItems,
        totalPages
      );
      const openingEllipsesNeeded = i === 2 && (isMiddle || isEnd);
      const closingEllipsesNeeded =
        i === this.maxItems - 1 && (isMiddle || isStart);
      if (ellipsesNeeded && (openingEllipsesNeeded || closingEllipsesNeeded)) {
        pages.push({
          label: 'dots',
          value: -1,
        });
      } else {
        pages.push({
          label: String(pageNumber),
          value: pageNumber,
        });
      }
      i++;
    }

    this.pages = pages;
  }

  /**
   * Given the position in the sequence of pagination links [i],
   * figure out what page number corresponds to that position.
   */
  private calculatePageNumber(
    i: number,
    currentPage: number,
    paginationRange: number,
    totalPages: number
  ): number {
    const halfWay = Math.ceil(paginationRange / 2);
    if (i === paginationRange) {
      return totalPages;
    } else if (i === 1) {
      return i;
    } else if (paginationRange < totalPages) {
      if (totalPages - halfWay < currentPage) {
        return totalPages - paginationRange + i;
      } else if (halfWay < currentPage) {
        return currentPage - halfWay + i;
      } else {
        return i;
      }
    } else {
      return i;
    }
  }
}
