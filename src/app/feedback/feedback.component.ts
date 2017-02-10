import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  private feedbackForm: FormGroup;
  constructor(private fb: FormBuilder, private http: Http) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.feedbackForm = this.fb.group({
      'name': [''],
      'email': [''],
      'feedback': ['', Validators.required],
      'captcha': ['', Validators.required]
    });
  }

  onSubmit() {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let feedback = JSON.stringify(this.feedbackForm.value);
    return this.http.post('udaman.uhero.hawaii.edu/feedback', feedback, headers).map((res: Response) => res.json());
  }
}
