using System;

namespace Domain
{
    public class Country
    {
        public Guid Id { get; set; }
        public string CountryName { get; set; }
        public string LatLong { get; set; }
        public int Population { get; set; }
        public string Area { get; set; }
        public string TimeZone { get; set; }
        public string CallingCode { get; set; }
        public string Capital{ get; set; }
        public string Continent { get; set; }
        public string Currency { get; set; }

    }
}