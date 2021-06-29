using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Core;

namespace Application.TechEmployees
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public TechEmployee TechEmployee { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator(){
                RuleFor(x => x.TechEmployee).SetValidator(new TechEmployeeValidator());
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
                _context.TechEmployees.Add(request.TechEmployee);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to create TechEmployee");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}