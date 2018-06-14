import { IModalDialog, IModalDialogOptions } from 'ngx-modal-dialog';
import { Component, ComponentRef } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'news-custom-modal',
  styleUrls: ['./custom-modal.scss'],
  templateUrl: './custom-modal.html',
  //   `
  //     <p>This component is custom.</p>
  //     <p>This came from parent: <b>{{parentInfo}}</b></p>
  //   `,
  styles: [':host { background: lightblue; display: block; padding: 5px;} @media (min-width: 576px) {.modal-dialog {max-width: unset;}} ']
})
export class CustomModalComponent implements IModalDialog {
  parentInfo: Array<any> = [];
  localUrl: any[];
  modal: string;
  newSlider: object = {};

  dialogInit(reference: ComponentRef<IModalDialog>, options: Partial<IModalDialogOptions<string>>) {
    console.log(options.data);
    this.newSlider['label'] = '';
    this.newSlider['text'] = '';
    this.modal = options.data['type'];
    this.parentInfo = options.data['sliders'];
    // if(this.parentInfo.type == 'add'){
    //   this.parentInfo.currentTile = {};
    // }
  }
  handleFileInput(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.localUrl = event.target.result;
        console.log(this.localUrl);
        this.newSlider['imagePath'] = this.localUrl;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  deleteRow(i) {
    this.parentInfo.splice(this.parentInfo.indexOf(i), 1);
  }

  addNewSlider() {
    this.parentInfo.push(this.newSlider);
  }
}

// function handleFileInput(files: FileList) {
//   this.fileToUpload = this.parentInfo.imagePath;
// }

