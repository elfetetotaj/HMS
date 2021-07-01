using System;
using System.Collections.Generic;

namespace Domain
{
    public class Department
    {
        public Guid Id { get; set; }
        public string DepartmentName { get; set; }
        public string DepartmentDescription { get; set; }
        public ICollection<DepartmentAttendee> DepartmentAttendees { get; set; } = new List<DepartmentAttendee>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}