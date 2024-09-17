using System;
using System.ComponentModel.DataAnnotations;
namespace CSBackend.Models
{
    public class TimeSlot
    {

        [Required]
        public String TimeSlotId { get; set; }

        [Required]
        public DateTime StartTime {get; set;}

        [Required]
        public String AbounaId {get; set;}

        [Required]
        public bool Available {get; set;}

        // navigation property to meeting 
        public Meeting Meeting {get; set;}
        
    }
}