using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.BloodTypes
{
    public class List
    {
        public class Query : IRequest<Result<List<BloodType>>> { }

        public class Handler : IRequestHandler<Query, Result<List<BloodType>>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<BloodType>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<BloodType>>.Success( await _context.BloodTypes.ToListAsync(cancellationToken));
            }
        }
    }
}