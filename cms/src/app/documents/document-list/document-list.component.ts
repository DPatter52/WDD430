import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );
    this.documents = this.documentService.getDocuments();
  }
}
