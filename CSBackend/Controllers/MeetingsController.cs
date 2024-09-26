using CSBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChurchScheduler.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class MeetingsController : ControllerBase
    {

        private readonly ChurchSchedulerContext _context;

        public MeetingsController(ChurchSchedulerContext context)
        {
            _context = context;
        }


        [HttpPost("book")]
        public async Task<IActionResult> BookMeeting([FromBody] Meeting meeting)
        {
            if (meeting == null)
            {
                return BadRequest("Meeting data is required.");
            }

            // Validate the model
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Ensure StartTime and EndTime are in UTC
            meeting.StartTime = DateTime.SpecifyKind(meeting.StartTime, DateTimeKind.Utc);
            meeting.EndTime = DateTime.SpecifyKind(meeting.EndTime, DateTimeKind.Utc);

            // Add the meeting to the database
            _context.Meetings.Add(meeting);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMeeting), new { id = meeting.MeetingId }, meeting);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Meeting>> GetMeeting(int id)
        {
            var meeting = await _context.Meetings.FindAsync(id);
            if (meeting == null)
            {
                return NotFound();
            }

            return meeting;
        }

        [HttpGet("abouna/{abounaId}")]
        public async Task<ActionResult<IEnumerable<Meeting>>> GetMeetingsByAbounaId(string abounaId)
        {
            // Validate the abounaId
            if (string.IsNullOrEmpty(abounaId))
            {
                return BadRequest("AbounaId is required.");
            }

            var meetings = await _context.Meetings
                .Where(m => m.AbounaId.Equals(abounaId))
                .ToListAsync();

            if (meetings == null || !meetings.Any())
            {
                return NotFound("No meetings found for the given AbounaId.");
            }

            return Ok(meetings);
        }

    }
}