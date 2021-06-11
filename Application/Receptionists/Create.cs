using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Core;

namespace Application.Receptionists
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Receptionist Receptionist { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator(){
                RuleFor(x => x.Receptionist).SetValidator(new ReceptionistValidator());
            }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Receptionists.Add(request.Receptionist);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failture("Failed to create receptionist");

                return Result<Unit>.Succsess(Unit.Value);
            }
        }
    }
}