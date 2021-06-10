using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.Nurses
{
    public class List
    {
        public class Query : IRequest<Result<List<Nurse>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Nurse>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Nurse>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Nurse>>.Success( await _context.Nurses.ToListAsync(cancellationToken));
            }
        }
    }
}