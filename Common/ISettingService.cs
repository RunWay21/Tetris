namespace Common
{
    public interface ISettingService
    {
        string Get(string name);
        string ConnectionString(string name);
    }
}
