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

export default function CrudCurso(props){

const[curso ,setCurso] = useState(initialState.curso);
const[lista , setLista] = useState(initialState.lista);


useEffect(()=>{
    
    axios(urlAPI).then(resp =>{
        setLista(resp.data)
      
    })
},[curso])


   function limpar (){
        setCurso({curso : initialState.curso});
       }

       const  atualizaCampo = evento=>{
        const  {name,value} = evento.target

        setCurso({...curso,
            [name]:value
        })
      
       }
    function salvar (){
        const metodo = curso.id? 'put':'post';
        const url = curso.id ? `${urlAPI}/${curso.id}`: urlAPI
        curso.codCurso = Number(curso.codCurso);
     console.log(curso)
        axios[metodo](url,curso)
        .then((resp) =>{
            const lista = getListaAtualizada(resp.data)
          setCurso(initialState.curso)
          setLista(lista)
        })     
    }

function  getListaAtualizada  (curso, add = true) {
      const   listas = lista.filter(a => a.id !== curso.id);
        if(add) listas.unshift(curso);
        return listas;
       }

     const  carregar= (curso)=>{
       setCurso(curso)
       
    }
    
 function remover  (curso) {
    const url = urlAPI + "/"+ curso.id;
    if(window.confirm("Confirma remoção do curso:" + curso.nomeCurso)){
        console.log("entrou no confirm");

        axios['delete'](url,curso)
        .then(resp =>{
            const lista = getListaAtualizada(curso,false)
            setCurso(initialState.curso)
            setLista(lista)
        })
    }
  }
   const renderForm = () =>{
    return(
        <div  className="inclui-container">
          <label> Nome: </label>
          <input
           type ="text"
           id="nomeCurso"
            placeholder ="Nome do Curso"
            className ="form-input"
            name = "nomeCurso"
            value={curso.nomeCurso}
            onChange={e =>atualizaCampo(e)}              
            />

           <label>Periodo:</label>
           <input
            type="text"
            id = "periodo"
            placeholder="Periodo do curso"
            className="form-input"
            name="periodo" 
            value={curso.periodo}
            onChange={e => atualizaCampo(e)}
           />
           <label>Código do Curso</label>
           <input
             type= "number"
             id="codCurso"
             placeholder="0"
             className="form-input"
             name="codCurso"
             value={curso.codCurso}
             onChange={e => atualizaCampo(e)}
             />
            <button className="BtnSalvar"
            onClick={e => salvar(e)}
            >Salvar 
            </button>
            <button className="BtnCancelar"
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
         {lista.map(
             (curso) =>
             <tr key={curso.id}>
                 <td>{curso.nomeCurso}</td>
                 <td>{curso.periodo}</td>
                 <td>{curso.codCurso}</td>
                  <td>
                    <button className='btnAlterar' onClick={() => carregar(curso)}>
                        Alterar
                    </button>
                  </td>
                  <td>
                    <button  className = 'btnRemover' onClick={() =>remover(curso)}>
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