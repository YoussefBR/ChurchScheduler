using System;
using System.ComponentModel.DataAnnotations;
namespace CSBackend.Models
{
    public class Meeting
    {

        [Key] // Marking MeetingId as the primary key
        public Guid MeetingId { get; set; } = Guid.NewGuid();

        [Required]
        public String MeetingType { get; set; }

        [Required]
        public String AbounaId { get; set; }

        [Required]
        public String SchedulingUserName { get; set; }

        [Required]
        public String SchedulingUserEmail { get; set; }

        [Required]
        public DateTime StartTime { get; set; }

        [Required]
        public DateTime EndTime { get; set; }

       // public String DayOfMeeting { get; set; }

        // public ICollection<AbounaMeeting> AbounaMeetings { get; set; }

    }
}


// // Navigation property for the many-to-many relationship with Abouna
//         public ICollection<AbounaMeeting> AbounaMeetings { get; set; }