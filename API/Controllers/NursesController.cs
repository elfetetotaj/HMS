using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Nurses;

namespace API.Controllers
{
    public class NursesController : BaseApiController
    {
        private readonly DataContext _context;
        public NursesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Nurse>>> GetNursess()
        {
           return await _context.Nurses.ToListAsync();
        }

        [HttpGet("{id}")] //nurses/id
        public async Task<ActionResult<Nurse>> GetNurse(Guid id)
        {
            return await _context.Nurses.FindAsync(id);
        }
          [HttpPost]
        public async Task<IActionResult> CreateNurse(Nurse nurse)
        {
            return Ok(await Mediator.Send(new Create.Command {Nurse = nurse}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditNurse(Guid id, Nurse nurse)
        {
            nurse.id=id;
            return Ok(await Mediator.Send(new Edit.Command{Nurse = nurse}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNurse(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}