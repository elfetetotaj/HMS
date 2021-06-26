using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.Farmacists
{
    public class List
    {
        public class Query : IRequest<Result<List<Farmacist>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Farmacist>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Farmacist>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Farmacist>>.Success( await _context.Farmacists.ToListAsync(cancellationToken));
            }
        }
    }
}