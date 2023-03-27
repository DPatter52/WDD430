import { Component } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  private subscription!: Subscription;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documentService.getDocuments();
    this.subscription = this.documentService.documentChangedEvent
    .subscribe((documentsList: Document[]) => {
      this.documents = documentsList;
    })
  }

}
