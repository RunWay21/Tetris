using Common;
using System.Configuration;

namespace Services.Common
{
    public class SettingService : ISettingService
    {
        public string Get(string name)
        {
            return ConfigurationManager.AppSettings[name];
        }

        public string ConnectionString(string name)
        {
            return ConfigurationManager.ConnectionStrings[name].ToString();
        }
    }
}
