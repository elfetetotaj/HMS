using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class DepartmentsController : BaseApiController
    {
        private readonly DataContext _context;
        public DepartmentsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Department>>> GetDepartments()
        {
           return await _context.Departments.ToListAsync();
        }

        [HttpGet("{id}")] //departments/id
        public async Task<ActionResult<Department>> GetDepartment(Guid id)
        {
            return await _context.Departments.FindAsync(id);
        }
    }
}