using Common.Constants;
using LightInject;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Owin;
using Tetris.Infrastructure;
using System.Web.Http;
using System.Linq;
using Newtonsoft.Json.Serialization;
using Database.MigratorRunner;
using Common;
using Database;
using System.Web;
using Services.Common;
using System.Web.Routing;
using System.Web.Mvc;
using System.Net.Http.Headers;

[assembly: OwinStartup(typeof(Tetris.Startup))]
namespace Tetris
{
    public class Startup
    {
        private IServiceContainer _container;

        public void Configuration(IAppBuilder app)
        {
            app.Use(typeof(DisableCacheMiddleware));
            ConfigureAuth(app);
            var config = new HttpConfiguration();
            ConfigureContainer(config);
            RunMigrations();
            ConfigureWebApi(app, config);
        }

        private void ConfigureAuth(IAppBuilder app)
        {
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                CookieName = AuthConstants.AuthCookieName,
                AuthenticationType = AuthConstants.AuthenticationType,
                LoginPath = new PathString("/app/login"),
                Provider = new CookieAuthenticationProvider
                {
                    OnApplyRedirect = ctx =>
                    {
                        if (!IsAjaxRequest(ctx.Request))
                            ctx.Response.Redirect(ctx.RedirectUri);
                    }
                }
            });
        }

        private void RunMigrations()
        {
            var runner = _container.GetInstance<IMigratorRunner>();
            runner.MigrateToLatest();
        }

        private void ConfigureContainer(HttpConfiguration config)
        {
            _container = new ServiceContainer();
            _container.RegisterApiControllers();
            _container.EnableWebApi(config);
            _container.RegisterControllers();
            _container.EnableMvc();
            //common
            _container.Register<IMigratorRunner, MigratorRunner>();
            _container.Register<ISettingService, SettingService>();
            _container.Register<DatabaseContext>(new PerRequestLifeTime());
            _container.Register(factory => HttpContext.Current.GetOwinContext().Authentication, new PerRequestLifeTime());
            //data services
            _container.RegisterAssembly(typeof(SettingService).Assembly,
                (serviceType, implementingType) => serviceType.IsInterface &&
                                                   implementingType.Namespace?.StartsWith("Services.Data") == true &&
                                                   implementingType.Name.EndsWith("Service"));
        }

        public static void MvcRegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");


            routes.MapRoute(
                "Spa",
                "{section}/{*parameters}",
                new { controller = "Spa", action = "Index" },
                new { section = "(app|admin|client|common)" });


            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Spa", action = "Index", id = UrlParameter.Optional }
            );
        }

        public void ConfigureWebApi(IAppBuilder app, HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();
            //disable XML
            var appXmlType = config.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml");
            config.Formatters.XmlFormatter.SupportedMediaTypes.Remove(appXmlType);
            //enable camelCase for Json
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;
            app.UseWebApi(config);
        }

        private static bool IsAjaxRequest(IOwinRequest request)
        {
            return request.Path.Value?.StartsWith("/api") == true ||
                   request.Query != null && request.Query["X-Requested-With"] == "XMLHttpRequest" ||
                   request.Headers != null && request.Headers["X-Requested-With"] == "XMLHttpRequest";
        }
    }
}
