import { Component, OnInit } from '@angular/core';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Location } from '@angular/common';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  modules = {};
  content = '';

  uploading = false;
  uploadPercentage = 0;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  public editorStyle = {
    height: '500px',
    backgroundColor: '#fff',
  };

  public blogData = null;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {
    this.modules = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ header: 1 }, { header: 2 }],
        ['blockquote', 'code-block'],
        [{ list: 'bullet' }, { list: 'ordered' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ header: [1, 2, 3, false] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['clean'],
        ['link', 'image', 'video'],
      ],
    };
  }

  fileChangeEvent(event: any): void {
    if (event.target.files.length > 0) {
      this.imageChangedEvent = event;
    }
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  loadImageFailed() {
    // show message
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    if (id) {
      this.http
        .get<any>(environment.apiUrl + '/blog/' + id)
        .subscribe(({ data }) => {
          this.blogData = data;
        });
    }
  }

  makeblob(dataURL) {
    const BASE64_MARKER = ';base64,';
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }

  async uploadImage() {
    this.uploading = true;
    const blob = this.makeblob(this.croppedImage);
    const name = `${this.blogData.id}${
      blob.type.split('/').length > 1 ? '.' + blob.type.split('/')[1] : ''
    }`;
    const image = new File([blob], name, { type: blob.type });
    this.imageChangedEvent = '';
    const { data } = await this.http
      .get<any>(environment.apiUrl + '/blog/' + this.blogData.id + '/image', {
        params: { fileKey: name, fileType: blob.type },
      })
      .toPromise();
    const formData = new FormData();
    Object.keys(data.fields).forEach((key) => {
      formData.append(key, data.fields[key]);
    });
    formData.append('file', image);
    this.uploadPercentage = 0;
    const response = await this.http
      .post(data.url, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        tap((event: HttpEvent<any> & { loaded: number; total: number }) => {
          switch (event.type) {
            case HttpEventType.Sent:
              break;
            case HttpEventType.Response: {
              this.uploading = false;
              break;
            }
            case 1: {
              if (
                Math.round(this.uploadPercentage) !==
                Math.round((event.loaded / event.total) * 100)
              ) {
                this.uploadPercentage =
                  Math.round(event.loaded / event.total) * 100;
              }
              break;
            }
          }
        })
      )
      .toPromise();
    this.blogData.image =
      'https://teachup-space.sgp1.digitaloceanspaces.com/blog/' + name;

    this.http
      .put<any>(environment.apiUrl + '/blog', this.blogData)
      .subscribe((d) => {
        console.log(d);
      });
  }
  back() {
    this.location.back();
  }

  save() {
    this.http
      .put<any>(environment.apiUrl + '/blog', this.blogData)
      .subscribe((data) => {
        console.log(data);
      });
  }
  publish() {
    this.http
      .put<any>(environment.apiUrl + '/blog', this.blogData)
      .subscribe((data) => {
        console.log(data);
      });
  }
  delete() {
    this.http
      .delete<any>(environment.apiUrl + '/blog/' + this.blogData.id)
      .subscribe((data) => {
        this.router.navigate(['website-settings']);
      });
  }
}
