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

namespace Application.Departments
{
    public class List
    {
        public class Query : IRequest<Result<List<DepartmentDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<DepartmentDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                this.mapper = mapper;
            }

            public async Task<Result<List<DepartmentDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var departments = await _context.Departments
                .ProjectTo<DepartmentDto>(this.mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

                return Result<List<DepartmentDto>>.Success(departments);
            }
        }
    }
}