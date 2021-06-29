using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.Therapies
{
    public class List
    {
        public class Query : IRequest<Result<List<Therapy>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Therapy>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Therapy>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Therapy>>.Success( await _context.Therapies.ToListAsync(cancellationToken));
            }
        }
    }
}