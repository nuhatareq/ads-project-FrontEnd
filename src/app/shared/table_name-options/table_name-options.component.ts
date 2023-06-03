import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Table } from 'primeng/table';
@Component({
    selector: 'app-table_name-options',
    templateUrl: './table_name-options.component.html',
    styleUrls: ['./table_name-options.component.scss'],
})
export class Table_nameOptionsComponent implements OnInit {
    @Input('products') products: Array<any> = [];
    @Input('cols') cols: Array<any>[] = [];
    @Input('tablename') tablename: string = '';
    @Input('headers') headers: Array<string> = [];
    @Input('keys') keys: Array<string> = [];
    @Input('btnInfo') btnInfo?: boolean = false;
    @Output('filter')
    filter: EventEmitter<{
        table: Table;
        event: Event;
    }> = new EventEmitter<{ table: Table; event: Event }>();
    @Output('updateElement') updateElement: EventEmitter<any> =
        new EventEmitter<any>();
    @Output('deleteElement') deleteElement: EventEmitter<any> =
        new EventEmitter<any>();
    @Output('showElement') showElement: EventEmitter<any> =
        new EventEmitter<any>();
    constructor() {}

    ngOnInit() {}
    onGlobalFilter(table: Table, event: Event) {
        this.filter.emit({ table, event });
    }
    editProduct(product: any) {
        this.updateElement.emit(product);
    }
    deleteProduct(product: any) {
        this.deleteElement.emit(product);
    }
    showProductDetails(product: any) {
        this.showElement.emit(product);
    }
}
