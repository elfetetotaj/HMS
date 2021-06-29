using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.TechEmployees
{
    public class List
    {
        public class Query : IRequest<Result<List<TechEmployee>>> { }

        public class Handler : IRequestHandler<Query, Result<List<TechEmployee>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<TechEmployee>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<TechEmployee>>.Success( await _context.TechEmployees.ToListAsync(cancellationToken));
            }
        }
    }
}