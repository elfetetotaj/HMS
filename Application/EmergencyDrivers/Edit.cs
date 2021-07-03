using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.EmergencyDrivers
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public EmergencyDriver EmergencyDriver { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.EmergencyDriver).SetValidator(new EmergencyDriverValidator());
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
                var emergencyDriver = await _context.EmergencyDrivers.FindAsync(request.EmergencyDriver.Id);

                _mapper.Map(request.EmergencyDriver, emergencyDriver);

                var result = await _context.SaveChangesAsync()> 0 ;
                
                if(!result) return Result<Unit>.Failure("Failed to update emergencyDriver");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}