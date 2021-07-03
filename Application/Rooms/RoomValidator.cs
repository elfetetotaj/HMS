using Domain;
using FluentValidation;

namespace Application.Rooms
{
    public class RoomValidator : AbstractValidator<Room>
    {
        public RoomValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.type).NotEmpty();
            RuleFor(x => x.total_bed).NotEmpty();
            RuleFor(x => x.total_bed_occupied).NotEmpty();
            RuleFor(x => x.stauts).NotEmpty();
            RuleFor(x => x.floor_no).NotEmpty();
           
        }
    }
}