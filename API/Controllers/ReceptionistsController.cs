using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System;

namespace API.Controllers
{
    public class ReceptionistsController : BaseApiController
    {
        private readonly DataContext _context;

        public ReceptionistsController(DataContext context)
        {
            _context = context;

         }

        [HttpGet]
        public async Task<ActionResult<List<Receptionist>>> GetReceptionists()
        {
            return await _context.Receptionists.ToListAsync();

        }
        [HttpGet("{id}")]//cities/id

        public async Task<ActionResult<Receptionist>> GetReceptionist(Guid id)
        {
            return await _context.Receptionists.FindAsync(id);
        }
    }
       
}