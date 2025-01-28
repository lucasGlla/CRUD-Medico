using CRUDAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUDAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicoController : ControllerBase
    {
        private readonly Contexto _contexto;

        public MedicoController(Contexto contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Medico>>> TodosAsync(){
            return await _contexto.Medicos.ToListAsync();
        }

        [HttpGet("{medicoId}")]
        public async Task<ActionResult<Medico>> MedicoIdAsync(int medicoId){
            Medico medico = await _contexto.Medicos.FindAsync(medicoId);

            if(medico == null)
                return NotFound();

            return medico;
        }

        [HttpPost]
        public async Task<ActionResult<Medico>> SalvarMedicoAsync(Medico medico){
            await _contexto.Medicos.AddAsync(medico);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> AtualizarMedicoAsync (Medico medico){
            _contexto.Medicos.Update(medico);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{medicoId}")]
        public async Task<ActionResult> ExcluirMedicoAsync(int medicoId){
            Medico medico = await _contexto.Medicos.FindAsync(medicoId);
            if(medico == null)
                return NotFound();
                
            _contexto.Remove(medico);
            await _contexto.SaveChangesAsync();

            return Ok();
        }
    }


}