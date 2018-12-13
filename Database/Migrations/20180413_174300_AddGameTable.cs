using FluentMigrator;
using System;

namespace Database.Migrations
{
    [Migration(20180413174300, TransactionBehavior.Default, "Add Game Table")]
    public class AddGameTable : Migration
    {
        public override void Down()
        {
            //
        }

        public override void Up()
        {
            Create.Table("Game")
                .InSchema("dbo")
                .WithColumn("Id").AsInt32().PrimaryKey().Identity()
                .WithColumn("UserId").AsInt32().NotNullable().ForeignKey("FK_USER_GAME", "User", "Id")
                .WithColumn("NumberOfL").AsInt32().NotNullable()
                .WithColumn("NumberOfJ").AsInt32().NotNullable()
                .WithColumn("NumberOfI").AsInt32().NotNullable()
                .WithColumn("NumberOfE").AsInt32().NotNullable()
                .WithColumn("NumberOfO").AsInt32().NotNullable()
                .WithColumn("NumberOfZ").AsInt32().NotNullable()
                .WithColumn("NumberOfS").AsInt32().NotNullable()
                .WithColumn("Point").AsInt32().NotNullable()
                .WithColumn("DateTime").AsCustom("datetime2").NotNullable();
        }
    }
}
