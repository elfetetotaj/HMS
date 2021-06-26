using System;

namespace Domain
{
    public class Farmacist
    {
        public Guid Id{get; set;}
        public string emri{get; set;}
        public string mbiemri{get; set;}
        public string email{get; set;}
        public int tel{get; set;}
        public string degree{get; set;}
        public DateTime dateOfJoining{get; set;}
    }
}