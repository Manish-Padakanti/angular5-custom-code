import { Component, ComponentRef, Injectable, Directive, TemplateRef, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
    FormArray
} from '@angular/forms';
import { isEmpty } from 'rxjs/operators';
import { isArray } from 'util';

/**
 * Options passed when opening a confirmation modal
 */
interface customOptions {
    /**
     * The title of the confirmation modal
     */
    title: string,

    /**
     * The message in the confirmation modal
     */
    message: string,

    data: Object;
}

interface slider {
    label: string,
    text: string,
    imagePath: any[]
}

/**
 * An internal service allowing to access, from the confirm modal component, the options and the modal reference.
 * It also allows registering the TemplateRef containing the confirm modal component.
 *
 * It must be declared in the providers of the NgModule, but is not supposed to be used in application code
 */
@Injectable()
export class ConfirmState {
    /**
     * The last options passed ConfirmService.confirm()
     */
    options: customOptions;

    /**
     * The last opened confirmation modal
     */
    modal: NgbModalRef;

    /**
     * The template containing the confirmation modal component
     */
    template: TemplateRef<any>;
}

/**
 * A confirmation service, allowing to open a confirmation modal from anywhere and get back a promise.
 */
@Injectable()
export class ConfirmService {

    constructor(private modalService: NgbModal, private state: ConfirmState) { }

    /**
     * Opens a confirmation modal
     * @param options the options for the modal (title and message)
     * @returns {Promise<any>} a promise that is fulfilled when the user chooses to confirm, and rejected when
     * the user chooses not to confirm, or closes the modal
     */
    open(options: customOptions): Promise<any> {
        console.log(this.state.options);
        this.state.options = options;
        this.state.modal = this.modalService.open(this.state.template);
        return this.state.modal.result;
    }
}

/**
 * The component displayed in the confirmation modal opened by the ConfirmService.
 */
@Component({
    selector: 'custom-modal-component',
    styleUrls: ['./custom-modal.scss'],
    templateUrl: './custom-modal2.html',
    styles: [':host { background: lightblue; display: block; padding: 5px;}']
})
export class CustomModalComponent implements OnInit {

    newSliderForm: FormGroup;
    parentInfo: Array<any> = [];
    localUrl: any[];
    modal = '';
    newSlider: slider;
    options: customOptions;
    //imagePath: any[];


    constructor(private state: ConfirmState) {
        this.options = state.options;
        console.log(this.options);
        // this.newSlider['label'] = '';
        // this.newSlider['text'] = '';
        this.modal = this.options.data['type'];
        this.parentInfo = this.options.data['sliders'];
    }

    initForm(): void {
        // let label = '',
        //     text = '',
        //     imagePath = '';
        this.newSliderForm = new FormGroup({
            label: new FormControl(),
            text: new FormControl(),
            imagePath: new FormControl()
        });
    }
    ngOnInit() {
        if (this.modal == 'add') {
            this.initForm();
            // this.newSlider['label'] = '';
            // this.newSlider['text'] = '';
        }
    }

    handleFileInput(event: any, type, idx) {
        if (event.target.files && event.target.files[0] && type == undefined) {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.localUrl = event.target.result;
                console.log(this.localUrl);
                //this.imagePath = this.localUrl;
            }
            reader.readAsDataURL(event.target.files[0]);
        } else if (event.target.files && event.target.files[0] && type !== undefined && type == 'edit') {
            var reader = new FileReader();
            reader.onload = (event: any) => {
                this.localUrl = event.target.result;
                console.log(this.localUrl);
                this.parentInfo[idx].imagePath = this.localUrl;
                //this.imagePath = this.localUrl;
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    deleteRow(i) {
        console.log(i);
        console.log(this.parentInfo.indexOf(i));
        this.parentInfo.splice(i, 1);
    }

    addNewSlider(): void {
        console.log(this.newSliderForm);
        this.newSliderForm.value.imagePath = this.localUrl;
        this.parentInfo.unshift(this.newSliderForm.value);
        this.yes();
    }

    closeSliders(){
        console.log(this.parentInfo);
        this.yes();
    }

    yes() {
        this.state.modal.close('confirmed');
    }

    no() {
        this.state.modal.dismiss('not confirmed');
    }

    public onEventLog(event: string, data: any): void {
        console.log(event, data);
      }
}

/**
 * Directive allowing to get a reference to the template containing the confirmation modal component,
 * and to store it into the internal confirm state service. Somewhere in the view, there must be
 *
 * ```
 * <template confirm>
 *   <confirm-modal-component></confirm-modal-component>
 * </template>
 * ```
 *
 * in order to register the confirm template to the internal confirm state
 */
@Directive({
    selector: "[confirm]"
})
export class ConfirmTemplateDirective {
    constructor(confirmTemplate: TemplateRef<any>, state: ConfirmState) {
        state.template = confirmTemplate;
    }
}