using System;
using System.Threading.Tasks;
using Application.Rooms;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class RoomsController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetRooms()
        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }

        [HttpGet("{id}")] 
        public async Task<IActionResult> GetRoom(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateRoom(Room room)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Room = room}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditRoom(Guid id, Room room)
        {
            room.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Room = room}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }//
}