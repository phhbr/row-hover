import {AfterContentChecked, Component, ElementRef} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';

@Component({
  selector: 'app-custom-cell',
  template: `
    <span style="color: red;">
      <ng-container *ngIf="hovered; else notHovered">{{form.value * form.value}}
        <button (click)="doStuff(form.value)">show root</button></ng-container>
      <ng-template #notHovered>{{form.value + form.value}}</ng-template>
    </span>
  `,
})
export class CustomCellComponent implements ICellRendererAngularComp, AfterContentChecked {
  form: FormControl;
  params: ICellRendererParams;
  hovered = false;

  constructor(private elementRef: ElementRef) {
  }

  doStuff(val) {
    alert(val);
  }

  ngAfterContentChecked() {
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
