import React, {Component} from "react";
import axios from 'axios';
import './CrudCarometro.css';
import Main from '../template/Main';

import { useEffect, useState } from 'react';

const title ="Carometro";

const urlAPI = "http://localhost:5278/api/Aluno";
const urlAPICurso = "http://localhost:5278/api/Curso";



const initialState ={
    aluno: {id:0,ra:'',nome:'',codCurso:0},
    lista:[],
    listaCurso:[]
         
}
export default class CrudCarometro extends Component{
    state = {...initialState}
    componentDidMount(){
     axios(urlAPI).then(resp =>{
         this.setState({lista: resp.data})
     })
     axios(urlAPICurso).then(resp=>{
            this.setState({listaCurso:resp.data})
     })
    }
        //PARA ALUNOS 
    getListaAtualizadaAluno(aluno, add = true, ){
        const lista = this.state.lista.filter(a => a.id !== aluno.id);
        if(add) lista.unshift(aluno);
        return lista;
       }

       //PARA ALUNOS E CURSOS 
       atualizaCampo(evento){
        const aluno  = {...this.state.aluno};
        const curso ={...this.state.curso};
        curso[evento.target.name]= evento.target.value;
        aluno[evento.target.name]= evento.target.value;
        this.setState({curso});
        this.setState({aluno});
       }
      
    
       renderForm(){
        return(
            <div  className="select ">
               <label>Selecione um curso</label>
                < select name = "codCurso" onChange={e=>{this.getListaAtualizadaAluno(e)}}>
                    {this.state.listaCurso.map((curso)=>
                   
               <option name = "codCurso"
                   value={curso.codCurso}
               >
                {curso.nomeCurso}
                </option> 
                    )}
                 </select>        
                </div>
        )}
        renderCards(){
         return(
          <div className="cards">
            {this.state.lista.map((aluno)=>{
                <card  className= "card1 "sx={{ minWidth:275}}>
           <label>dgfgfgfgfgfg</label>
                    <span>RA:{this.state.aluno.ra}</span>
                         </card>
         
            })}
     
  <br></br>
         <card  className= "card2" sx={{ minWidth:275}}>
            <img  className  =" img"src="https://cdn.vectorstock.com/i/1000x1000/35/12/bearded-happy-man-shows-thumb-up-gesture-cool-vector-33803512.webp"/>
        
    </card>


          </div>
         )}


        render(){
            return(
            <Main title={title}>
                {this.renderForm()}
                {this.renderCards()}
                </Main>
            )
        }

}
