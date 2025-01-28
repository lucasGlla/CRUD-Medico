import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MedicosService } from '../../medicos.service';
import { Medico } from '../../Medico';

@Component({
  selector: 'app-medicos',
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [],
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit{

  formularioMedico: any;
  tituloFormularioMedico: string = '';
  medicos: Medico[] = [];

  visibilidadeTableMedico: boolean = true;
  visibilidadeFormMedico: boolean = false;

  constructor(private medicosService: MedicosService){}

  ngOnInit(): void {

    this.medicosService.PegarMedicos().subscribe(result =>{
      this.medicos = result;
    });

    
  }

  exibirFormularioCadastro(): void{
    this.visibilidadeTableMedico = false;
    this.visibilidadeFormMedico = true;
    this.tituloFormularioMedico = 'Cadastrar Medico';
    this.formularioMedico = new FormGroup({
      nome: new FormControl(null),
      email: new FormControl(null),
      pacientes: new FormControl(null),
      area: new FormControl(null),
      idade: new FormControl(null)
    });
  }

  FormularioAtualizacaoMedico(medicoId: number): void {
    this.visibilidadeTableMedico = false;
    this.visibilidadeFormMedico = true;

    this.medicosService.PegarMedicoId(medicoId).subscribe(result => {
      this.tituloFormularioMedico = `Atualizar ${result.nome} ${result.email}`;

      this.formularioMedico = new FormGroup({
        medicoId: new FormControl(result.medicoId),
        nome: new FormControl(result.nome),
        email: new FormControl(result.email),
        pacientes: new FormControl(result.pacientes),
        area: new FormControl(result.area),
        idade: new FormControl(result.idade)
      });
    });
  }

  EnviarFormularioMedico(): void {
      const medico: Medico = this.formularioMedico.value;
  
      if(medico.medicoId > 0){
        this.medicosService.AtualizarMedico(medico).subscribe(result => {
          this.visibilidadeFormMedico = false;
        this.visibilidadeTableMedico = true;
        alert('Paciente cadastrado com Sucesso');
        this.medicosService.PegarMedicos().subscribe((registros) => {
          this.medicos = registros;
        });
        });
      } else{
          this.medicosService.SalvarMedico(medico).subscribe((result) => {
            this.visibilidadeFormMedico = false;
            this.visibilidadeTableMedico = true;
            alert('Paciente cadastrado com Sucesso');
            this.medicosService.PegarMedicos().subscribe((registros) => {
              this.medicos = registros;
            });
          });
        }
    }

    Voltar(): void {
      this.formularioMedico.reset();
      this.visibilidadeFormMedico = false;
      this.visibilidadeTableMedico = true;
    }

    ExcluirMedico(medicoId: number): void {
      if (confirm('Tem certeza que deseja apagar este médico?')) {
        this.medicosService.ExcluirMedico(medicoId).subscribe(() => {
          alert('Médico excluído com sucesso');
          this.formularioMedico.reset();
        });
      }
    }
    

}
