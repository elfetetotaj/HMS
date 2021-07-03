using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Rooms
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Room Room { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Room).SetValidator(new RoomValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var room = await _context.Rooms.FindAsync(request.Room.Id);

                _mapper.Map(request.Room, room);

                var result = await _context.SaveChangesAsync()> 0 ;
                
                if(!result) return Result<Unit>.Failure("Failed to update room");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}