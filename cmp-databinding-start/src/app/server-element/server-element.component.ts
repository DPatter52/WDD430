import { Component, 
  OnInit, 
  Input,
  ViewEncapsulation, 
  OnChanges,  
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy, 
  ViewChild,
  ElementRef,
  ContentChild
} from '@angular/core';


@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated // None, Native
})
export class ServerElementComponent implements 
OnInit, 
OnChanges,  
DoCheck, 
AfterContentInit,
AfterContentChecked,
AfterViewInit,
AfterViewChecked,
OnDestroy {
  @Input('srvElement') element: {type: string, name: string, content: string};
  @Input() name: string;
  @ViewChild('heading', {static: true}) header: ElementRef;
  @ContentChild('contentParagraph', {static: true}) paragraph: ElementRef; 

  constructor() {
    console.log('contructor called.');
   }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called.');
    console.log(changes);
   }

  ngDoCheck () {
    console.log('ngDoCheck called.')
   }

  ngOnInit() {
    console.log('ngOnInit called.');
    console.log('Text Content: ' + this.header.nativeElement.textContent)
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit called.')
  }
  
  ngAfterContentChecked() {
    console.log('ngAfterContentInit called.')
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called.')
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked called.')
  }

  ngOnDestroy(): void {
    console.log('ngOnDestory called.')
  }
}
