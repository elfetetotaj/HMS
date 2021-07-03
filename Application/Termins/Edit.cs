using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Termins
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Termin Termin { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Termin).SetValidator(new TerminValidator());
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
                var termin = await _context.Termins.FindAsync(request.Termin.Id);

                if (termin == null) return null;

                _mapper.Map(request.Termin, termin);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to update termin");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}