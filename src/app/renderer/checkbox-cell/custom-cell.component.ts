import {AfterViewChecked, Component, ElementRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';

@Component({
  selector: 'app-custom-cell',
  templateUrl: 'custom-cell.component.html',
  styleUrls: ['./custom-cell.component.scss'],
})
export class CustomCellComponent implements ICellRendererAngularComp, AfterViewChecked {
  form: FormControl;
  params: ICellRendererParams;
  hovered = false;

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewChecked() {
    this.hovered = (this.elementRef.nativeElement as HTMLElement)
      .parentElement
      .parentElement
      .classList.contains('ag-row-hover');
  }

  agInit(params: any): void {
    this.params = params;
    this.form = new FormControl(params.value);
    this.form.valueChanges.subscribe(val => this.params.setValue(val));
  }

  refresh(params: any): boolean {
    return false;
  }
}
