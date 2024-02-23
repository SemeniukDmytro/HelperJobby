#nullable disable

using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class AddedCurrentJobCreationEntityToSaveJobCreationProcessResult : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            "CompanyName",
            "Jobs");

        migrationBuilder.CreateTable(
                "CurrentJobCreation",
                table => new
                {
                    Id = table.Column<int>("int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    JobTitle = table.Column<string>("varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NumberOfOpenings = table.Column<int>("int", nullable: false),
                    Language = table.Column<string>("varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Location = table.Column<string>("varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    JobTypes = table.Column<int>("int", nullable: false),
                    Salary = table.Column<decimal>("decimal(10,2)", nullable: false),
                    Schedule = table.Column<int>("int", nullable: false),
                    Benefits = table.Column<int>("int", nullable: false),
                    ContactEmail = table.Column<string>("varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ResumeRequired = table.Column<bool>("tinyint(1)", nullable: false),
                    Description = table.Column<string>("text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EmployerAccountId = table.Column<int>("int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CurrentJobCreation", x => x.Id);
                    table.ForeignKey(
                        "FK_CurrentJobCreation_EmployerAccounts_EmployerAccountId",
                        x => x.EmployerAccountId,
                        "EmployerAccounts",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateIndex(
            "IX_CurrentJobCreation_EmployerAccountId",
            "CurrentJobCreation",
            "EmployerAccountId",
            unique: true);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            "CurrentJobCreation");

        migrationBuilder.AddColumn<string>(
                "CompanyName",
                "Jobs",
                "varchar(45)",
                maxLength: 45,
                nullable: false,
                defaultValue: "")
            .Annotation("MySql:CharSet", "utf8mb4");
    }
}