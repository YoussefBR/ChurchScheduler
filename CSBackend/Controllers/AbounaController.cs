using System.Security.Cryptography;
using System.Text;
using CSBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChurchScheduler.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AbounaController : ControllerBase
    {
        private readonly ChurchSchedulerContext _context;

        public AbounaController(ChurchSchedulerContext context)
        {
            _context = context;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAbouna([FromBody] Abouna abouna)
        {
            if (abouna == null)
            {
                return BadRequest("Abouna data is required.");
            }

            // Validate the model
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Generate a unique AbounaId
            abouna.AbounaId = Guid.NewGuid().ToString(); // Or use any logic to create unique ID

            // Generate a Password Salt
            abouna.PasswordSalt = PasswordHasher.CreateSalt();

            // Hash the password with the salt
            abouna.Password = PasswordHasher.Hash(abouna.Password, abouna.PasswordSalt);

            // Add the Abouna to the database
            _context.Abounas.Add(abouna);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAbouna), new { id = abouna.AbounaId }, abouna);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Abouna>> GetAbouna(string id)
        {
            var abouna = await _context.Abounas.FindAsync(id);
            if (abouna == null)
            {
                return NotFound();
            }

            return abouna;
        }

        private string GenerateSalt()
        {
            byte[] salt = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }
            return Convert.ToBase64String(salt);
        }

        private string HashPassword(string password, string salt)
        {
            using (var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(salt)))
            {
                var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(hash);
            }
        }
    }
}
