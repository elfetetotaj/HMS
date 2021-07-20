using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.Surgeries
{
    public class List
    {
        public class Query : IRequest<Result<List<Surgery>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Surgery>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Surgery>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Surgery>>.Success( await _context.Surgeries.ToListAsync(cancellationToken));
            }
        }
    }
}