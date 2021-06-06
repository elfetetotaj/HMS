using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Nurses
{
    public class Details
    {
        public class Query : IRequest<Nurse>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Nurse>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Nurse> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Nurses.FindAsync(request.Id);
            }
        }
    }
}