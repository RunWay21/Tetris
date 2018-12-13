using Common.Constants;
using Common.Extensions;
using Common.Models;
using Database;
using Database.DbModels;
using Microsoft.Owin.Security;
using Services.Models.Common;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Services.Data.Common
{
    public interface IAuthService
    {
        Task<CommonValidator> Login(AuthModel model);
        void Logout();
    }

    public class AuthService : IAuthService
    {
        private readonly DatabaseContext _db;
        private readonly IAuthenticationManager _authenticationManager;

        public AuthService(DatabaseContext db, IAuthenticationManager authenticationManager)
        {
            _db = db;
            _authenticationManager = authenticationManager;
        }

        public async Task<CommonValidator> Login(AuthModel model)
        {
            if (!string.IsNullOrWhiteSpace(model.Login) && !string.IsNullOrWhiteSpace(model.Password))
            {
                var user = await _db.Users.FirstOrDefaultAsync(x =>
                    string.Equals(x.Login, model.Login));
                if (user != null)
                {
                    if (user.Password != model.Password)
                        return new CommonValidator
                        {
                            IsValidated = false,
                            Message = "Incorrect password"
                        };

                    var claims = GetClaims(user);
                    DoAuth(claims);
                    user.LastLoginDate = DateTime.UtcNow;
                    await _db.SaveChangesAsync();

                    return new CommonValidator { IsValidated = true };
                }
            }
            return new CommonValidator { IsValidated = false, Message = "Wrong username or password" }; 
        }

        public void Logout()
        {
            _authenticationManager.SignOut();
        }

        private List<Claim> GetClaims(UserDbModel user)
        {

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Login),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            return claims;
        }

        private void DoAuth(List<Claim> claims)
        {
            var properties = new AuthenticationProperties
            {
                AllowRefresh = true,
                IsPersistent = true,
                ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(30)
            };
            var identity = new ClaimsIdentity(claims, AuthConstants.AuthenticationType);
            _authenticationManager.SignIn(properties, identity);
        }
    }
}
