using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Medicines
{
    public class Details
    {
        public class Query : IRequest<Result<Medicine>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Medicine>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Medicine>> Handle(Query request, CancellationToken cancellationToken)
            {
                var medicine = await _context.Medicines.FindAsync(request.Id);

                return Result<Medicine>.Success(medicine);
            }
        }
    }
}