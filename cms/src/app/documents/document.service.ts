import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { max, Subject } from 'rxjs';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private httpClient: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  setDocuments(documents: Document[]) {
    this.documents = documents;
    this.documentChangedEvent.next(this.documents.slice());
  }

  // getDocuments(): Document[] {
  //   return this.documents.slice();
  // }

  storeDocuments(documents: Document[]) {
    const documentsString = JSON.stringify(documents);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.httpClient
      .put(
        'https://wdd430-server-default-rtdb.firebaseio.com/documents.json',
        documentsString,
        { headers }
      )
      .subscribe(
        (response) => {
          console.log('Documents have been saved', response);
        },
        (error) => {
          console.error('Error saving documents: ', error);
        }
      );
    this.documentChangedEvent.next(this.documents.slice());
  }

  getDocuments() {
    this.httpClient
      .get('https://wdd430-server-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => (a.name > b.name ? 1 : -1));
          this.documentChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.error('Error getting documents:', error);
        }
      );
  }

  getDocument(id: string): Document {
    for (const document of this.documents)
      if (document.id == id) {
        return document;
      }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;

    for (const document of this.documents) {
      var currentId = +document.id;

      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addDocument(newDocument: Document) {
    if (newDocument == null || newDocument == undefined) {
      return;
    }

    this.maxDocumentId++;

    newDocument.id = this.maxDocumentId.toString();

    this.documents.push(newDocument);
    const documentsListClone = this.documents.slice();
    
    this.storeDocuments(documentsListClone);
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
    this.storeDocuments(documentsListClone);
  }

  deleteDocument(document: Document) {
    if (document == undefined || document == null) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    const documentsListClone = this.documents.slice();
    this.storeDocuments(documentsListClone);
  }
}
