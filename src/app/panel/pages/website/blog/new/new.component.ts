import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  modules = {};
  content = '';

  imageChangedEvent: any = '';
  croppedImage: any = '';

  public editorStyle = {
    height: '500px',
    backgroundColor: '#fff',
  };

  public title;

  constructor(
    private location: Location,
    private toastr: ToastrService
  ) {
    this.modules = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ header: 1 }, { header: 2 }],
        ['blockquote', 'code-block'],
        [{ list: 'bullet' }, { list: 'ordered'}],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ header: [1, 2, 3, false] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['clean'],
        ['link', 'image', 'video'],
      ]
    };
  }

  ngOnInit(): void {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  loadImageFailed() {
    // show message
  }

  uploadImage() {
    this.toastr.success('Hello world!', 'Toastr fun!');
    const image = this.croppedImage;
    this.imageChangedEvent = '';
  }

  changedEditor($event) {
    // console.log($event);
  }

  back() {
    this.location.back();
  }

}
