import { Component, OnInit } from '@angular/core';

@Component({
  selector: '.app-servers',
  // template: `
  // <app-server></app-server>
  // <app-server></app-server>`,
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})

export class ServersComponent implements OnInit{
  allowNewServer = false;
  serverCreationStatus = "No server was created.";
  serverName = 'testserver';
  serverCreated = false;
  servers: any = [];
  

  constructor(){
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000)
  }

  ngOnInit() {
   } 

   onAddServer() {
    this.servers.push('Another Server');
  }
  
  onRemoveServer(id: number) {
    const position = id + 1;
    this.servers.splice(position, 1);
  }


}
