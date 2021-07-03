using System;
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
        public async Task<IActionResult> GetCountries()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //Countries/id
        public async Task<IActionResult> GetCountry(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateCountry(Country countries)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Country = countries}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditCountry(Guid id, Country countries)
        {
            countries.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Country = countries}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCountry(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }//
}