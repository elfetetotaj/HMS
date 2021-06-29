using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Surgeries;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class SurgeriesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetSurgery()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //surgeries/id
        public async Task<IActionResult> GetSurgery(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateSurgery(Surgery surgery)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Surgery = surgery}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditSurgery(Guid id, Surgery surgery)
        {
            surgery.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Surgery = surgery }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSurgery(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }

} 