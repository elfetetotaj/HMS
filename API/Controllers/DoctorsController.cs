using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class DoctorsController
    {
       private readonly DataContext _context;

        public DoctorsController(DataContext context)
        {
            _context = context;

         }

        [HttpGet]
        public async Task<ActionResult<List<Doctor>>> GetDoctors()
        {
            return await _context.Doctors.ToListAsync();

        }
        [HttpGet("{id}")]

        public async Task<ActionResult<Doctor>> GetDoctor(Guid id)
        {
            return await _context.Doctors.FindAsync(id);
        }
       
        
    }
}