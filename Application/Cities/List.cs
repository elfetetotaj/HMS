using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Cities
{
    public class List
    {
        public class Query : IRequest<Result<List<City>>> { }

        public class Handler : IRequestHandler<Query, Result<List<City>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<City>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<City>>.Success( await _context.Cities.ToListAsync(cancellationToken));
            }
        }
    }
}