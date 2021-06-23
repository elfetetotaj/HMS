using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Departments
{
    public class List
    {
        public class Query : IRequest<Result<List<Department>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Department>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Department>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Department>>.Success(await _context.Departments.ToListAsync(cancellationToken));
            }
        }
    }
}