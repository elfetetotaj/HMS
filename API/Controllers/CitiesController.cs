using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System;

namespace API.Controllers
{
    public class CitiesController : BaseApiController
    {
        private readonly DataContext _context;

        public CitiesController(DataContext context)
        {
            _context = context;

         }

        [HttpGet]
        public async Task<ActionResult<List<City>>> GetCities()
        {
            return await _context.Cities.ToListAsync();

        }
        [HttpGet("{id}")]//cities/id

        public async Task<ActionResult<City>> GetCity(Guid id)
        {
            return await _context.Cities.FindAsync(id);
        }
    }
       
}