import React from "react";
import {Routes,Route} from "react-router-dom";
import Main from './components/template/Main';
import CrudAluno from "./components/CrudAluno/CrudAluno";

export default function Rotas(){
    return(
        <Routes>
            <Route exact path= '/'
            element={
           <Main title="Bem Vindo!">
               <div>Cadastro de Alunos,cursos e carômetro</div>
           </Main>
            }
            />
            <Route path='/alunos' element={<CrudAluno/>}/>
            <Route path ='*' element={
                <Main title="Cadastro de Alunos!">
                    <div>Pagina em construção</div>
                </Main>}
                 />
         <Route path ='/carometro' element={
           <Main title="Carometro">
               <div>Pagina em Andamento</div>
           </Main>
         }/>
         
        </Routes>
    )
}