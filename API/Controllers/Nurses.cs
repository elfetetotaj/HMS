using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

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
    }
}