using Database;
using Services.Models.User;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Data.User
{

    public interface IUserService
    {
        Task<List<UserModel>> GetList();
    }

    public class UserService : IUserService
    {
        private readonly DatabaseContext _db;

        public UserService(DatabaseContext db)
        {
            _db = db;
        }

        public async Task<List<UserModel>> GetList()
        {
            return await _db.Users.Select(x => new UserModel
            {
                Id = x.Id,
                Login = x.Login
            }).ToListAsync();
        }
    }
}
