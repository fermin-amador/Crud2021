import { EmpresaService } from './../empresa.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Empresa } from '../empresa';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrls: ['./empresa-form.component.css']
})
export class EmpresaFormComponent implements OnInit, OnDestroy {

  empresaform:FormGroup;
  esEditar:boolean = false;
  private subscription: Subscription = new Subscription;
  constructor(public EmpresaService:EmpresaService, private fb:FormBuilder) {


    this.empresaform = this.fb.group({
      empresaId:[0],
      nombre:['',Validators.required],
      descripcion:['',Validators.required],
      telefono:['',Validators.required]
    });
  }


  ngOnInit(): void {
    this.subscription = this.EmpresaService.empresa.subscribe((empresa:Empresa)=>{

      this.empresaform.patchValue({
        empresaId:empresa.empresaId,
        nombre:empresa.nombre,
        descripcion:empresa.descripcion,
        telefono:empresa.telefono
      })
      this.esEditar = true;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
   }

  guardar(){
    const empresa = {
      empresaId:this.empresaform.get('empresaId')?.value,
      nombre:this.empresaform.get('nombre')?.value,
      descripcion:this.empresaform.get('descripcion')?.value,
      telefono:this.empresaform.get('telefono')?.value
    } as Empresa

    if(empresa.empresaId == 0)
    this.nuevo(empresa);
    else
    this.actualizar(empresa);

  }

  nuevo(empresa:Empresa){
      this.EmpresaService.create(empresa).subscribe(data =>{
          console.log("Agregado correctamente");
          this.updateList();
          this.reset();
      });
  }
  actualizar(empresa:Empresa){
      this.EmpresaService.update(empresa.empresaId,empresa).subscribe(data =>{
          console.log("Se actualizo correctamente");
          this.updateList();
          this.reset();
      });
  }

  get field(){
    return this.empresaform.controls;
  }

  updateList(){
    this.EmpresaService.list = this.EmpresaService.getAll();
  }

  reset(){

    this.empresaform.reset();
    this.empresaform.patchValue({
      empresaId:0,
      nombre:'',
      descripcion:'',
      telefono:''
    })
  }

}
