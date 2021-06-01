using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class BloodTypesController : BaseApiController
    {
        private readonly DataContext _context;
        public BloodTypesController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<BloodType>>> GetBloodTypes()
        {
           return await _context.BloodTypes.ToListAsync();
        }

        [HttpGet("{id}")] //bloodtypes/id
        public async Task<ActionResult<BloodType>> GetBloodType(Guid id)
        {
            return await _context.BloodTypes.FindAsync(id);
        }
    }
}