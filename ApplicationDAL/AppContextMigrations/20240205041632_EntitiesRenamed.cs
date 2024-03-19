#nullable disable

using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class EntitiesRenamed : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            "FK_Interviews_JobSeekerAccounts_JobSeekerAccountId",
            "Interviews");

        migrationBuilder.DropForeignKey(
            "FK_JobApplies_JobSeekerAccounts_JobSeekerAccountId",
            "JobApplies");

        migrationBuilder.DropForeignKey(
            "FK_Jobs_EmployerAccounts_EmployerAccountId",
            "Jobs");

        migrationBuilder.DropForeignKey(
            "FK_Resumes_JobSeekerAccounts_JobSeekerAccountId",
            "Resumes");

        migrationBuilder.DropForeignKey(
            "FK_SavedJobs_JobSeekerAccounts_JobSeekerAccountId",
            "SavedJobs");

        migrationBuilder.DropTable(
            "CurrentJobSalaries");

        migrationBuilder.DropTable(
            "JobSeekerAccounts");

        migrationBuilder.DropTable(
            "CurrentJobCreations");

        migrationBuilder.DropTable(
            "EmployerAccounts");

        migrationBuilder.RenameColumn(
            "WorkExperienceId",
            "WorkExperiences",
            "Id");

        migrationBuilder.RenameColumn(
            "JobSeekerAccountId",
            "SavedJobs",
            "JobSeekerId");

        migrationBuilder.RenameIndex(
            "IX_SavedJobs_JobSeekerAccountId",
            table: "SavedJobs",
            newName: "IX_SavedJobs_JobSeekerId");

        migrationBuilder.RenameColumn(
            "JobSeekerAccountId",
            "Resumes",
            "JobSeekerId");

        migrationBuilder.RenameIndex(
            "IX_Resumes_JobSeekerAccountId",
            table: "Resumes",
            newName: "IX_Resumes_JobSeekerId");

        migrationBuilder.RenameColumn(
            "EmployerAccountId",
            "Jobs",
            "EmployerId");

        migrationBuilder.RenameIndex(
            "IX_Jobs_EmployerAccountId",
            table: "Jobs",
            newName: "IX_Jobs_EmployerId");

        migrationBuilder.RenameColumn(
            "JobSeekerAccountId",
            "JobApplies",
            "JobSeekerId");

        migrationBuilder.RenameIndex(
            "IX_JobApplies_JobSeekerAccountId",
            table: "JobApplies",
            newName: "IX_JobApplies_JobSeekerId");

        migrationBuilder.RenameColumn(
            "JobSeekerAccountId",
            "Interviews",
            "JobSeekerId");

        migrationBuilder.RenameIndex(
            "IX_Interviews_JobSeekerAccountId",
            table: "Interviews",
            newName: "IX_Interviews_JobSeekerId");

        migrationBuilder.CreateTable(
                "Employers",
                table => new
                {
                    Id = table.Column<int>("int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FullName = table.Column<string>("varchar(60)", maxLength: 60, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>("varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ContactNumber = table.Column<string>("varchar(15)", maxLength: 15, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    HasPostedFirstJob = table.Column<bool>("tinyint(1)", nullable: false),
                    UserId = table.Column<int>("int", nullable: false),
                    OrganizationId = table.Column<int>("int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employers", x => x.Id);
                    table.ForeignKey(
                        "FK_Employers_Organizations_OrganizationId",
                        x => x.OrganizationId,
                        "Organizations",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        "FK_Employers_Users_UserId",
                        x => x.UserId,
                        "Users",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "JobSeekers",
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
                    AddressId = table.Column<int>("int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobSeekers", x => x.Id);
                    table.ForeignKey(
                        "FK_JobSeekers_Addresses_AddressId",
                        x => x.AddressId,
                        "Addresses",
                        "Id");
                    table.ForeignKey(
                        "FK_JobSeekers_Users_UserId",
                        x => x.UserId,
                        "Users",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "IncompleteJobs",
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
                    Schedule = table.Column<int>("int", nullable: false),
                    Benefits = table.Column<int>("int", nullable: false),
                    ContactEmail = table.Column<string>("varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ResumeRequired = table.Column<bool>("tinyint(1)", nullable: false),
                    Description = table.Column<string>("text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EmployerId = table.Column<int>("int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IncompleteJobs", x => x.Id);
                    table.ForeignKey(
                        "FK_IncompleteJobs_Employers_EmployerId",
                        x => x.EmployerId,
                        "Employers",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "IncompleteJobSalaries",
                table => new
                {
                    Id = table.Column<int>("int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ShowPayByOption = table.Column<int>("int", nullable: false),
                    MinimalAmount = table.Column<decimal>("decimal(10,2)", nullable: false),
                    MaximalAmount = table.Column<decimal>("decimal(10,2)", nullable: true),
                    SalaryRate = table.Column<int>("int", nullable: false),
                    IncompleteJobId = table.Column<int>("int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IncompleteJobSalaries", x => x.Id);
                    table.ForeignKey(
                        "FK_IncompleteJobSalaries_IncompleteJobs_IncompleteJobId",
                        x => x.IncompleteJobId,
                        "IncompleteJobs",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateIndex(
            "IX_Employers_Email",
            "Employers",
            "Email",
            unique: true);

        migrationBuilder.CreateIndex(
            "IX_Employers_OrganizationId",
            "Employers",
            "OrganizationId");

        migrationBuilder.CreateIndex(
            "IX_Employers_UserId",
            "Employers",
            "UserId",
            unique: true);

        migrationBuilder.CreateIndex(
            "IX_IncompleteJobs_EmployerId",
            "IncompleteJobs",
            "EmployerId",
            unique: true);

        migrationBuilder.CreateIndex(
            "IX_IncompleteJobSalaries_IncompleteJobId",
            "IncompleteJobSalaries",
            "IncompleteJobId",
            unique: true);

        migrationBuilder.CreateIndex(
            "IX_JobSeekers_AddressId",
            "JobSeekers",
            "AddressId");

        migrationBuilder.CreateIndex(
            "IX_JobSeekers_PhoneNumber",
            "JobSeekers",
            "PhoneNumber",
            unique: true);

        migrationBuilder.CreateIndex(
            "IX_JobSeekers_UserId",
            "JobSeekers",
            "UserId",
            unique: true);

        migrationBuilder.AddForeignKey(
            "FK_Interviews_JobSeekers_JobSeekerId",
            "Interviews",
            "JobSeekerId",
            "JobSeekers",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);

        migrationBuilder.AddForeignKey(
            "FK_JobApplies_JobSeekers_JobSeekerId",
            "JobApplies",
            "JobSeekerId",
            "JobSeekers",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);

        migrationBuilder.AddForeignKey(
            "FK_Jobs_Employers_EmployerId",
            "Jobs",
            "EmployerId",
            "Employers",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);

        migrationBuilder.AddForeignKey(
            "FK_Resumes_JobSeekers_JobSeekerId",
            "Resumes",
            "JobSeekerId",
            "JobSeekers",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);

        migrationBuilder.AddForeignKey(
            "FK_SavedJobs_JobSeekers_JobSeekerId",
            "SavedJobs",
            "JobSeekerId",
            "JobSeekers",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropForeignKey(
            "FK_Interviews_JobSeekers_JobSeekerId",
            "Interviews");

        migrationBuilder.DropForeignKey(
            "FK_JobApplies_JobSeekers_JobSeekerId",
            "JobApplies");

        migrationBuilder.DropForeignKey(
            "FK_Jobs_Employers_EmployerId",
            "Jobs");

        migrationBuilder.DropForeignKey(
            "FK_Resumes_JobSeekers_JobSeekerId",
            "Resumes");

        migrationBuilder.DropForeignKey(
            "FK_SavedJobs_JobSeekers_JobSeekerId",
            "SavedJobs");

        migrationBuilder.DropTable(
            "IncompleteJobSalaries");

        migrationBuilder.DropTable(
            "JobSeekers");

        migrationBuilder.DropTable(
            "IncompleteJobs");

        migrationBuilder.DropTable(
            "Employers");

        migrationBuilder.RenameColumn(
            "Id",
            "WorkExperiences",
            "WorkExperienceId");

        migrationBuilder.RenameColumn(
            "JobSeekerId",
            "SavedJobs",
            "JobSeekerAccountId");

        migrationBuilder.RenameIndex(
            "IX_SavedJobs_JobSeekerId",
            table: "SavedJobs",
            newName: "IX_SavedJobs_JobSeekerAccountId");

        migrationBuilder.RenameColumn(
            "JobSeekerId",
            "Resumes",
            "JobSeekerAccountId");

        migrationBuilder.RenameIndex(
            "IX_Resumes_JobSeekerId",
            table: "Resumes",
            newName: "IX_Resumes_JobSeekerAccountId");

        migrationBuilder.RenameColumn(
            "EmployerId",
            "Jobs",
            "EmployerAccountId");

        migrationBuilder.RenameIndex(
            "IX_Jobs_EmployerId",
            table: "Jobs",
            newName: "IX_Jobs_EmployerAccountId");

        migrationBuilder.RenameColumn(
            "JobSeekerId",
            "JobApplies",
            "JobSeekerAccountId");

        migrationBuilder.RenameIndex(
            "IX_JobApplies_JobSeekerId",
            table: "JobApplies",
            newName: "IX_JobApplies_JobSeekerAccountId");

        migrationBuilder.RenameColumn(
            "JobSeekerId",
            "Interviews",
            "JobSeekerAccountId");

        migrationBuilder.RenameIndex(
            "IX_Interviews_JobSeekerId",
            table: "Interviews",
            newName: "IX_Interviews_JobSeekerAccountId");

        migrationBuilder.CreateTable(
                "EmployerAccounts",
                table => new
                {
                    Id = table.Column<int>("int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    OrganizationId = table.Column<int>("int", nullable: false),
                    UserId = table.Column<int>("int", nullable: false),
                    ContactNumber = table.Column<string>("varchar(15)", maxLength: 15, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>("varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FullName = table.Column<string>("varchar(60)", maxLength: 60, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    HasPostedFirstJob = table.Column<bool>("tinyint(1)", nullable: false)
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
                    AddressId = table.Column<int>("int", nullable: true),
                    UserId = table.Column<int>("int", nullable: false),
                    FirstName = table.Column<string>("varchar(30)", maxLength: 30, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LastName = table.Column<string>("varchar(30)", maxLength: 30, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>("varchar(15)", maxLength: 15, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobSeekerAccounts", x => x.Id);
                    table.ForeignKey(
                        "FK_JobSeekerAccounts_Addresses_AddressId",
                        x => x.AddressId,
                        "Addresses",
                        "Id");
                    table.ForeignKey(
                        "FK_JobSeekerAccounts_Users_UserId",
                        x => x.UserId,
                        "Users",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "CurrentJobCreations",
                table => new
                {
                    Id = table.Column<int>("int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EmployerAccountId = table.Column<int>("int", nullable: false),
                    Benefits = table.Column<int>("int", nullable: false),
                    ContactEmail = table.Column<string>("varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>("text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    JobTitle = table.Column<string>("varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    JobTypes = table.Column<int>("int", nullable: false),
                    Language = table.Column<string>("varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Location = table.Column<string>("varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NumberOfOpenings = table.Column<int>("int", nullable: false),
                    ResumeRequired = table.Column<bool>("tinyint(1)", nullable: false),
                    Schedule = table.Column<int>("int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CurrentJobCreations", x => x.Id);
                    table.ForeignKey(
                        "FK_CurrentJobCreations_EmployerAccounts_EmployerAccountId",
                        x => x.EmployerAccountId,
                        "EmployerAccounts",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "CurrentJobSalaries",
                table => new
                {
                    Id = table.Column<int>("int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CurrentJobId = table.Column<int>("int", nullable: false),
                    MaximalAmount = table.Column<decimal>("decimal(10,2)", nullable: true),
                    MinimalAmount = table.Column<decimal>("decimal(10,2)", nullable: false),
                    SalaryRate = table.Column<int>("int", nullable: false),
                    ShowPayByOption = table.Column<int>("int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CurrentJobSalaries", x => x.Id);
                    table.ForeignKey(
                        "FK_CurrentJobSalaries_CurrentJobCreations_CurrentJobId",
                        x => x.CurrentJobId,
                        "CurrentJobCreations",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateIndex(
            "IX_CurrentJobCreations_EmployerAccountId",
            "CurrentJobCreations",
            "EmployerAccountId",
            unique: true);

        migrationBuilder.CreateIndex(
            "IX_CurrentJobSalaries_CurrentJobId",
            "CurrentJobSalaries",
            "CurrentJobId",
            unique: true);

        migrationBuilder.CreateIndex(
            "IX_EmployerAccounts_Email",
            "EmployerAccounts",
            "Email",
            unique: true);

        migrationBuilder.CreateIndex(
            "IX_EmployerAccounts_OrganizationId",
            "EmployerAccounts",
            "OrganizationId");

        migrationBuilder.CreateIndex(
            "IX_EmployerAccounts_UserId",
            "EmployerAccounts",
            "UserId",
            unique: true);

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

        migrationBuilder.AddForeignKey(
            "FK_Interviews_JobSeekerAccounts_JobSeekerAccountId",
            "Interviews",
            "JobSeekerAccountId",
            "JobSeekerAccounts",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);

        migrationBuilder.AddForeignKey(
            "FK_JobApplies_JobSeekerAccounts_JobSeekerAccountId",
            "JobApplies",
            "JobSeekerAccountId",
            "JobSeekerAccounts",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);

        migrationBuilder.AddForeignKey(
            "FK_Jobs_EmployerAccounts_EmployerAccountId",
            "Jobs",
            "EmployerAccountId",
            "EmployerAccounts",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);

        migrationBuilder.AddForeignKey(
            "FK_Resumes_JobSeekerAccounts_JobSeekerAccountId",
            "Resumes",
            "JobSeekerAccountId",
            "JobSeekerAccounts",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);

        migrationBuilder.AddForeignKey(
            "FK_SavedJobs_JobSeekerAccounts_JobSeekerAccountId",
            "SavedJobs",
            "JobSeekerAccountId",
            "JobSeekerAccounts",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
    }
}