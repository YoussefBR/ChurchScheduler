using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore; // Ensure this namespace is correct

namespace ChurchScheduler.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ChurchSchedulerContext _context;

        public AuthController(ChurchSchedulerContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            Console.WriteLine(loginRequest.Email + " " + loginRequest.Password);
            // Validate the input
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Password))
            {
                Console.WriteLine("here");
                return BadRequest("Email and password are required.");
            }

            // Retrieve the user from the database
            // Retrieve the user from the database
            var abouna = await _context.Abounas
                .SingleOrDefaultAsync(a => a.Email.ToLower() == loginRequest.Email.ToLower());
            if (abouna == null)
            {
                return Unauthorized("Invalid Username");
            }

            // Hash the provided password and compare with stored hashed password
            string hashedPassword = PasswordHasher.Hash(loginRequest.Password, abouna.PasswordSalt);
            if (!abouna.Password.Equals(hashedPassword))
            {
                return Unauthorized("Invalid Password");
            }

            // Create claims and authentication ticket
            var claims = new[] { new Claim(ClaimTypes.Email, abouna.Email) };
            var identity = new ClaimsIdentity(claims, "BasicAuthentication");
            var principal = new ClaimsPrincipal(identity);
            var ticket = new AuthenticationTicket(principal, "BasicAuthentication");

            // Return a successful authentication response (you may want to implement token generation here)
            return Ok(new { message = "Login successful!" }); // Optionally, return a token or user info
        }
    }
}
