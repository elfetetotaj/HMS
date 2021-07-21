using System;

namespace Domain
{
    public class City
    {
        public Guid id { get; set; }
        public string cityName { get; set; }
        public int zipCode { get; set; }
    }
}