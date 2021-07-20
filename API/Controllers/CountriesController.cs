using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Countries;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class CountriesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetCountry()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //countries/id
        public async Task<IActionResult> GetCountry(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateCountry(Country country)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Country = country}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCountry(Guid id, Country country)
        {
            country.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Country = country }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCountry(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
       
}