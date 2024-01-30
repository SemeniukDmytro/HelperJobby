#nullable disable

using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class Initial : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AlterDatabase()
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "Addresses",
                table => new
                {
                    Id = table.Column<int>("int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Country = table.Column<string>("varchar(45)", maxLength: 45, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    StreetAddress = table.Column<string>("varchar(30)", maxLength: 30, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    City = table.Column<string>("varchar(30)", maxLength: 30, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PostalCode = table.Column<string>("varchar(10)", maxLength: 10, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table => { table.PrimaryKey("PK_Addresses", x => x.Id); })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "Organizations",
                table => new
                {
                    Id = table.Column<int>("int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>("varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>("varchar(15)", maxLength: 15, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table => { table.PrimaryKey("PK_Organizations", x => x.Id); })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "Users",
                table => new
                {
                    Id = table.Column<int>("int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Email = table.Column<string>("varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PasswordHash = table.Column<string>("varchar(200)", maxLength: 200, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AccountType = table.Column<string>("varchar(10)", maxLength: 10, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table => { table.PrimaryKey("PK_Users", x => x.Id); })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "EmployerAccounts",
                table => new
                {
                    Id = table.Column<int>("int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>("int", nullable: false),
                    OrganizationId = table.Column<int>("int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployerAccounts", x => x.Id);
                    table.ForeignKey(
                        "FK_EmployerAccounts_Organizations_OrganizationId",
                        x => x.OrganizationId,
                        "Organizations",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        "FK_EmployerAccounts_Users_UserId",
                        x => x.UserId,
                        "Users",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "JobSeekerAccounts",
                table => new
                {
                    Id = table.Column<int>("int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>("varchar(30)", maxLength: 30, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LastName = table.Column<string>("varchar(30)", maxLength: 30, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>("varchar(15)", maxLength: 15, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<int>("int", nullable: false),
                    AddressId = table.Column<int>("int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobSeekerAccounts", x => x.Id);
                    table.ForeignKey(
                        "FK_JobSeekerAccounts_Addresses_AddressId",
                        x => x.AddressId,
                        "Addresses",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        "FK_JobSeekerAccounts_Users_UserId",
                        x => x.UserId,
                        "Users",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "Jobs",
                table => new
                {
                    Id = table.Column<int>("int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    JobTitle = table.Column<string>("varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CompanyName = table.Column<string>("varchar(45)", maxLength: 45, nullable: false)
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
                    table.PrimaryKey("PK_Jobs", x => x.Id);
                    table.ForeignKey(
                        "FK_Jobs_EmployerAccounts_EmployerAccountId",
                        x => x.EmployerAccountId,
                        "EmployerAccounts",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "Resumes",
                table => new
                {
                    Id = table.Column<int>("int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    JobSeekerAccountId = table.Column<int>("int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resumes", x => x.Id);
                    table.ForeignKey(
                        "FK_Resumes_JobSeekerAccounts_JobSeekerAccountId",
                        x => x.JobSeekerAccountId,
                        "JobSeekerAccounts",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "Interviews",
                table => new
                {
                    JobId = table.Column<int>("int", nullable: false),
                    JobSeekerAccountId = table.Column<int>("int", nullable: false),
                    DateTime = table.Column<DateTime>("datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Interviews", x => new { x.JobId, x.JobSeekerAccountId });
                    table.ForeignKey(
                        "FK_Interviews_JobSeekerAccounts_JobSeekerAccountId",
                        x => x.JobSeekerAccountId,
                        "JobSeekerAccounts",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        "FK_Interviews_Jobs_JobId",
                        x => x.JobId,
                        "Jobs",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "JobApplies",
                table => new
                {
                    JobId = table.Column<int>("int", nullable: false),
                    JobSeekerAccountId = table.Column<int>("int", nullable: false),
                    DateTime = table.Column<DateTime>("datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobApplies", x => new { x.JobId, x.JobSeekerAccountId });
                    table.ForeignKey(
                        "FK_JobApplies_JobSeekerAccounts_JobSeekerAccountId",
                        x => x.JobSeekerAccountId,
                        "JobSeekerAccounts",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        "FK_JobApplies_Jobs_JobId",
                        x => x.JobId,
                        "Jobs",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "SavedJobs",
                table => new
                {
                    JobId = table.Column<int>("int", nullable: false),
                    JobSeekerAccountId = table.Column<int>("int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedJobs", x => new { x.JobId, x.JobSeekerAccountId });
                    table.ForeignKey(
                        "FK_SavedJobs_JobSeekerAccounts_JobSeekerAccountId",
                        x => x.JobSeekerAccountId,
                        "JobSeekerAccounts",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        "FK_SavedJobs_Jobs_JobId",
                        x => x.JobId,
                        "Jobs",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "Educations",
                table => new
                {
                    Id = table.Column<int>("int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    LevelOfEducation = table.Column<string>("varchar(30)", maxLength: 30, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FieldOfStudy = table.Column<string>("varchar(30)", maxLength: 30, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SchoolName = table.Column<string>("varchar(70)", maxLength: 70, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Country = table.Column<string>("varchar(45)", maxLength: 45, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    City = table.Column<string>("varchar(30)", maxLength: 30, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    From = table.Column<DateOnly>("date", nullable: false),
                    To = table.Column<DateOnly>("date", nullable: false),
                    ResumeId = table.Column<int>("int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Educations", x => x.Id);
                    table.ForeignKey(
                        "FK_Educations_Resumes_ResumeId",
                        x => x.ResumeId,
                        "Resumes",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "Skills",
                table => new
                {
                    Id = table.Column<int>("int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ResumeId = table.Column<int>("int", nullable: false),
                    Name = table.Column<string>("varchar(30)", maxLength: 30, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Skills", x => x.Id);
                    table.ForeignKey(
                        "FK_Skills_Resumes_ResumeId",
                        x => x.ResumeId,
                        "Resumes",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "WorkExperiences",
                table => new
                {
                    WorkExperienceId = table.Column<int>("int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    JobTitle = table.Column<string>("varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Company = table.Column<string>("varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Country = table.Column<string>("varchar(45)", maxLength: 45, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CityOrProvince = table.Column<string>("varchar(30)", maxLength: 30, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    From = table.Column<DateTime>("datetime(6)", nullable: false),
                    To = table.Column<DateTime>("datetime(6)", nullable: true),
                    CurrentlyWorkHere = table.Column<bool>("tinyint(1)", nullable: false),
                    Description = table.Column<string>("varchar(2000)", maxLength: 2000, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ResumeId = table.Column<int>("int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkExperiences", x => x.WorkExperienceId);
                    table.ForeignKey(
                        "FK_WorkExperiences_Resumes_ResumeId",
                        x => x.ResumeId,
                        "Resumes",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateIndex(
            "IX_Educations_ResumeId",
            "Educations",
            "ResumeId");

        migrationBuilder.CreateIndex(
            "IX_EmployerAccounts_OrganizationId",
            "EmployerAccounts",
            "OrganizationId",
            unique: true);

        migrationBuilder.CreateIndex(
            "IX_EmployerAccounts_UserId",
            "EmployerAccounts",
            "UserId",
            unique: true);

        migrationBuilder.CreateIndex(
            "IX_Interviews_JobSeekerAccountId",
            "Interviews",
            "JobSeekerAccountId");

        migrationBuilder.CreateIndex(
            "IX_JobApplies_JobSeekerAccountId",
            "JobApplies",
            "JobSeekerAccountId");

        migrationBuilder.CreateIndex(
            "IX_Jobs_EmployerAccountId",
            "Jobs",
            "EmployerAccountId");

        migrationBuilder.CreateIndex(
            "IX_JobSeekerAccounts_AddressId",
            "JobSeekerAccounts",
            "AddressId");

        migrationBuilder.CreateIndex(
            "IX_JobSeekerAccounts_PhoneNumber",
            "JobSeekerAccounts",
            "PhoneNumber",
            unique: true);

        migrationBuilder.CreateIndex(
            "IX_JobSeekerAccounts_UserId",
            "JobSeekerAccounts",
            "UserId",
            unique: true);

        migrationBuilder.CreateIndex(
            "IX_Organizations_PhoneNumber",
            "Organizations",
            "PhoneNumber",
            unique: true);

        migrationBuilder.CreateIndex(
            "IX_Resumes_JobSeekerAccountId",
            "Resumes",
            "JobSeekerAccountId",
            unique: true);

        migrationBuilder.CreateIndex(
            "IX_SavedJobs_JobSeekerAccountId",
            "SavedJobs",
            "JobSeekerAccountId");

        migrationBuilder.CreateIndex(
            "IX_Skills_ResumeId",
            "Skills",
            "ResumeId");

        migrationBuilder.CreateIndex(
            "IX_Users_Email",
            "Users",
            "Email",
            unique: true);

        migrationBuilder.CreateIndex(
            "IX_WorkExperiences_ResumeId",
            "WorkExperiences",
            "ResumeId");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            "Educations");

        migrationBuilder.DropTable(
            "Interviews");

        migrationBuilder.DropTable(
            "JobApplies");

        migrationBuilder.DropTable(
            "SavedJobs");

        migrationBuilder.DropTable(
            "Skills");

        migrationBuilder.DropTable(
            "WorkExperiences");

        migrationBuilder.DropTable(
            "Jobs");

        migrationBuilder.DropTable(
            "Resumes");

        migrationBuilder.DropTable(
            "EmployerAccounts");

        migrationBuilder.DropTable(
            "JobSeekerAccounts");

        migrationBuilder.DropTable(
            "Organizations");

        migrationBuilder.DropTable(
            "Addresses");

        migrationBuilder.DropTable(
            "Users");
    }
}