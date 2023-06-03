import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
    @Input('formName') formName!: FormGroup;
    @Input('controlName') controlName!: string;
    @Input('placeholderText') placeholderText?: string = '';
    @Input('labelName') labelName!: string;
    @Input('inputType') inputType!: string;
    constructor() {}

    ngOnInit() {}
}
