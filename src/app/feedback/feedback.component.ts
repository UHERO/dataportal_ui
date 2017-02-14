import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptionsArgs } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  private feedbackForm: FormGroup;
  private successMsg: string;
  private errorMsg: string;
  private hideAlert: Boolean = true;
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

  reset() {
    this.successMsg = '';
    this.errorMsg = '';
  }

  onSubmit() {
    this.hideAlert = false;
    let headers = new Headers();
    headers.append('Authorization', 'Bearer -VI_yuv0UzZNy4av1SM5vQlkfPK_JKnpGfMzuJR7d0M=');
    let requestOptionsArgs = { headers: headers };
    let feedback = { data: { name: '', email: '', feedback: '' }, 'g-recaptcha-response': '' };
    feedback.data.name = this.feedbackForm.value.name;
    feedback.data.email = this.feedbackForm.value.email;
    feedback.data.feedback = this.feedbackForm.value.feedback;
    feedback['g-recaptcha-response'] = this.feedbackForm.value.captcha;
    return this.http.post('http://api.uhero.hawaii.edu/v1/feedback', JSON.stringify(feedback), requestOptionsArgs).map((res: Response) => res.json())
      .subscribe(
      data => this.successMsg = 'Submission successful.',
      error => this.errorMsg = 'Something went wrong. Try again.',
      () => {
        setTimeout(() => {
          this.hideAlert = true
        }, 3000);
      });
  }
}
