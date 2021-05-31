using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.PatientInfo
{
    public class Details
    {
        public class Query : IRequest<Patient>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Patient>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Patient> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.PatientInfo.FindAsync(request.Id);
            }
        }
    }
}