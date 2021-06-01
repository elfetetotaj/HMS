using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class DoctorInfoController
    {
       private readonly DataContext _context;

        public DoctorInfoController(DataContext context)
        {
            _context = context;

         }

        [HttpGet]
        public async Task<ActionResult<List<Doctor>>> GetDoctors()
        {
            return await _context.DoctorInfo.ToListAsync();

        }
        [HttpGet("{id}")]

        public async Task<ActionResult<Doctor>> GetPatient(Guid id)
        {
            return await _context.DoctorInfo.FindAsync(id);
        }
       
        
    }
}