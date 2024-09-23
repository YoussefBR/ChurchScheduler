using System;

namespace CSBackend.Models
{
    public class AbounaMeeting
    {
        public string AbounaId { get; set; }
        public Abouna Abouna { get; set; }

        public String MeetingId { get; set; }
        public Meeting Meeting { get; set; }
    }
}
