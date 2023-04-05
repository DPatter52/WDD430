import { Directive, HostListener, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appDate]'
})
export class DateDirective implements OnInit{

  @HostListener('click') onClick() {
    console.log(new Date());
  }

  constructor(private el: ElementRef) {

  }

  ngOnInit(): void {
    this.el.nativeElement.innerHTML = new Date().toDateString();
  }

}
