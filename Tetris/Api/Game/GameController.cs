using Common.Models;
using Services.Data.Game;
using Services.Models.Game;
using System.Threading.Tasks;
using System.Web.Http;
using Tetris.Helpers.Extencions;

namespace Tetris.Api.Game
{
    [RoutePrefix("api/game")]
    public class GameController : ApiController
    {
        private readonly IGameService _gameService;

        public GameController(IGameService gameService)
        {
            _gameService = gameService;
        }

        [HttpPost]
        [Route(nameof(SaveGame))]
        public async Task SaveGame(GameModel model)
        {
            model.UserId = User.GetUserId();
            await _gameService.SaveGame(model);
        }

        [HttpGet]
        [Route(nameof(GetUserGameList))]
        public async Task<Page<GameForListModel>> GetUserGameList(int page = 1, int userId = 0)
        {
            return await _gameService.GetUserGameList(page, userId);
        }

        [HttpPost]
        [Route(nameof(GetScoreInfo))]
        public async Task<ScoreInfoModel> GetScoreInfo()
        {
            return await _gameService.GetScoreInfo(User.GetUserId());
        }
    }
}