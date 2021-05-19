import { EmpresaService } from './empresa.service';
import { Component, OnInit } from '@angular/core';
import { Empresa } from './empresa';

@Component({
  selector: 'app-empresapage',
  templateUrl: './empresapage.component.html',
  styleUrls: ['./empresapage.component.css']
})
export class EmpresapageComponent implements OnInit {


  constructor(public EmpresaService:EmpresaService) {


   }

  ngOnInit(): void {
     this.EmpresaService.list = this.EmpresaService.getAll();
  }

  editar(empresa:Empresa){
      this.EmpresaService.empresa.next(empresa);
  }

  eliminar(id:number){
    if(confirm("Estas seguro de eliminar este registro?"))
    this.EmpresaService.delete(id).subscribe(data =>{
      console.log("Se elimino correctamente");
      this.updateList();
  });
  }

  updateList(){
    this.EmpresaService.list = this.EmpresaService.getAll();
  }

}
