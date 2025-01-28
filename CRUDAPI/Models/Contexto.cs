using Microsoft.EntityFrameworkCore;

namespace CRUDAPI.Models
{
    public class Contexto : DbContext
    {
        public DbSet<Medico> Medicos {get; set;}

        public Contexto(DbContextOptions<Contexto> opcoes) : base(opcoes)
        {
        
        }

    }
}