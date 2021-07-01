using System;

namespace Domain
{
    public class Country
    {
        public Guid Id { get; set; }
        public string CountryName { get; set; }
        public string Location { get; set; }
        public int Population { get; set; }
        public string Nation { get; set; }
        public string Goverment { get; set; }
    }
}