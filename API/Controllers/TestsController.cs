using System;
using System.Threading.Tasks;
using Application.Tests;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class TestsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetTests()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] //Tests/id
        public async Task<IActionResult> GetTest(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTest(Test test)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Test = test}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditTest(Guid id, Test test)
        {
            test.id = id;
            return HandleResult(await Mediator.Send(new Edit.Command{Test = test}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTest(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}