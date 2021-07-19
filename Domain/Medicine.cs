using System;

namespace Domain
{
    public class Medicine
    {
        public Guid Id { get; set; }
        public string MedicineName { get; set; }
        public string MedicineDescription { get; set; }
        public string MedicineDepartment { get; set; }
        public int MedicinePrice { get; set; }
    }
}