using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.BloodTypes
{
    public class Details
    {
        public class Query : IRequest<Result<BloodType>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<BloodType>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<BloodType>> Handle(Query request, CancellationToken cancellationToken)
            {
                var bloodType =  await _context.BloodTypes.FindAsync(request.Id);
                
                return Result<BloodType>.Success(bloodType);
         
            }
        }
    }
}