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

namespace Application.Medicines
{
    public class List
    {
        public class Query : IRequest<Result<List<Medicine>>> { }

        public class Handler : IRequestHandler<Query, Result<List<Medicine>>>
        {
            private readonly DataContext _context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                this.mapper = mapper;
            }

            public async Task<Result<List<Medicine>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var medicines = await _context.Medicines
                .ProjectTo<Medicine>(this.mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

                return Result<List<Medicine>>.Success(medicines);
            }
        }
    }
}