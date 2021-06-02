using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Departments
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Department Department { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var department = await _context.Departments.FindAsync(request.Department.Id);

                _mapper.Map(request.Department, department);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}