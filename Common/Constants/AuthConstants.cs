using System.Collections.Generic;

namespace Common.Constants
{
    public class AuthConstants
    {
        public static string AuthCookieName => "TetrisAuthCookieName";
        public static string AuthenticationType => "ApplicationCookie";
        public static string HashSalt => "q_1321*FT+vbn";

        public const char AdminRoleKey = 'a';
        public const string AdminRoleName = "admin";
        public const char UserRoleKey = 'u';
        public const string UserRoleName = "user";

        public static Dictionary<char, string> Roles { get; } = new Dictionary<char, string>
        {
            [AdminRoleKey] = AdminRoleName,
            [UserRoleKey] = UserRoleName
        };
    }
}
