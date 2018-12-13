using Database.DbModels;
using System.Data.Entity;

namespace Database
{
    public class DatabaseContext : DbContext
    {
        public const string DefaultConnectionString = "DefaultConnection";

        public DbSet<UserDbModel> Users { get; set; }
        public DbSet<GameDbModel> Games { get; set; }

        public DatabaseContext() : base(DefaultConnectionString) { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            System.Data.Entity.Database.SetInitializer<DatabaseContext>(null);
        }
    }
}
