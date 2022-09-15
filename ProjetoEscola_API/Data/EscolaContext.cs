using Microsoft.EntityFrameworkCore;
using ProjetoEscola_API.Models;
using System.Diagnostics.CodeAnalysis;


namespace ProjetoEscola_API.Data
{
    public class EscolaContext:DbContext
    {
        public EscolaContext(DbContextOptions<EscolaContext>options):base(options)
        {

        }
        public DbSet<Aluno> Aluno{get; set;}
    }
}