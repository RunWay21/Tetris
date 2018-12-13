using Services.Data.Common;
using Services.Models.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Tetris.Infrastructure.Extensions;
using Tetris.Models.Common;

namespace Tetris.Api.Common
{
    [RoutePrefix("api/common/auth")]
    public class AuthController : ApiController
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        [Route(nameof(Login))]
        public async Task<IHttpActionResult> Login(AuthModel model)
        {
            if (ModelState.IsValid)
            {
                var validator = await _authService.Login(model);

                if (validator.IsValidated)
                    return Ok();
                return BadRequest(validator.Message);
            }
            return BadRequest("((");
        }

        [HttpGet]
        [Authorize]
        [Route(nameof(Logout))]
        public void Logout()
        {
            _authService.Logout();
        }

        [HttpGet]
        [Route(nameof(GetAuthInfo))]
        public AuthInfoModel GetAuthInfo()
        {
            if (User.Identity.IsAuthenticated)
            {
                return new AuthInfoModel
                {
                    IsAuth = true,
                    Login = User.GetUserName(),
                    Roles = User.GetRoles()
                };
            }
            return new AuthInfoModel
            {
                IsAuth = false,
                Roles = new List<string>()
            };
        }
    }
}