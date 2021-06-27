using System;

namespace Domain
{
    public class Doctor
    {
        public Guid id { get; set; }
        public string name { get; set; }
        public string surname { get; set; } 
        public DateTime dateofbirth { get; set; }
        public char gender { get; set; }
        public string street_address { get; set; }
        public string city { get; set; }
        public string country { get; set; }
        public string postal_code { get; set; }
        public string phone { get; set; }
        public string designation { get; set; }
  

        
    }
}