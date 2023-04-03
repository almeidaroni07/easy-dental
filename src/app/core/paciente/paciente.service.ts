import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Anamnese } from '../model/anamnese';
import { PreAnamnese } from '../model/preAnamnese';
import { PreAnamneseRequest } from '../model/preAnamneseRequest';
import { PreAvaliacao } from '../model/preAvaliacao';
import { Paciente } from './paciente';

const API_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http:  HttpClient) { }

  getListPacientes(){

    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })

    return this.http.get(API_URL + '/paciente/v1/'+window.localStorage.getItem('authCustomer'),{ headers: reqHeader});
  }

  buscarPorID(id: number){
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })
    return this.http.get(API_URL + '/paciente/v1/id/'+window.localStorage.getItem('authCustomer')+'?pacienteId='+id,{ headers: reqHeader});
  }
  

  salvar(paciente : Paciente){

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })

    return this.http.post(API_URL + '/paciente/v1/'+window.localStorage.getItem('authCustomer'), 
                          paciente,
                          { headers: reqHeader, responseType: 'text'});
  }

  update(paciente : Paciente, pacienteId: number){
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })

    return this.http.put(API_URL + '/paciente/v1/'+window.localStorage.getItem('authCustomer')+'?pacienteId='+pacienteId, 
                          paciente,
                          { headers: reqHeader, responseType: 'text'});
  }

  delete(pacienteId: number){
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })

    return this.http.delete(API_URL + '/paciente/v1/'+window.localStorage.getItem('authCustomer')+'?pacienteId='+pacienteId,{ headers: reqHeader, responseType: 'text'});
  }


  buscarPreAvaliacaoEAnamnesePorID(id: number){
    const reqHeader = new HttpHeaders({
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })
    return this.http.get(API_URL + '/paciente/v1/pre/anamnese/'+window.localStorage.getItem('authCustomer')+'?pacienteId='+id,{ headers: reqHeader});
  }

  updatePreAnamnese(form: PreAnamneseRequest, pacienteId: number){

    const anamnese: Anamnese = {
      id: form.anamneseID,
      alergicoMedicamento: form.alergicoMedicamento,
      alergicoMedicamentoQual: form.alergicoMedicamentoQual,
      usaMedicamento: form.usaMedicamento,
      usaMedicamentoQual: form.usaMedicamentoQual,
      alergiaAnestesia: form.alergiaAnestesia,
      alergiaAnestesiaQual: form.alergiaAnestesiaQual,
      gravidaOuAmamentando: form.gravidaOuAmamentando,
      doencaCardioRespiratoria: form.doencaCardioRespiratoria,
      doencaCardioRespiratoriaQual: form.doencaCardioRespiratoriaQual,
      doencaoTransmissivel: form.doencaoTransmissivel,
      doencaoTransmissivelQual: form.doencaoTransmissivelQual,
      diabetico: form.diabetico,
      hipertencaoArterial: form.hipertencaoArterial,
      hemorragico: form.hemorragico,
      cirurgia: form.cirurgia,
      cirurgiaQual: form.cirurgiaQual,
      informacaoAdicional: form.informacaoAdicional,
    }

    const preAvaliacao: PreAvaliacao = {
      id: form.preAvaliacaoID,
      corDentesIncomoda: form.corDentesIncomoda,
      formatoDentesIncomoda: form.formatoDentesIncomoda,
      fumante: form.fumante,
      umAnoTratamento: form.umAnoTratamento,
      escovaDuasVezesDia: form.escovaDuasVezesDia,
      usaFioDental: form.usaFioDental,
      queixa: form.queixa
    }

    const preAnamnese: PreAnamnese = {
      anamnese: anamnese,
      preAvaliacao: preAvaliacao
    }

    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${window.localStorage.getItem('authToken')}`
    })

    return this.http.put(API_URL + '/paciente/v1/pre/anamnese/'+window.localStorage.getItem('authCustomer')+'?pacienteId='+pacienteId, 
                         preAnamnese,
                        { headers: reqHeader, responseType: 'text'});

  }

}
