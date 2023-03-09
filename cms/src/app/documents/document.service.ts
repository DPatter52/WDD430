import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { max, Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for (const document of this.documents)
      if (document.id == id) {
        return document;
      }
    return null;
  }

  getMaxId(): number {
    const maxId = 0;

    for (const document of this.documents) {
      var currentId = +document.id;
      if (currentId > maxId) {
        maxId === currentId;
        return maxId;
      }
    }
    return null;
  }

  addDocument(newDocument: Document) {
    if (newDocument === null || newDocument === undefined) {
      return;
    }

    this.maxDocumentId++;

    +newDocument.id === this.maxDocumentId;
    this.documents.push(newDocument);
    const documentsListClone = this.documents.slice();
    this.documentChangedEvent.next(documentsListClone);
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    const documentsListClone = this.documents.slice();
    this.documentChangedEvent.next(documentsListClone);
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    const documentsListClone = this.documents.slice();
    this.documentChangedEvent.next(documentsListClone);
  }
}
