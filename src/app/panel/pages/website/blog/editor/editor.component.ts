import { Component, OnInit } from '@angular/core';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Location } from '@angular/common';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

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
    private location: Location
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

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  loadImageFailed() {
    // show message
  }

  ngOnInit(): void {
    this.title = 'Importance of art in work life balance and growth of mind';
  }

  changedEditor($event) {
    // console.log($event);
  }

  back() {
    this.location.back();
  }

}
