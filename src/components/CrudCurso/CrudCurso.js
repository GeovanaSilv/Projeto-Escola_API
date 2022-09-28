import React, {Component} from "react";
import axios from 'axios';
import './CrudCurso.css';
import Main from '../template/Main';
import { resolveTo } from "react-router/lib/router";

const title ="Cadastro de Curso";

const urlAPI ="http://localhost:5278/api/Curso";

const initialState={
    curso:{nomeCurso:'',codCurso:0,periodo:''},
    lista:[]
}

export default function CrudCurso(){
state = {...initialState}
axios(urlAPI).then(resp =>{
    this.setState({lista:resp.data})
})
}
limpar();{
    this.setState({aluno : initialState.aluno});
}
salvar();{
    const  curso= this.state.curso;
    curso.codCurso = Number(curso.codCurso);
    const metodo = curso.id?'put':'post';
    const url = curso.id ? `${urlAPI}/${curso.id}`:urlAPI;

    axios[metodo](url,curso)
    .then(resp =>{
        const lista = this.getListaAtualizada(resp.data)
        this.setState({curso:initialState.curso,lista})
    })
}
getListaAtualizada(curso, add = true);{
     const lista = this.state.lista.filter(a =>a.id !== curso.id);
    if(add) lista.unshift(curso);
    return lista;
}
atualizaCampo(evento);{
    const curso = {...this.state.curso};
     curso[evento.target.name]= evento.target.value;
   
      this.setState({curso});
}
carregar(curso);{
    this.setState({curso})
    const url = urlAPI + "/" + curso.id;
    if(window.confirm("Confirma alteração "))
}
