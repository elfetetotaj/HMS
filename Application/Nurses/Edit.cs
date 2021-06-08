using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Nurses
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Nurse Nurse { get; set; }
        }
                public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Nurse).SetValidator(new NurseValidator());
        

               
            }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var nurse = await _context.Nurses.FindAsync(request.Nurse.id);

                _mapper.Map(request.Nurse, nurse);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}