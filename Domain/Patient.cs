using System;

namespace Domain
{
    public class Patient
    {
        public Guid Id { get; set; }
        public string p_fname { get; set; }
        public string p_lname { get; set; } 
        public DateTime dob { get; set; }
        public char p_gender { get; set; }
        public string p_street_address { get; set; }
        public string p_city { get; set; }
        public string p_country { get; set; }
        public string p_postal_code { get; set; }
        public string p_phone { get; set; }
        public int p_weight { get; set; }
        public string other_det { get; set; }
        public DateTime p_rdate { get; set; }

    }
}