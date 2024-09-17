using System;
using System.ComponentModel.DataAnnotations;
namespace CSBackend.Models
{
    public class Meeting
    {

        [Required]
        public String MeetingId { get; set; }

        [Required]
        public String MeetingType {get; set;}

        [Required]
        public String MeetingLocation {get; set;}

        [Required]
        public String AbounaId { get; set; }

        [Required]
        public String SchedulingUserId {get; set;}

        [Required]
        public String LastName {get; set;}

        // foreign key
        public String TimeSlotId {get; set;}

        // navigation property to timeslot 
        public TimeSlot TimeSlot {get; set;}

        // Navigation property for the many-to-many relationship with Abouna
        public ICollection<AbounaMeeting> AbounaMeetings { get; set; }

        // Navigation property for the many-to-many relationship with User
        public ICollection<UserMeeting> UserMeetings { get; set; }
    }
}