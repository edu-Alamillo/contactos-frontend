import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ContactService } from '../servicios/contact.service';
import { Contact } from '../model/contact.interface';
import { CommonModule } from '@angular/common';
import { error } from 'node:console';
import { response } from 'express';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export default class ContactFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private contactService = inject(ContactService);

form?: FormGroup;
contact?: Contact;
errors: String[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
   
    if(id){
      this.contactService.get(parseInt(id))
      .subscribe(contact => {
        this.contact = contact;
        this.form = this.fb.group({
          nombre: [contact.nombre,[Validators.required]],
          correo: [contact.correo,[Validators.required, Validators.email]] 
        });
      })
    }else{
      this.form = this.fb.group({
        nombre: ['',[Validators.required]],
        correo: ['',[Validators.required, Validators.email]] 
      });
    }
  }


  save(){

    if(this.form?.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const ContactForm = this.form!.value;
    let request: Observable<Contact>;

    if(this.contact){
      request = this.contactService.update(this.contact.id, ContactForm)

    }else{
      request = this.contactService.Create(ContactForm)
      
    }

    request.subscribe({
      next: ()=>{
        this.errors = []
        this.router.navigate(['/']);
      },
      error: response =>{
        this.errors = response.error.errors;
      } 
    });

  }
}
