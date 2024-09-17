namespace CSBackend.Models
{
    public class UserMeeting
    {
        public string UserId { get; set; }
        public User User { get; set; }

        public String MeetingId { get; set; }
        public Meeting Meeting { get; set; }
    }
}
