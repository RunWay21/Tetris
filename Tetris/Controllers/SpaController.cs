using System.Web.Mvc;

namespace Tetris.Controllers
{
    public class SpaController : Controller
    {
        public ActionResult Index()
        {
            return View("Spa");
        }
    }
}