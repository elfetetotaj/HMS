using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Receptionists
{
    public class Details
    {
        public class Query : IRequest<Receptionist>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Receptionist>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Receptionist> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Receptionists.FindAsync(request.Id);
            }
        }
    }
}