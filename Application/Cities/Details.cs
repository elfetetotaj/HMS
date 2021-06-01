using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Cities
{
    public class Details
    {
        public class Query : IRequest<City>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, City>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<City> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Cities.FindAsync(request.Id);
            }
        }
    }
}