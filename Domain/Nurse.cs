using System;

namespace Domain
{
    public class Nurse
    {
        public Guid id {get; set;}   
        
        public String emri {get; set;}
        public String mbiemri {get; set;}
        public String username {get ; set;}
        public String datelindja {get; set;}
        public String adresa {get; set;}
        public String qyteti {get; set;}
        public string email {get; set;}
        public char gjinia {get; set;}
        public int paga {get; set;}
    }
}