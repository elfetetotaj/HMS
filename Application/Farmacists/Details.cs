using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Farmacists
{
    public class Details
    {
        public class Query : IRequest<Result<Farmacist>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Farmacist>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Farmacist>> Handle(Query request, CancellationToken cancellationToken)
            {
                var farmacist =  await _context.Farmacists.FindAsync(request.Id);
                
                return Result<Farmacist>.Success(farmacist);
         
            }
        }
    }
}