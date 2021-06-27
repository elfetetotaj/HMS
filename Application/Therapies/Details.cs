using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Therapies
{
    public class Details
    {
        public class Query : IRequest<Result<Therapy>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Therapy>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Therapy>> Handle(Query request, CancellationToken cancellationToken)
            {
                var Therapy =  await _context.Therapies.FindAsync(request.Id);
                
                return Result<Therapy>.Success(Therapy);
         
            }
        }
    }
}