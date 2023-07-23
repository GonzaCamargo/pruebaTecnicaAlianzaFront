import { Component, EventEmitter, Output, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { InformacionComponent } from '../informacion/informacion.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.css'],
  providers:[{provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}]
})
export class FormularioClienteComponent implements OnInit {

  @Output() informacion = new EventEmitter<void>();
  formularioCliente: FormGroup;
  esModificar:boolean = false;
  validarFecha: boolean = false;

  constructor(private fb:FormBuilder, private clienteService: ClienteService, public dialogRef: MatDialogRef<FormularioClienteComponent>, 
    @Inject(MAT_DIALOG_DATA) public data:Cliente ){
    this.formularioCliente = fb.group({
      idCliente: new FormControl({value: '', disabled:true},[Validators.required]),
      nombreCliente: new FormControl('',[Validators.required]),
      telefonoCliente: new FormControl('',[Validators.required]),
      correoCliente: new FormControl('',[Validators.required, Validators.email]),
      fechaInicioCliente: new FormControl('',[Validators.required]),
      fechaFinCliente: new FormControl('',[Validators.required])
    })
  }
  ngOnInit(): void {
    if (this.data != null) {
      this.esModificar = true;
      this.llenarCliente()
    }
  }


  closeModal(){
    this.informacion.emit();
  }

  //agregar cliente
  agregarCliente(){
    if (this.formularioCliente.valid) {
      let cliente = new Cliente();
      cliente.nombreCliente = this.formularioCliente.get('nombreCliente')?.value;
      cliente.telefonoCliente = this.formularioCliente.get('telefonoCliente')?.value;
      cliente.correoCliente = this.formularioCliente.get('correoCliente')?.value;

      cliente.fechaInicioCliente = this.formularioCliente.get('fechaInicioCliente')?.value;
      cliente.fechaFinCliente = this.formularioCliente.get('fechaFinCliente')?.value;

      debugger

      if (this.formularioCliente.get('fechaFinCliente')?.value < this.formularioCliente.get('fechaInicioCliente')?.value) {
        this.validarFecha = true;
      }else{
        this.clienteService.agregarCliente(cliente).subscribe(res=>{
          this.formularioCliente.reset();
          this.dialogRef.close()
        })
      }

      
    }
  }

  modificarCliente(){
    if (this.formularioCliente.valid) {
      let cliente = new Cliente();
      cliente.idCliente = this.formularioCliente.get('idCliente')?.value;
      cliente.nombreCliente = this.formularioCliente.get('nombreCliente')?.value;
      cliente.telefonoCliente = this.formularioCliente.get('telefonoCliente')?.value;
      cliente.correoCliente = this.formularioCliente.get('correoCliente')?.value;

      cliente.fechaInicioCliente = this.formularioCliente.get('fechaInicioCliente')?.value;
      cliente.fechaFinCliente = this.formularioCliente.get('fechaFinCliente')?.value;

      debugger

      console.log(cliente.fechaInicioCliente);
      console.log(cliente.fechaFinCliente);

      const date1 = new Date(cliente.fechaInicioCliente);
      const date2 = new Date(cliente.fechaFinCliente);
      
      

      if (date2 < date1) {
        this.validarFecha = true;
      }else{
        this.clienteService.modificarCliente(cliente).subscribe(res=>{
          this.formularioCliente.reset();
          this.dialogRef.close();
        })
      }
    }
  }


  llenarCliente(){
    this.formularioCliente.get('idCliente')?.setValue(this.data.idCliente);
    this.formularioCliente.get('nombreCliente')?.setValue(this.data.nombreCliente);
    this.formularioCliente.get('telefonoCliente')?.setValue(this.data.telefonoCliente);
    this.formularioCliente.get('correoCliente')?.setValue(this.data.correoCliente);

    this.formularioCliente.get('fechaInicioCliente')?.setValue(this.data.fechaInicioCliente);
    this.formularioCliente.get('fechaFinCliente')?.setValue(this.data.fechaFinCliente);
  }

}
