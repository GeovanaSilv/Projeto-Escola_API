import React, { Component } from "react";
import axios from 'axios';
import './CrudCarometro.css';
import Main from '../template/Main';

const title = "Carometro";

const urlAPI = "http://localhost:5278/api/Aluno";
const urlAPICurso = "http://localhost:5278/api/Curso";

const initialState = {
    aluno: { id: 0, ra: '', nome: '', codCurso: 0 },
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
        const lista = this.state.lista.filter(a => a.codCurso !== codCurso);
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


    renderForm() {
        return (
            <div className="select ">
                <label>Selecione um curso</label>
                < select name="codCurso" onChange={e => { this.getListaAtualizadaAluno(e) }}>
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
            <div className="cards">
                {console.log(this.state.listaCarometro)}
                {this.state.listaCarometro.map((aluno) => {
                    { console.log(aluno.id+' '+aluno) }
                   /*    <div key={aluno.id} className="card draw-border">
                    <img  className="card__image" src={`https://avatars.dicebear.com/api/big-smile/a.svg`} alt={`Avatar de `+ aluno.nome}/>
                    <span className="card-title">{aluno.nome}</span>
                    <span className="card-description">RA: {aluno.ra} | Curso: {aluno.codCurso}</span>
                </div>*/
                    <div className="card2" key={aluno.id} sx={{ minWidth: 275 }}>
                        <span>Aqui</span>
                        <img className="img" src="https://cdn.vectorstock.com/i/1000x1000/35/12/bearded-happy-man-shows-thumb-up-gesture-cool-vector-33803512.webp" />
                        <label>{aluno.ra}</label>
                    </div >
                })}
                <div className="card2">
                        {this.state.listaCarometro.map((aluno)=>{
                         
                        })}
           
 

                </div>
                <br />

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
