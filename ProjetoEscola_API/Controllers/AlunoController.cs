using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjetoEscola_API.Data;
using ProjetoEscola_API.Models;

namespace ProjetoEscola_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController] 
    public class AlunoController : Controller
    {
        private readonly EscolaContext _context;
      
        public AlunoController(EscolaContext context){
            _context =context;

        }
        [HttpGet]
        public ActionResult<List<Aluno>> GetAll(){
            return _context.Aluno.ToList();
        }
        [HttpGet("{AlunoId}")]
        public ActionResult<List<Aluno>> Get (int AlunoId){
            try{
                var result = _context.Aluno.Find(AlunoId);
                if(result ==null){
                    return NotFound();
                }
                return Ok(result);
            }
            catch{
                return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados");
            }
        }
       [HttpPost]
       public async  Task<ActionResult> post(Aluno model){
         try{
            _context.Aluno.Add(model);
            if(await _context.SaveChangesAsync()==1)
          {
             //return Ok();
              return Created($"/api/aluno/{model.ra}",model);
              
         } 
     }
    catch{
        return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados");
    }
    return BadRequest();  
       }



       [HttpPut("{AlunoId}")]
       public async Task <ActionResult> put (int  AlunoId, Aluno dadosAlunoAlt)
       {
        try{
            var result = await _context.Aluno.FindAsync(AlunoId);
            if(AlunoId != result.id)
            {
                 return BadRequest();
            }
            result.ra = dadosAlunoAlt.ra;
            result.nome = dadosAlunoAlt.nome;
            result.codCurso = dadosAlunoAlt.codCurso;
            await _context.SaveChangesAsync();
            return Created($"api/aluno/{dadosAlunoAlt.ra}",dadosAlunoAlt);
        }
        catch{
          return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados.");
        }

        return Ok();
       }


       [HttpDelete("{AlunoRa}")]
       public async Task <ActionResult> delete(string AlunoId){
        try{
            var aluno = await _context.Aluno.FindAsync(AlunoId);
            if(aluno==null){
                return NotFound();
            }
            _context.Remove(aluno);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        catch{
            return this.StatusCode(StatusCodes.Status500InternalServerError,"Falha no acesso ao banco de dados");
        }
       }    
    }

}