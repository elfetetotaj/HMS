using System;

namespace Domain
{
    public class Nurse
    {
        public Guid id {get; set;}   
        
        public string emri {get; set;}
        public string mbiemri {get; set;}
        public string username {get ; set;}
        public DateTime datelindja {get; set;}
        public string adresa {get; set;}
        public string qyteti {get; set;}
        public string email {get; set;}
        public char gjinia {get; set;}
        public int paga {get; set;}
        public string department{get; set;}
    }
}