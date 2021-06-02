using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.BloodTypes;

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
        
        [HttpPost]
        public async Task<IActionResult> CreateBloodType(BloodType bloodType)
        {
            return Ok(await Mediator.Send(new Create.Command {BloodType = bloodType}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditBloodType(Guid id, BloodType bloodType)
        {
            bloodType.id = id;
            return Ok(await Mediator.Send(new Edit.Command{BloodType = bloodType}));
        }
         [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBloodType(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id =id}));
        }
    }
}