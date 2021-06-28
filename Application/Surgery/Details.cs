using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Surgeries
{
    public class Details
    {
        public class Query : IRequest<Result<Surgery>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Surgery>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Surgery>> Handle(Query request, CancellationToken cancellationToken)
            {
                var Surgery =  await _context.Surgeries.FindAsync(request.Id);
                
                return Result<Surgery>.Success(Surgery);
         
            }
        }
    }
}