import { Component, ElementRef, Renderer2 } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  private i = 0;
  private txt = `I’m interested in freelance opportunities. However, 
								if you have other request or question, don’t
								hesitate to contact me.`;
  private speed = 50;
  messageForm: any;
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private fb: FormBuilder
  ) {
    this.messageForm = this.fb.group({
      name: ['', Validators.required],
      adminName: 'Hassaan Nasir',
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  get name(): AbstractControl {
    return this.messageForm.controls['name'];
  }
  get email(): AbstractControl {
    return this.messageForm.controls['email'];
  }
  get subject(): AbstractControl {
    return this.messageForm.controls['subject'];
  }
  get message(): AbstractControl {
    return this.messageForm.controls['message'];
  }

  ngOnInit(): void {
    emailjs.init('cffcO8Tv7M34JlOly');

    this.typeWriter();
  }

  private typeWriter(): void {
    if (this.i < this.txt.length) {
      this.renderer.setProperty(
        this.el.nativeElement.querySelector('#demo'),
        'innerHTML',
        this.txt.substring(0, this.i + 1)
      );
      this.i++;
      setTimeout(() => this.typeWriter(), this.speed);
    }
  }

  async sendEmail() {
    let response = await emailjs.send('service_tscyscj', 'template_xkrjtuu', {
      from_name: this.messageForm.value.name,
      to_name: this.messageForm.value.adminName,
      from_email: this.messageForm.value.email,
      subject: this.messageForm.value.subject,
      message: this.messageForm.value.message,
    });

    alert('Message sent successfully');
    this.messageForm.reset();
  }
}
