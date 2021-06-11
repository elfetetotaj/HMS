using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Receptionists
{
    public class List
    {
        public class Query : IRequest<Result<List<Receptionist>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Receptionist>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Receptionist>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Receptionist>>.Succsess(await _context.Receptionists.ToListAsync());
            }
        }
    }
}