using Services.Data.User;
using Services.Models.User;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace Tetris.Api.User
{
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route(nameof(GetList))]
        public async Task<List<UserModel>> GetList()
        {
            return await _userService.GetList();
        }
    }
}