using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Farmacists
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Farmacist Farmacist { get; set; }
        }

            public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Farmacist).SetValidator(new FarmacistValidator());
              
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
                _context.Farmacists.Add(request.Farmacist);

              var result =  await _context.SaveChangesAsync() > 0;

              if(!result) return Result<Unit>.Failure("Faild to create Farmacist");

              return Result<Unit>.Success(Unit.Value);

                
            }
        }
    }
}