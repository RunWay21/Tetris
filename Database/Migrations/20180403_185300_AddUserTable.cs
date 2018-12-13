using FluentMigrator;

namespace Database.Migrations
{
    [Migration(20180403185300, TransactionBehavior.Default, "Add User Table")]
    public class AddUserTable : Migration
    {
        public override void Down()
        {
            //
        }

        public override void Up()
        {
            Create.Table("User")
                .InSchema("dbo")
                .WithColumn("Id").AsInt32().PrimaryKey().Identity()
                .WithColumn("Login").AsString().NotNullable()
                .WithColumn("Password").AsString().NotNullable()
                .WithColumn("LastLoginDate").AsCustom("datetime2").Nullable()
                .WithColumn("Created").AsCustom("datetime2").NotNullable();
        }
    }
}
