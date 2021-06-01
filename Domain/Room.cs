using System;

namespace Domain
{
    public class Room
    {
        public Guid Id { get; set; }
        public string r_type { get; set; }
        public int tot_bed { get; set; }
        public int tot_bed_occupied { get; set; }
        public string stauts { get; set; }
        public int floor_no { get; set; }
    }
}