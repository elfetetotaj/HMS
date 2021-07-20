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

namespace Application.Cities
{
    public class Details
    {
        public class Query : IRequest<Result<City>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<City>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<City>> Handle(Query request, CancellationToken cancellationToken)
            {
                var city = await _context.Cities.FindAsync(request.Id);

                return Result<City>.Success(city);
            }
        }
    }
} 