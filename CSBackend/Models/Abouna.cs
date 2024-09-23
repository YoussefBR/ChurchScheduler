using System;
using System.ComponentModel.DataAnnotations;
namespace CSBackend.Models
{
    public class Abouna
    {

        [Required]
        public String AbounaId { get; set; }

        [Required]
        public String FirstName {get; set;}

        [Required]
        public String LastName {get; set;}

        [Required]
        public String Email {get; set;}

        [Required]
        public String Availability {get; set;}

        // Navigation property for the many-to-many relationship with Meeting
        public ICollection<AbounaMeeting> AbounaMeetings { get; set; }
    }
}