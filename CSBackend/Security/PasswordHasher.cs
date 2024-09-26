using System.Security.Cryptography;
using System.Text;

public static class PasswordHasher
{
    public static string CreateSalt()
    {
        byte[] saltBytes = new byte[32];
        using (RandomNumberGenerator rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(saltBytes);
        }
        return Convert.ToBase64String(saltBytes);
    }

    public static string Hash(string password, string salt)
    {
        var saltedPassword = salt + password;
        byte[] bytes = SHA512.HashData(Encoding.UTF8.GetBytes(saltedPassword));
        return Convert.ToBase64String(bytes);
    }

}