using System.Web.Mvc;
using System.Web.Routing;

namespace Tetris
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            Startup.MvcRegisterRoutes(RouteTable.Routes);
        }
    }
}
