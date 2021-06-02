using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Departments
{
    public class Details
    {
        public class Query : IRequest<Department>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Department>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Department> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Departments.FindAsync(request.Id);
            }
        }
    }
}