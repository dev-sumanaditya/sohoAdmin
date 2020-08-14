import { Component, OnInit } from "@angular/core";

import { ImageCroppedEvent } from "ngx-image-cropper";
import { Location } from "@angular/common";
import { Route } from "@angular/compiler/src/core";
import { HttpClient, HttpEvent, HttpEventType } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ActivatedRoute } from "@angular/router";
import { tap } from 'rxjs/operators';

@Component({
  selector: "app-editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.scss"],
})
export class EditorComponent implements OnInit {
  modules = {};
  content = "";

  imageChangedEvent: any = "";
  croppedImage: any = "";

  public editorStyle = {
    height: "500px",
    backgroundColor: "#fff",
  };

  public blogData = null;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.modules = {
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ header: 1 }, { header: 2 }],
        ["blockquote", "code-block"],
        [{ list: "bullet" }, { list: "ordered" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ header: [1, 2, 3, false] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ["clean"],
        ["link", "image", "video"],
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
        .get<any>(environment.apiUrl + "/blog/" + id)
        .subscribe(({ data }) => {
          this.blogData = data;
        });
    }
  }

  changedEditor($event) {
    // console.log($event);
  }

  makeblob(dataURL) {
    const BASE64_MARKER = ";base64,";
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
  }

  async uploadImage() {
    const blob = this.makeblob(this.croppedImage);
    const name = `${this.blogData.id}${
      blob.type.split("/").length > 1 ? "." + blob.type.split("/")[1] : ""
      }`;
    const image = new File([blob], name, { type: blob.type });
    this.imageChangedEvent = "";
    const { data } = await this.http
      .get<any>(environment.apiUrl + '/blog/' + this.blogData.id + '/image', {
        params: { fileKey: name, fileType: blob.type },
      }).toPromise();
    const formData = new FormData();
    Object.keys(data.fields).forEach((key) => {
      formData.append(key, data.fields[key]);
    });
    formData.append('file', image);
    let progressInfo = 0;
    const response = await this.http.post(data.url, formData, {
      reportProgress: true,
      observe: 'events',
    }).pipe(
      tap((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            break;
          case HttpEventType.Response:
            break;
          case 1: {
            if (
              Math.round(progressInfo) !==
              Math.round((event['loaded'] / event['total']) * 100)
            ) {
              progressInfo = (event['loaded'] / event['total']) * 100;
              console.log(progressInfo)
            }
            break;
          }
        }
      })
    ).subscribe();

  }
  back() {
    this.location.back();
  }

  save() { }
  publish() { }
  delete() { }
}
