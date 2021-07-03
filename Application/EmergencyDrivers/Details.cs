using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.EmergencyDrivers
{
    public class Details
    {
        public class Query : IRequest<Result<EmergencyDriver>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<EmergencyDriver>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<EmergencyDriver>> Handle(Query request, CancellationToken cancellationToken)
            {
                var emergencyDriver = await _context.EmergencyDrivers.FindAsync(request.Id);

                return Result<EmergencyDriver>.Success(emergencyDriver);
            }
        }
    }
}