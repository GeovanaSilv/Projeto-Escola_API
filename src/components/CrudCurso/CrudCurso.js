import React, {Component} from "react";
import axios from 'axios';
import './CrudCurso.css';
import Main from '../template/Main';
//import { resolveTo } from "react-router/lib/router";

const title ="Cadastro de Curso";

const urlAPI ="http://localhost:5278/api/Curso";

const initialState={
    curso:{nomeCurso:'',codCurso:0,periodo:''},
    lista:[]
}

export default class CrudCurso extends Component{
state = {...initialState}
componentDidMount(){
axios(urlAPI).then(resp =>{
    this.setState({lista:resp.data})
})
}
limpar(){
    this.setState({aluno : initialState.aluno});
}
salvar(){
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
getListaAtualizada(curso, add = true){
     const lista = this.state.lista.filter(a =>a.id !== curso.id);
    if(add) lista.unshift(curso);
    return lista;
}
atualizaCampo(evento){
    const curso = {...this.state.curso};
     curso[evento.target.name]= evento.target.value;
   
    this.setState({curso});
}
carregar(curso){
    this.setState({curso})
    const url = urlAPI + "/" + curso.id;
    if(window.confirm("Confirma alteração "+curso.id));
    axios['PUT'](url,curso)
    .then(resp =>{
        const lista = this.getListaAtualizada(curso,false)
        this.setState({curso:initialState.curso,lista})
    })
}
remover(curso){
    const url = urlAPI + "/"+curso.id;
    if(window.confirm("Confirma remoção do curso:"+curso.codCurso)){
        console.log("entrou no confirm");

        axios['delete'](url,curso)
        .then(resp=>{
            const lista = this.getListaAtualizada(curso,false)
            this.setState({curso:initialState.curso,lista})
        })
    }
}
renderForm(){
    return(
       <div  className="inclui-container">
        

           <label>Nome:</label>
           <input
            type="text"
            id = "nomeCurso"
            placeholder="Nome do curso"
            className="form-input"
            name="nome" 
            value={this.state.curso.nomeCurso}
            onChange={e => this.atualizaCampo(e)}
           />
             <label>Periodo:</label>
           <input
            type="text"
            id = "periodo"
            placeholder="Periodo co Curso"
            className="form-input"
            name="nome" 
            value={this.state.curso.periodo}
            onChange={e => this.atualizaCampo(e)}
           />
           <label>Código do Curso</label>
           <input
             type= "number"
             id="codCurso"
             placeholder="0"
             className="form-input"
             name="codCurso"
             value={this.state.curso.codCurso}
             onChange={e => this.atualizaCampo(e)}
             />
            <button className="btnSalvar"
            onClick={e => this.salvar(e)}
            >Salvar 
            </button>
            <button className="btnCancelar"
            onClick={e => this.limpar(e)}>
                Cancelar
            </button>
             </div>
    )
}
renderTable(){
    return(
<div className="listagem">
   <table className="listaCursos"id ="tblListaCursos">
       <thead>
           <tr className="cabecTabela">
      <th className="tabTituloNome">Nome</th>
      <th className="tabTituloCurso">periodo</th>    
      <th className="tabTituloCurso">codCurso</th>    
           </tr>
       </thead>
       <tbody>
         {this.state.lista.map(
             (curso) =>
             <tr key={curso.id}>
                 <td>{curso.nomeCurso}</td>
                 <td>{curso.periodo}</td>
                 <td>{curso.codCurso}</td>
                  <td>
                    <button onClick={() => this.carregar(curso)}>
                        Alterar
                    </button>
                  </td>
                  <td>
                    <button onClick={() =>this.remover(curso)}>
                        Remover
                    </button>
                  </td>

             </tr>
           )}
       </tbody>
     </table> 
    </div>
    )
}
render(){
    return(
    <Main title={title}>
        {this.renderForm()}
       {this.renderTable()}
        </Main>
    )
}

}
