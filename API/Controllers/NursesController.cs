using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Application.Nurses;
using MediatR;

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
        public async Task<IActionResult> GetNursess()
        {
           return HandleResult( await Mediator.Send(new List.Query()) );
        }

        [HttpGet("{id}")] //nurses/id
        public async Task<IActionResult> GetNurse(Guid id)
        {
          var result =  await Mediator.Send(new Details.Query{Id = id });

          return HandleResult(result);

        
         

        }
          [HttpPost]
        public async Task<IActionResult> CreateNurse(Nurse nurse)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Nurse = nurse}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditNurse(Guid id, Nurse nurse)
        {
            nurse.id=id;
            return HandleResult(await Mediator.Send(new Edit.Command{Nurse = nurse}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNurse(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}