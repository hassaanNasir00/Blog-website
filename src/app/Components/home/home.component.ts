import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  private i = 0;
  private txt = `He crafts responsive websites where technology
 meets creativity`;
  private speed = 50;
  constructor(private renderer: Renderer2, private el: ElementRef) {}
  ngOnInit(): void {
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
}
