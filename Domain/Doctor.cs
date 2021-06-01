using System;

namespace Domain
{
    public class Doctor
    {
        public Guid id { get; set; }
        public string d_fname { get; set; }
        public string d_lname { get; set; } 
        public DateTime dob { get; set; }
        public char d_gender { get; set; }
        public string d_street_address { get; set; }
        public string d_city { get; set; }
        public string d_country { get; set; }
        public string d_postal_code { get; set; }
        public string d_phone { get; set; }
        public string designation { get; set; }
  

        
    }
}