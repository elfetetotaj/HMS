using System;

namespace Domain
{
    public class City
    {
        public Guid Id { get; set; }
        public string CityName { get; set; }
        public int ZipCode { get; set; }
    }
}