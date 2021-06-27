using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Therapies;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class TherapiesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetTherapy()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //therapies/id
        public async Task<IActionResult> GetTherapy(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTherapy(Therapy therapy)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Therapy = therapy}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTherapy(Guid id, Therapy therapy)
        {
            therapy.id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Therapy = therapy }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTherapy(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
       
}