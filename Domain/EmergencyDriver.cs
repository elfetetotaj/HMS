using System;

namespace Domain
{
    public class EmergencyDriver
    {
         public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; } 
        public string Username { get; set; } 
        public string Password { get; set; } 
        public DateTime Dateofbirth { get; set; }
        public string Gender { get; set; }
        public string Street_address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Postal_code { get; set; }
        public string Phone { get; set; }
        public string Department {get; set;}
    }
}