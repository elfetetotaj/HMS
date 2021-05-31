using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class RoomInfoController
    {
       private readonly DataContext _context;
        public RoomInfoController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Room>>> GetRooms()
        {
            return await _context.RoomInfo.ToListAsync();

        }
        [HttpGet("{id}")]

        public async Task<ActionResult<Room>> GetRoom(Guid id)
        {
            return await _context.RoomInfo.FindAsync(id);
        }
    }
}