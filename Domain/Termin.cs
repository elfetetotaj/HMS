using System;

namespace Domain
{
    public class Termin
    {
        public Guid Id { get; set; }
        public DateTime TerminTime { get; set; }
        public string TerminDescription { get; set; }
        public string TerminDepartment { get; set; }
        public string TerminDoctor { get; set; }
    }
}