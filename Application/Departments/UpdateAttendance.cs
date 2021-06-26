using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Departments
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext context;
            private readonly IUserAccessor userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this.context = context;
                this.userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var department = await this.context.Departments
                    .Include(a => a.DepartmentAttendees).ThenInclude(u => u.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (department == null) return null;

                var user = await this.context.Users.FirstOrDefaultAsync( x =>
                    x.UserName == this.userAccessor.GetUsername());

                if (user == null) return null;

                var hostUsername = department.DepartmentAttendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                var attendance = department.DepartmentAttendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                // if (attendance != null && hostUsername == user.UserName)
                //     activity.IsCancelled = !activity.IsCancelled; //Video 14.9

                if (attendance != null && hostUsername != user.UserName)
                    department.DepartmentAttendees.Remove(attendance);

                if (attendance == null)
                {
                    attendance = new DepartmentAttendee
                    {
                        AppUser = user,
                        Department = department,
                        IsHost = false
                    };

                    department.DepartmentAttendees.Add(attendance);
                }

                var result = await this.context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problem updating attendance");
            }
        }
    }
}