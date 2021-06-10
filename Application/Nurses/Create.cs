using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Nurses
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
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
        public class Handler : IRequestHandler<Command  , Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Nurses.Add(request.Nurse);

              var result =  await _context.SaveChangesAsync() > 0;

              if(!result) return Result<Unit>.Failure("Faild to create nurse");

              return Result<Unit>.Success(Unit.Value);

                
            }
        }
    }
}