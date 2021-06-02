using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Receptionists
{
    public class List
    {
        public class Query : IRequest<List<Receptionist>> { }

        public class Handler : IRequestHandler<Query, List<Receptionist>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Receptionist>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Receptionists.ToListAsync(cancellationToken);
            }
        }
    }
}