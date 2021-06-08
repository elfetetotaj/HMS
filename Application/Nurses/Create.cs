using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Nurses
{
    public class Create
    {
        public class Command : IRequest
        {
            public Nurse Nurse { get; set; }
        }

        public class CommandValidator : AbstractValidator<Nurse>
        {
            public CommandValidator()
            {
                RuleFor(x => x.emri).NotEmpty();
               
            }
        }

        
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Nurses.Add(request.Nurse);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}