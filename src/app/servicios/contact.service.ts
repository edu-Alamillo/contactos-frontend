import { HttpClient } from '@angular/common/http';
import { Injectable, inject} from '@angular/core';
import { Contact } from '../model/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

private http = inject(HttpClient);

list(){
  return this.http.get<Contact[]>('http://localhost:8080/api/contacto/');
}

get(id: number){
  return this.http.get<Contact>('http://localhost:8080/api/contacto/'+id);
}

Create(contacto: Contact){
  return this.http.post<Contact>('http://localhost:8080/api/contacto/', contacto);
}

update(id: number, contacto: Contact){
  return this.http.put<Contact>('http://localhost:8080/api/contacto/'+id, contacto);
}

delete(id: number){
  return this.http.delete<void>('http://localhost:8080/api/contacto/'+id);
}

}
