import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {IMyDpOptions} from 'mydatepicker';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public instructor = null;
  public instructorID = '';

  modules = {};
  content = '';

  public lessons = [];
  public lessonForm: FormGroup;
  public lessonSubmitted = false;
  public lessonError = '';

  imageChangedEvent: any = '';
  croppedImage: any = '';

  public editorStyle = {
    height: '500px',
    backgroundColor: '#fff',
  };

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };
  public model: any = { date: { year: 2018, month: 10, day: 9 } };

  constructor(
    private location: Location,
    private http: HttpClient,
    private fb: FormBuilder
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
      ]
    };
  }

  ngOnInit(): void {
    this.lessonForm = this.fb.group({
      lessonName: [
        '',
        [
          Validators.required,
          Validators.maxLength(60),
          Validators.minLength(10),
        ],
      ],
      lessonDuration: [
        '',
        [
          Validators.required,
          Validators.min(10),
          Validators.max(360),
          Validators.pattern('^[1-9][0-9]*0$')
        ],
      ],
    });
  }

  get LessonFormControl() {
    return this.lessonForm.controls;
  }

  onSubmit() {
    this.lessonSubmitted = true;
    if (this.lessonForm.valid) {
      this.addLesson(this.lessonForm.value.lessonName, this.lessonForm.value.lessonDuration);
    } else {
      return;
    }
  }
  addLesson(nm, dtn) {
    this.lessons.push({id: Math.floor(Math.random() * 9999999), name: nm, duration: dtn});
    this.lessonSubmitted = false;
  }
  removeLesson(id) {
    const filteredArray = this.lessons.filter((item) => { return item.id !== id; });
    this.lessons = filteredArray;
  }

  back() {
    this.location.back();
  }

  selectInstructor() {
    this.http.get<any>(environment.apiUrl + '/instructor/' + this.instructorID).subscribe( data => {
      this.instructor = data.data;
      console.log(data);
    });
  }

  changedEditor($event) {
    // console.log($event);
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

}
