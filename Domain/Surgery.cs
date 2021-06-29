using System;

namespace Domain
{
    public class Surgery
    {
        public Guid Id { get; set; }
        public string SurgeryName { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public double Pagesa { get; set; }
        public string Terapia { get; set; }
    }
}