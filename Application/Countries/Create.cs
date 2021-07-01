using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Countries
{
    public class Create
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
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => 
                    x.UserName == this.userAccessor.GetUsername());

                // var countryAttendee = new CountryAttendee
                // {
                //     AppUser = user,
                //     Country = request.Country,
                //     IsHost = true
                // };

                // request.Country.CountryAttendees.Add(countryAttendee);

                _context.Countries.Add(request.Country);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create country");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}