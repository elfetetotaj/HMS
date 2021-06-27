using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Cities;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class CitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetCity()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //cities/id
        public async Task<IActionResult> GetCity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateCity(City city)
        {
            return HandleResult(await Mediator.Send(new Create.Command {City = city}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCity(Guid id, City city)
        {
            city.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { City = city }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
       
}