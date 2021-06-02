using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.BloodTypes
{
    public class Details
    {
        public class Query : IRequest<BloodType>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, BloodType>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<BloodType> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.BloodTypes.FindAsync(request.Id);
            }
        }
    }
}