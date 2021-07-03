using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Rooms
{
    public class List
    {
        public class Query : IRequest<Result<List<Room>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Room>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<Room>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Room>>.Success(await _context.Rooms.ToListAsync(cancellationToken));
            }
        }
    }
}