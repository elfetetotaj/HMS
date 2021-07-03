using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Countries
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Country Country { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Country).SetValidator(new CountryValidator());
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
                var country = await _context.Countries.FindAsync(request.Country.Id);

                _mapper.Map(request.Country, country);

                var result = await _context.SaveChangesAsync()> 0 ;
                
                if(!result) return Result<Unit>.Failure("Failed to update country");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}