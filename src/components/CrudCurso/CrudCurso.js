
import axios from 'axios';
import './CrudCurso.css';
import Main from '../template/Main';
import { useEffect, useState } from 'react';


const title ="Cadastro de Curso";

const urlAPI ="http://localhost:5278/api/Curso";

const initialState={
    curso:{id:0, nomeCurso:'',codCurso:0,periodo:''},
    lista:[]
}

export default function CrudCurso(){

const[curso ,setCurso] = useState(initialState.curso);
const[lista , setLista] = useState(initialState.lista);

useEffect(()=>{
    axios(urlAPI).then(resp =>{
        setLista({lista: resp.data})
    })
},  [curso])
   function limpar(){
        setCurso({curso : initialState.curso});
       }

      function salvar(){
        const curso = setCurso.curso;
        curso.codCurso = Number(curso.codCurso);
        const metodo = curso.id? 'put':'post';
        const url = curso.id ? `${urlAPI}/${curso.id}`: urlAPI;
     
        axios[metodo](url,curso)
        .then(resp =>{
            const lista = getListaAtualizada(resp.data)
          setCurso({curso:initialState.curso,lista})
        })     
    }
 function   getListaAtualizada(curso, add = true){
        const lista = setLista.lista.filter(a => a.id !== curso.id);
        if(add) lista.unshift(curso);
        return lista;
       }


    function   atualizaCampo(evento){
        const curso  = {...setCurso.curso};
    
        curso[evento.target.name]= evento.target.value;
    
        setCurso({curso});
       }


     function  carregar(curso) {
        setCurso({curso})
           const url = urlAPI + "/" + curso.id;
           if (window.confirm("Confirma alteração curso: " + curso.codCurso)) {
           console.log("entrou no confirm");
           axios['PUT'](url, curso)
           .then(resp => {
           const lista = getListaAtualizada(curso, false)
           setCurso({ curso: initialState.curso, lista })
       })
    
    }
    atualizaCampo(curso);
    }
 function remover(curso){
    const url = urlAPI + "/"+ curso.id;
    if(window.confirm("Confirma remoção do curso:" + curso.nomeCurso)){
        console.log("entrou no confirm");

        axios['delete'](url,curso)
        .then(resp =>{
            const lista = getListaAtualizada(curso,false)
            setCurso({curso:initialState.curso,lista})
        })
    }
  }
   const renderForm = () =>{
    return(
        <div  className="inclui-container">
          <label> Nome: </label>
          <input
           type ="text"
           id="nome"
            placeholder ="Nome do Curso"
            className ="form-input"
            name = "nome"
            value={setCurso.curso.nomeCurso}
            onChange={e =>atualizaCampo(e)}              
            />

           <label>Periodo:</label>
           <input
            type="text"
            id = "periodo"
            placeholder="Periodo do curso"
            className="form-input"
            name="periodo" 
            value={setCurso.curso.periodo}
            onChange={e => atualizaCampo(e)}
           />
           <label>Código do Curso</label>
           <input
             type= "number"
             id="codCurso"
             placeholder="0"
             className="form-input"
             name="codCurso"
             value={setCurso.curso.codCurso}
             onChange={e => atualizaCampo(e)}
             />
            <button className="btnSalvar"
            onClick={e => salvar(e)}
            >Salvar 
            </button>
            <button className="btnCancelar"
            onClick={e => limpar(e)}>
                Cancelar
            </button>
             </div>
    )
}
const renderTable =()  =>{
    return(
<div className="listagem">
   <table className="listaCurso"id ="tblListaCursos">
       <thead>
           <tr className="cabecTabela">
      <th className="tabTituloNome">Nome</th>
      <th className="tabTituloPeriodo">periodo</th>
      <th className="tabTituloCurso">Codigo Curso</th>                  
           </tr>
       </thead>
       <tbody>
         {setLista.lista.map(
             (curso) =>
             <tr key={curso.id}>
                 <td>{curso.nome}</td>
                 <td>{curso.periodo}</td>
                 <td>{curso.codCurso}</td>
                  <td>
                    <button onClick={() => carregar(curso)}>
                        Alterar
                    </button>
                  </td>
                  <td>
                    <button onClick={() =>remover(curso)}>
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
    return(
    <Main title={title}>
        {renderForm()}
       {renderTable()}
        </Main>
    )

} 
  
