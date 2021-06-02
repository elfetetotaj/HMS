using System;

namespace Domain
{
    public class Receptionist
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string lastName { get; set; } 
        public string username { get; set; } 
        public string password { get; set; } 
        public string email { get; set; } 
        public DateTime dob { get; set; }
        public char gender { get; set; }
        public string street_address { get; set; }
        public string city { get; set; }
        public string country { get; set; }
        public string postal_code { get; set; }
        public string phone { get; set; }
        public string Department { get; set; }
    }
}