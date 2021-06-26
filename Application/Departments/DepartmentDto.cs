using System;
using System.Collections.Generic;
using Application.Profiles;

namespace Application.Departments
{
    public class DepartmentDto
    {
        public Guid Id { get; set; }
        public string DepartmentName { get; set; }
        public string DepartmentDescription { get; set; }
        public string HostUsername { get; set; }
        public ICollection<Profile> DepartmentAttendees { get; set; }
    }
}