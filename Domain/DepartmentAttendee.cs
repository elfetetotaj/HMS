using System;

namespace Domain
{
    public class DepartmentAttendee
    {
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Guid DepartmentId { get; set; }
        public Department Department { get; set; }
        public bool IsHost { get; set; }
    }
}