import React, { Component } from "react";
import axios from 'axios';
import './CrudCarometro.css';
import Main from '../template/Main';

const title = "Carometro";

const urlAPI = "http://localhost:5278/api/Aluno";
const urlAPICurso = "http://localhost:5278/api/Curso";

const initialState = {
    aluno: { id: 0, ra: '', nome: '', codCurso: 0 },
    curso:{id:0, nomeCurso:'',codCurso:0,periodo:''},
    lista: [],
    listaCarometro: [],
    listaCurso: []
}
export default class CrudCarometro extends Component {
    state = { ...initialState }

    componentDidMount() {
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
        })
        axios(urlAPICurso).then(resp => {
            this.setState({ listaCurso: resp.data })
        })
    }

    //PARA ALUNOS 
    getListaAtualizadaAluno(event) {
        const codCurso = event.target.value
        const lista = this.state.lista.filter(a => a.codCurso == codCurso);
        //  if(add) lista.unshift(aluno);
        this.setState({ listaCarometro: lista });
        this.setState({aluno: this.state.aluno})
        this.setState({curso: this.state.curso})
        //return lista;
    }

    //PARA ALUNOS E CURSOS 
    atualizaCampo(evento) {
        const aluno = { ...this.state.aluno };
        const curso = { ...this.state.curso };
        curso[evento.target.name] = evento.target.value;
        aluno[evento.target.name] = evento.target.value;
        this.setState({ curso });
        this.setState({ aluno });
    }
     aleatorio(){
      const  img =["0","1"]
        img[0] = "https://cdn.vectorstock.com/i/1000x1000/35/12/bearded-happy-man-shows-thumb-up-gesture-cool-vector-33803512.webp" 
        img[1] = "https://thumbs.dreamstime.com/b/vetor-feliz-preto-do-%C3%ADcone-das-meninas-ilustra%C3%A7%C3%A3o-do-%C3%ADcone-da-mulher-72080931.jpg" 
    
        var mudar = Math.floor(Math.random()*img.length)
        return img[mudar]
     }

    renderForm() {
        return (
            <div className="select ">
                <label>Selecione um curso</label>
               < select name="codCurso" value ={this.state.codCurso} onChange={e => { this.getListaAtualizadaAluno(e) }}>
                        <option value="" >
                            Escolha um curso 
                            </option>                
                    {this.state.listaCurso.map((curso) =>

                        <option name="codCurso"
                            value={curso.codCurso}
                        >
                            {curso.nomeCurso}
                        </option> 
                    )}
                </select>
            </div>
        )
    }
    renderCards() {
        return (
          
                <div className="card2">
                
               {this.state.listaCarometro.map((aluno) => 
                  <div key={aluno.id}className="cardInfo"  sx={{ minWidth: 300 }}>
                    <img className  = "img"src={this.aleatorio()}/>
                  <span>RA:   {aluno.ra}</span>
                  <span>Nome : {aluno.nome}</span>
                 <span>Curso : {aluno.codCurso}</span>
               
              </div >
                )}  
                </div>
            

        
        )
    }


    render() {
        return (
            <Main title={title}>
                {this.renderForm()}
                {this.renderCards()}
            </Main>
        )
    }

}
