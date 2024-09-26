using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using Microsoft.EntityFrameworkCore; // Required for EF Core
using System.Security.Cryptography;

namespace ChurchScheduler.Security;

public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    private readonly ChurchSchedulerContext _context; // Store the context

    public BasicAuthenticationHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ChurchSchedulerContext context) // Inject your DbContext here
        : base(options, logger, encoder)
    {
        _context = context; // Initialize the context
    }

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        try
        {
            var authHeader = AuthenticationHeaderValue.Parse(Request.Headers.Authorization!);
            var credentialBytes = Convert.FromBase64String(authHeader.Parameter!);
            var credentials = Encoding.UTF8.GetString(credentialBytes).Split(':');
            var email = credentials[0];
            var password = credentials[1];

            // Retrieve the user from the database
            var user = await _context.Abounas.SingleOrDefaultAsync(u => u.Email!.Equals(email, StringComparison.OrdinalIgnoreCase));
            if (user == null)
            {
                return AuthenticateResult.Fail("Invalid Username");
            }

            // Hash the provided password and compare with stored hashed password
            string hashedPassword = PasswordHasher.Hash(password, user.PasswordSalt); // Use a PasswordHasher utility to hash the password
            if (user.Password != hashedPassword)
            {
                return AuthenticateResult.Fail("Invalid Password");
            }

            // Create claims and authentication ticket
            var claims = new[] { new Claim("emails", email) };
            var identity = new ClaimsIdentity(claims, Scheme.Name);
            var principal = new ClaimsPrincipal(identity);
            var ticket = new AuthenticationTicket(principal, Scheme.Name);

            return AuthenticateResult.Success(ticket);
        }
        catch
        {
            return AuthenticateResult.Fail("Invalid Authorization Header");
        }
    }
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
}
