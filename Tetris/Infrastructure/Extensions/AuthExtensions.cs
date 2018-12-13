using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;

namespace Tetris.Infrastructure.Extensions
{
    public static class AuthExtensions
    {
        public static string GetUserName(this IPrincipal self)
        {
            var claimsPrincipal = self as ClaimsPrincipal;
            return claimsPrincipal?.FindFirst(x => x.Type == ClaimTypes.Name)?.Value;
        }

        public static int GetUserId(this IPrincipal self)
        {
            return int.Parse(((ClaimsPrincipal)self).FindFirst(x => x.Type == ClaimTypes.NameIdentifier).Value);
        }

        public static List<string> GetRoles(this IPrincipal self)
        {
            var claimsPrincipal = self as ClaimsPrincipal;
            return claimsPrincipal?.FindAll(x => x.Type == ClaimTypes.Role)?.Select(x => x.Value).ToList() ?? new List<string>();
        }
    }
}