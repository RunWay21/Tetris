using Common.Models;
using Database;
using Database.DbModels;
using Services.Models.Game;
using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Services.Data.Game
{
    public interface IGameService
    {
        Task<Page<GameForListModel>> GetUserGameList(int page, int userId);
        Task SaveGame(GameModel game);
        Task<ScoreInfoModel> GetScoreInfo(int userId);
    }

    public class GameService : IGameService
    {
        private readonly int _pageSize = 4;
        private readonly DatabaseContext _db;

        public GameService(DatabaseContext db)
        {
            _db = db;
        }

        public async Task<ScoreInfoModel> GetScoreInfo(int userId)
        {
            var query = _db.Games.Where(x => x.UserId == userId);

            var lastGame = await query
                .OrderByDescending(x => x.DateTime)
                .FirstOrDefaultAsync();

            var hightScoreGame = await query
                .OrderByDescending(x => x.Point)
                .FirstOrDefaultAsync();

            return new ScoreInfoModel
            {
                Score = lastGame == null ? 0 : lastGame.Point,
                MaxScore = hightScoreGame == null ? 0 : hightScoreGame.Point
            };
        }

        public async Task<Page<GameForListModel>> GetUserGameList(int page, int userId)
        {
            if (userId != 0)
            {
                var query = _db.Games
                    .Where(x => x.UserId == userId);

                var count = await query.CountAsync();

                var items = await query.OrderByDescending(x => x.DateTime)
                    .Skip((page - 1) * _pageSize)
                    .Take(_pageSize)
                    .Select(x => new GameForListModel
                    {
                        Id = x.Id,
                        Point = x.Point,
                        DateTime = x.DateTime,
                        UserName = x.User.Login
                    })
                    .ToListAsync();

                return new Page<GameForListModel>(page, _pageSize, count, items);
            }
            else
            {

                var count = await _db.Games.CountAsync();

                var items = await _db.Games.OrderByDescending(x => x.DateTime)
                    .Skip((page - 1) * _pageSize)
                    .Take(_pageSize)
                    .Select(x => new GameForListModel
                    {
                        Id = x.Id,
                        Point = x.Point,
                        DateTime = x.DateTime,
                        UserName = x.User.Login
                    })
                    .ToListAsync();

                return new Page<GameForListModel>(page, _pageSize, count, items);
            }
        }

        public async Task SaveGame(GameModel model)
        {
            _db.Games.Add(new GameDbModel
            {
                NumberOfE = model.NumberOfE,
                NumberOfI = model.NumberOfI,
                NumberOfJ = model.NumberOfJ,
                NumberOfL = model.NumberOfL,
                NumberOfO = model.NumberOfO,
                NumberOfS = model.NumberOfS,
                NumberOfZ = model.NumberOfZ,
                UserId = model.UserId,
                Point = model.Point,
                DateTime = DateTime.UtcNow
            });

            await _db.SaveChangesAsync();
        }


    }
}
