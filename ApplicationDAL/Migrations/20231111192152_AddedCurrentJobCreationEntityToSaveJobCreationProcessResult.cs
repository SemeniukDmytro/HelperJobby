using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApplicationDAL.Migrations
{
    /// <inheritdoc />
    public partial class AddedCurrentJobCreationEntityToSaveJobCreationProcessResult : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompanyName",
                table: "Jobs");

            migrationBuilder.CreateTable(
                name: "CurrentJobCreation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    JobTitle = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NumberOfOpenings = table.Column<int>(type: "int", nullable: false),
                    Language = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Location = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    JobTypes = table.Column<int>(type: "int", nullable: false),
                    Salary = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    Schedule = table.Column<int>(type: "int", nullable: false),
                    Benefits = table.Column<int>(type: "int", nullable: false),
                    ContactEmail = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ResumeRequired = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EmployerAccountId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CurrentJobCreation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CurrentJobCreation_EmployerAccounts_EmployerAccountId",
                        column: x => x.EmployerAccountId,
                        principalTable: "EmployerAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_CurrentJobCreation_EmployerAccountId",
                table: "CurrentJobCreation",
                column: "EmployerAccountId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CurrentJobCreation");

            migrationBuilder.AddColumn<string>(
                name: "CompanyName",
                table: "Jobs",
                type: "varchar(45)",
                maxLength: 45,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
