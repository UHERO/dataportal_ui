// Based on: https://www.bennadel.com/blog/3235-creating-a-simple-copy-to-clipboard-directive-in-angular-2-4-9.htm
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";

@Injectable()
export class ClipboardService {
  private dom: Document;

  constructor(@Inject(DOCUMENT) dom: Document) {
    this.dom = dom;
  }

  public copy(value: string) {
    const promise = new Promise((resolve, reject) => {
      let textarea = null;
      try {
        // a selection is needed in order to copy to clipboard
        // create a textarea to select text to be copied
        textarea = this.dom.createElement('textarea');
        textarea.style.height = '0px';
        textarea.style.left = '-100px';
        textarea.style.opacity = '0';
        textarea.style.position = 'fixed';
        textarea.style.top = '-100px';
        textarea.style.width = '0px';
        this.dom.body.appendChild(textarea);
        textarea.value = value;
        textarea.select();
        // copy value to clipboard
        this.dom.execCommand('copy');
        resolve(value);
      } finally {
        if (textarea && textarea.parentNode) {
          textarea.parentNode.removeChild(textarea);
        }
      }
    });
    return(promise);
  }

}
