using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApplicationDAL.AppContextMigrations
{
    /// <inheritdoc />
    public partial class JobSalarySeparatedIntoDistinctEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Salary",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "SalaryRate",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "ShowPayBy",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "Salary",
                table: "CurrentJobCreations");

            migrationBuilder.DropColumn(
                name: "SalaryRate",
                table: "CurrentJobCreations");

            migrationBuilder.DropColumn(
                name: "ShowPayBy",
                table: "CurrentJobCreations");

            migrationBuilder.AddColumn<bool>(
                name: "HasPostedFirstJob",
                table: "EmployerAccounts",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "CurrentJobSalaries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ShowPayByOption = table.Column<int>(type: "int", nullable: false),
                    MinimalAmount = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    MaximalAmount = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    SalaryRate = table.Column<int>(type: "int", nullable: false),
                    CurrentJobId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CurrentJobSalaries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CurrentJobSalaries_CurrentJobCreations_CurrentJobId",
                        column: x => x.CurrentJobId,
                        principalTable: "CurrentJobCreations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "JobSalaries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ShowPayByOption = table.Column<int>(type: "int", nullable: false),
                    MinimalAmount = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    MaximalAmount = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    SalaryRate = table.Column<int>(type: "int", nullable: false),
                    JobId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobSalaries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobSalaries_Jobs_JobId",
                        column: x => x.JobId,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_CurrentJobSalaries_CurrentJobId",
                table: "CurrentJobSalaries",
                column: "CurrentJobId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_JobSalaries_JobId",
                table: "JobSalaries",
                column: "JobId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CurrentJobSalaries");

            migrationBuilder.DropTable(
                name: "JobSalaries");

            migrationBuilder.DropColumn(
                name: "HasPostedFirstJob",
                table: "EmployerAccounts");

            migrationBuilder.AddColumn<decimal>(
                name: "Salary",
                table: "Jobs",
                type: "decimal(10,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "SalaryRate",
                table: "Jobs",
                type: "varchar(9)",
                maxLength: 9,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ShowPayBy",
                table: "Jobs",
                type: "varchar(15)",
                maxLength: 15,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<decimal>(
                name: "Salary",
                table: "CurrentJobCreations",
                type: "decimal(10,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "SalaryRate",
                table: "CurrentJobCreations",
                type: "varchar(9)",
                maxLength: 9,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "ShowPayBy",
                table: "CurrentJobCreations",
                type: "varchar(15)",
                maxLength: 15,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
