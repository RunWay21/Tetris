using System.Security.Claims;
using System.Security.Principal;

namespace Tetris.Helpers.Extencions
{
    public static class AuthExtencions
    {
        public static int GetUserId(this IPrincipal self)
        {
            return int.Parse(((ClaimsPrincipal)self).FindFirst(x => x.Type == ClaimTypes.NameIdentifier).Value);
        }
    }
}