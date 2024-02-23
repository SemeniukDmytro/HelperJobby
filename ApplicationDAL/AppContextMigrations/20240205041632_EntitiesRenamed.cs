using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApplicationDAL.AppContextMigrations
{
    /// <inheritdoc />
    public partial class EntitiesRenamed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Interviews_JobSeekerAccounts_JobSeekerAccountId",
                table: "Interviews");

            migrationBuilder.DropForeignKey(
                name: "FK_JobApplies_JobSeekerAccounts_JobSeekerAccountId",
                table: "JobApplies");

            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_EmployerAccounts_EmployerAccountId",
                table: "Jobs");

            migrationBuilder.DropForeignKey(
                name: "FK_Resumes_JobSeekerAccounts_JobSeekerAccountId",
                table: "Resumes");

            migrationBuilder.DropForeignKey(
                name: "FK_SavedJobs_JobSeekerAccounts_JobSeekerAccountId",
                table: "SavedJobs");

            migrationBuilder.DropTable(
                name: "CurrentJobSalaries");

            migrationBuilder.DropTable(
                name: "JobSeekerAccounts");

            migrationBuilder.DropTable(
                name: "CurrentJobCreations");

            migrationBuilder.DropTable(
                name: "EmployerAccounts");

            migrationBuilder.RenameColumn(
                name: "WorkExperienceId",
                table: "WorkExperiences",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "JobSeekerAccountId",
                table: "SavedJobs",
                newName: "JobSeekerId");

            migrationBuilder.RenameIndex(
                name: "IX_SavedJobs_JobSeekerAccountId",
                table: "SavedJobs",
                newName: "IX_SavedJobs_JobSeekerId");

            migrationBuilder.RenameColumn(
                name: "JobSeekerAccountId",
                table: "Resumes",
                newName: "JobSeekerId");

            migrationBuilder.RenameIndex(
                name: "IX_Resumes_JobSeekerAccountId",
                table: "Resumes",
                newName: "IX_Resumes_JobSeekerId");

            migrationBuilder.RenameColumn(
                name: "EmployerAccountId",
                table: "Jobs",
                newName: "EmployerId");

            migrationBuilder.RenameIndex(
                name: "IX_Jobs_EmployerAccountId",
                table: "Jobs",
                newName: "IX_Jobs_EmployerId");

            migrationBuilder.RenameColumn(
                name: "JobSeekerAccountId",
                table: "JobApplies",
                newName: "JobSeekerId");

            migrationBuilder.RenameIndex(
                name: "IX_JobApplies_JobSeekerAccountId",
                table: "JobApplies",
                newName: "IX_JobApplies_JobSeekerId");

            migrationBuilder.RenameColumn(
                name: "JobSeekerAccountId",
                table: "Interviews",
                newName: "JobSeekerId");

            migrationBuilder.RenameIndex(
                name: "IX_Interviews_JobSeekerAccountId",
                table: "Interviews",
                newName: "IX_Interviews_JobSeekerId");

            migrationBuilder.CreateTable(
                name: "Employers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FullName = table.Column<string>(type: "varchar(60)", maxLength: 60, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ContactNumber = table.Column<string>(type: "varchar(15)", maxLength: 15, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    HasPostedFirstJob = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    OrganizationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Employers_Organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Organizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Employers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "JobSeekers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(type: "varchar(30)", maxLength: 30, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LastName = table.Column<string>(type: "varchar(30)", maxLength: 30, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>(type: "varchar(15)", maxLength: 15, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    AddressId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobSeekers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobSeekers_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_JobSeekers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "IncompleteJobs",
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
                    Schedule = table.Column<int>(type: "int", nullable: false),
                    Benefits = table.Column<int>(type: "int", nullable: false),
                    ContactEmail = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ResumeRequired = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EmployerId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IncompleteJobs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_IncompleteJobs_Employers_EmployerId",
                        column: x => x.EmployerId,
                        principalTable: "Employers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "IncompleteJobSalaries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ShowPayByOption = table.Column<int>(type: "int", nullable: false),
                    MinimalAmount = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    MaximalAmount = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    SalaryRate = table.Column<int>(type: "int", nullable: false),
                    IncompleteJobId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IncompleteJobSalaries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_IncompleteJobSalaries_IncompleteJobs_IncompleteJobId",
                        column: x => x.IncompleteJobId,
                        principalTable: "IncompleteJobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Employers_Email",
                table: "Employers",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employers_OrganizationId",
                table: "Employers",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_Employers_UserId",
                table: "Employers",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_IncompleteJobs_EmployerId",
                table: "IncompleteJobs",
                column: "EmployerId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_IncompleteJobSalaries_IncompleteJobId",
                table: "IncompleteJobSalaries",
                column: "IncompleteJobId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_JobSeekers_AddressId",
                table: "JobSeekers",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_JobSeekers_PhoneNumber",
                table: "JobSeekers",
                column: "PhoneNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_JobSeekers_UserId",
                table: "JobSeekers",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Interviews_JobSeekers_JobSeekerId",
                table: "Interviews",
                column: "JobSeekerId",
                principalTable: "JobSeekers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobApplies_JobSeekers_JobSeekerId",
                table: "JobApplies",
                column: "JobSeekerId",
                principalTable: "JobSeekers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_Employers_EmployerId",
                table: "Jobs",
                column: "EmployerId",
                principalTable: "Employers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Resumes_JobSeekers_JobSeekerId",
                table: "Resumes",
                column: "JobSeekerId",
                principalTable: "JobSeekers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SavedJobs_JobSeekers_JobSeekerId",
                table: "SavedJobs",
                column: "JobSeekerId",
                principalTable: "JobSeekers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Interviews_JobSeekers_JobSeekerId",
                table: "Interviews");

            migrationBuilder.DropForeignKey(
                name: "FK_JobApplies_JobSeekers_JobSeekerId",
                table: "JobApplies");

            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_Employers_EmployerId",
                table: "Jobs");

            migrationBuilder.DropForeignKey(
                name: "FK_Resumes_JobSeekers_JobSeekerId",
                table: "Resumes");

            migrationBuilder.DropForeignKey(
                name: "FK_SavedJobs_JobSeekers_JobSeekerId",
                table: "SavedJobs");

            migrationBuilder.DropTable(
                name: "IncompleteJobSalaries");

            migrationBuilder.DropTable(
                name: "JobSeekers");

            migrationBuilder.DropTable(
                name: "IncompleteJobs");

            migrationBuilder.DropTable(
                name: "Employers");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "WorkExperiences",
                newName: "WorkExperienceId");

            migrationBuilder.RenameColumn(
                name: "JobSeekerId",
                table: "SavedJobs",
                newName: "JobSeekerAccountId");

            migrationBuilder.RenameIndex(
                name: "IX_SavedJobs_JobSeekerId",
                table: "SavedJobs",
                newName: "IX_SavedJobs_JobSeekerAccountId");

            migrationBuilder.RenameColumn(
                name: "JobSeekerId",
                table: "Resumes",
                newName: "JobSeekerAccountId");

            migrationBuilder.RenameIndex(
                name: "IX_Resumes_JobSeekerId",
                table: "Resumes",
                newName: "IX_Resumes_JobSeekerAccountId");

            migrationBuilder.RenameColumn(
                name: "EmployerId",
                table: "Jobs",
                newName: "EmployerAccountId");

            migrationBuilder.RenameIndex(
                name: "IX_Jobs_EmployerId",
                table: "Jobs",
                newName: "IX_Jobs_EmployerAccountId");

            migrationBuilder.RenameColumn(
                name: "JobSeekerId",
                table: "JobApplies",
                newName: "JobSeekerAccountId");

            migrationBuilder.RenameIndex(
                name: "IX_JobApplies_JobSeekerId",
                table: "JobApplies",
                newName: "IX_JobApplies_JobSeekerAccountId");

            migrationBuilder.RenameColumn(
                name: "JobSeekerId",
                table: "Interviews",
                newName: "JobSeekerAccountId");

            migrationBuilder.RenameIndex(
                name: "IX_Interviews_JobSeekerId",
                table: "Interviews",
                newName: "IX_Interviews_JobSeekerAccountId");

            migrationBuilder.CreateTable(
                name: "EmployerAccounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    OrganizationId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ContactNumber = table.Column<string>(type: "varchar(15)", maxLength: 15, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FullName = table.Column<string>(type: "varchar(60)", maxLength: 60, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    HasPostedFirstJob = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployerAccounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployerAccounts_Organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Organizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EmployerAccounts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "JobSeekerAccounts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    AddressId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    FirstName = table.Column<string>(type: "varchar(30)", maxLength: 30, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LastName = table.Column<string>(type: "varchar(30)", maxLength: 30, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>(type: "varchar(15)", maxLength: 15, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobSeekerAccounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobSeekerAccounts_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_JobSeekerAccounts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CurrentJobCreations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EmployerAccountId = table.Column<int>(type: "int", nullable: false),
                    Benefits = table.Column<int>(type: "int", nullable: false),
                    ContactEmail = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "text", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    JobTitle = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    JobTypes = table.Column<int>(type: "int", nullable: false),
                    Language = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Location = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NumberOfOpenings = table.Column<int>(type: "int", nullable: false),
                    ResumeRequired = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Schedule = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CurrentJobCreations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CurrentJobCreations_EmployerAccounts_EmployerAccountId",
                        column: x => x.EmployerAccountId,
                        principalTable: "EmployerAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CurrentJobSalaries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CurrentJobId = table.Column<int>(type: "int", nullable: false),
                    MaximalAmount = table.Column<decimal>(type: "decimal(10,2)", nullable: true),
                    MinimalAmount = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    SalaryRate = table.Column<int>(type: "int", nullable: false),
                    ShowPayByOption = table.Column<int>(type: "int", nullable: false)
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

            migrationBuilder.CreateIndex(
                name: "IX_CurrentJobCreations_EmployerAccountId",
                table: "CurrentJobCreations",
                column: "EmployerAccountId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CurrentJobSalaries_CurrentJobId",
                table: "CurrentJobSalaries",
                column: "CurrentJobId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EmployerAccounts_Email",
                table: "EmployerAccounts",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EmployerAccounts_OrganizationId",
                table: "EmployerAccounts",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployerAccounts_UserId",
                table: "EmployerAccounts",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_JobSeekerAccounts_AddressId",
                table: "JobSeekerAccounts",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_JobSeekerAccounts_PhoneNumber",
                table: "JobSeekerAccounts",
                column: "PhoneNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_JobSeekerAccounts_UserId",
                table: "JobSeekerAccounts",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Interviews_JobSeekerAccounts_JobSeekerAccountId",
                table: "Interviews",
                column: "JobSeekerAccountId",
                principalTable: "JobSeekerAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JobApplies_JobSeekerAccounts_JobSeekerAccountId",
                table: "JobApplies",
                column: "JobSeekerAccountId",
                principalTable: "JobSeekerAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_EmployerAccounts_EmployerAccountId",
                table: "Jobs",
                column: "EmployerAccountId",
                principalTable: "EmployerAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Resumes_JobSeekerAccounts_JobSeekerAccountId",
                table: "Resumes",
                column: "JobSeekerAccountId",
                principalTable: "JobSeekerAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SavedJobs_JobSeekerAccounts_JobSeekerAccountId",
                table: "SavedJobs",
                column: "JobSeekerAccountId",
                principalTable: "JobSeekerAccounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
