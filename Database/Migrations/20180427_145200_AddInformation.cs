using FluentMigrator;
using System;

namespace Database.Migrations
{
    [Migration(20180427145200, TransactionBehavior.Default, "Add Information")]
    public class AddInformation : Migration
    {
        public override void Down()
        {
            //
        }

        public override void Up()
        {
            Insert.IntoTable("User")
                .InSchema("dbo")
                .Row(new { Login = "Runway", Password = "123", Created = DateTime.UtcNow})
                .Row(new { Login = "Event", Password = "123", Created = DateTime.UtcNow })
                .Row(new { Login = "Misha", Password = "123", Created = DateTime.UtcNow });
        }
    }
}
