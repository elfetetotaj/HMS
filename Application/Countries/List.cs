using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Countries
{
    public class List
    {
        public class Query : IRequest<Result<List<Country>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Country>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Country>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Country>>.Success(await _context.Countries.ToListAsync(cancellationToken));
            }
        }//
    }
}