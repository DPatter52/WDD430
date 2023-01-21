import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [`
  h3{
    color: lightblue;
  }
  `]
})
export class AppComponent {
  serverUsername = "";
  showSecret = false;
  log: any = [];

  onUpdateServerUsername(event: any) {
    this.serverUsername = (<HTMLInputElement>event.target).value;
  }
  
  toggleDisplay() {
    this.showSecret = !this.showSecret;
    this.log.push(new Date());
  }
  
}
