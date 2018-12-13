using Common;
using FluentMigrator;
using FluentMigrator.Runner;
using FluentMigrator.Runner.Announcers;
using FluentMigrator.Runner.Initialization;
using System;
using System.Reflection;

namespace Database.MigratorRunner
{
    public class MigratorRunner: IMigratorRunner
    {
        public class MigrationOptions : IMigrationProcessorOptions
        {
            public bool PreviewOnly { get; set; }
            public string ProviderSwitches { get; set; }
            public int Timeout { get; set; }
        }

        private readonly ISettingService _settingsService;

        public MigratorRunner(ISettingService settingsService)
        {
            _settingsService = settingsService;
        }

        public void MigrateToLatest()
        {
            try
            {
                var connectionString = _settingsService.ConnectionString(DatabaseContext.DefaultConnectionString);

                var announcer = new NullAnnouncer();

                var assembly = Assembly.GetExecutingAssembly();

                var migrationContext = new RunnerContext(announcer)
                {
                    NestedNamespaces = true,
                    Namespace = "Database.Migrations",
                    Connection = connectionString
                };
                var options = new MigrationOptions { PreviewOnly = false, Timeout = 60 };
                var factory = new FluentMigrator.Runner.Processors.SqlServer.SqlServer2014ProcessorFactory();
                using (var processor = factory.Create(connectionString, announcer, options))
                {
                    var runner = new MigrationRunner(assembly, migrationContext, processor);
                    runner.MigrateUp(true);
                }
            }
            catch (Exception e)
            {
            }
        }


    }
}
