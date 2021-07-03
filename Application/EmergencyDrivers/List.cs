using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.EmergencyDrivers
{
    public class List
    {
        public class Query : IRequest<Result<List<EmergencyDriver>>> { }

        public class Handler : IRequestHandler<Query, Result<List<EmergencyDriver>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<EmergencyDriver>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<EmergencyDriver>>.Success(await _context.EmergencyDrivers.ToListAsync(cancellationToken));
            }
        }//
    }
}