using System;

namespace Domain
{
    public class Patient
    {
        public Guid Id { get; set; }
        public string name { get; set; }
        public string surname { get; set; } 
        public DateTime dateofbirth { get; set; }
        public char gender { get; set; }
        public string street_address { get; set; }
        public string city { get; set; }
        public string country { get; set; }
        public string postal_code { get; set; }
        public string phone { get; set; }
        public int weight { get; set; }
        public string other_det { get; set; }
        public DateTime register_date { get; set; }
        
       

    }
}