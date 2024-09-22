using System;
using System.ComponentModel.DataAnnotations;
namespace CSBackend.Models
{
    public class User
    {

        [Required]
        public String UserId { get; set; }

        [Required]
        public String FirstName {get; set;}

        [Required]
        public String LastName {get; set;}

        [Required]
        public String Email {get; set;}

        [Required]
        public String PhoneNumber {get; set;}

        // Navigation property for the many-to-many relationship with Meeting
        public ICollection<UserMeeting> UserMeetings { get; set; }
    }
}