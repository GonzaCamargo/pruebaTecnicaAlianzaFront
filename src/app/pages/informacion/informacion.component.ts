import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from 'src/app/services/cliente.service';
import { FormularioClienteComponent } from '../formulario-cliente/formulario-cliente.component';
import { Cliente } from 'src/app/models/cliente';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css'],
  template: `<app-formulario-cliente
              (informacion)="onEventLaunched($event)">
            </app-formulario-cliente>`
})
export class InformacionComponent {

  clientes: Array<Cliente> = [];
  displayedColumns: string[] = ['id', 'name', 'Phone', 'E-mail','Date added','Date end','modificar'];
  dataSource = this.clientes;

  formularioObtenerCliente: FormGroup;
  

  constructor(private clienteService:ClienteService, public dialog: MatDialog, private fb:FormBuilder, private dialogRef: MatDialogRef<FormularioClienteComponent>){
    this.formularioObtenerCliente = fb.group({
      idCliente: new FormControl('',[Validators.required])
    })
    this.clientes = new Array<Cliente>;
    this.mostrarClientes();
  }


  //Mostrar cliente
  mostrarClientes(){
    this.clienteService.getAll().subscribe(res =>{
      this.clientes = res
      this.dataSource = res
    })
  }

  obtenerCliente(){
    let cliente = new Cliente;
    let idCliente = cliente.idCliente = this.formularioObtenerCliente.get('idCliente')?.value;
    this.clienteService.obtenerCliente(idCliente).subscribe(res=>{
      console.log(res);

      // this.clientes = new Array();
      this.dataSource = new Array();
      this.dataSource.push(res);
      // this.clientes.push(res);
      
    })
  }

  closeDialog(){
    this.dialogRef.close();
  }


  openDialog() {
    this.dialogRef = this.dialog.open(FormularioClienteComponent);

    this.dialogRef.afterClosed().subscribe(result => {
      this.mostrarClientes();
    });
  }


  openDialogUpDate(cliente:Cliente) {
    this.dialogRef = this.dialog.open(FormularioClienteComponent, {data: cliente});

    this.dialogRef.afterClosed().subscribe(result => {
      this.mostrarClientes();
    });
  }

  exportarCsv(){

    const csvData: any[] = [];

    const headerRow = Object.keys(this.dataSource[0]);
    csvData.push(headerRow);

    this.dataSource.forEach((row: any)=>{
      const rowData = Object.values(row);
      csvData.push(rowData);
    })

    const csvString = this.convertToCsvString(csvData);

    const blob = new Blob([csvString],{type:'text/csv;charset=utf-8'});

    FileSaver.saveAs(blob,'exported_data.csv')
  }

  private convertToCsvString(data: any[]): string {
    return data.map((row) => row.join(',')).join('\n');
  }

}
