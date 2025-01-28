using Microsoft.EntityFrameworkCore;

namespace CRUDAPI.Models
{
    public class Contexto : DbContext
    {
        public DbSet<Medico> Medicos {get; set;}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
          optionsBuilder.UseSqlite("Data Source=medico.sqlit");
          base.OnConfiguring(optionsBuilder);
        }

    }
}