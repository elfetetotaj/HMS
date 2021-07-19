using System.Collections.Generic;
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
    public class List
    {
        public class Query : IRequest<Result<List<City>>> { }

        public class Handler : IRequestHandler<Query, Result<List<City>>>
        {
            private readonly DataContext _context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                this.mapper = mapper;
            }

            public async Task<Result<List<City>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var cities = await _context.Cities
                .ProjectTo<City>(this.mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

                return Result<List<City>>.Success(cities);
            }
        }
    }
} 