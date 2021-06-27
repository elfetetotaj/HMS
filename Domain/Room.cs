using System;

namespace Domain
{
    public class Room
    {
        public Guid Id { get; set; }
        public string type { get; set; }
        public int total_bed { get; set; }
        public int total_bed_occupied { get; set; }
        public string stauts { get; set; }
        public int floor_no { get; set; }
    }
}