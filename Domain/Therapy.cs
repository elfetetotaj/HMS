using System;

namespace Domain
{
    public class Therapy
    {
        public Guid id { get; set; }
        public string Pershkrimi { get; set; }
        public string TherapyName { get; set; }
        public string Doctor { get; set; }
        public string Patient { get; set; }
    }
}