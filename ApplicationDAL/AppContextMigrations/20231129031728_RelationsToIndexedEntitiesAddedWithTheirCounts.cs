#nullable disable

using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ApplicationDAL.AppContextMigrations;

/// <inheritdoc />
public partial class RelationsToIndexedEntitiesAddedWithTheirCounts : Migration
{
    /// <inheritdoc />
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AlterColumn<string>(
                "Description",
                "WorkExperiences",
                "varchar(2000)",
                maxLength: 2000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(2000)",
                oldMaxLength: 2000)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AlterColumn<bool>(
            "CurrentlyWorkHere",
            "WorkExperiences",
            "tinyint(1)",
            nullable: true,
            oldClrType: typeof(bool),
            oldType: "tinyint(1)");

        migrationBuilder.AlterColumn<string>(
                "Country",
                "WorkExperiences",
                "varchar(45)",
                maxLength: 45,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(45)",
                oldMaxLength: 45)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AlterColumn<string>(
                "Company",
                "WorkExperiences",
                "varchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(100)",
                oldMaxLength: 100)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AlterColumn<string>(
                "CityOrProvince",
                "WorkExperiences",
                "varchar(30)",
                maxLength: 30,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(30)",
                oldMaxLength: 30)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AlterColumn<string>(
                "SchoolName",
                "Educations",
                "varchar(70)",
                maxLength: 70,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(70)",
                oldMaxLength: 70)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AlterColumn<string>(
                "FieldOfStudy",
                "Educations",
                "varchar(30)",
                maxLength: 30,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(30)",
                oldMaxLength: 30)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AlterColumn<string>(
                "Country",
                "Educations",
                "varchar(45)",
                maxLength: 45,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(45)",
                oldMaxLength: 45)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AlterColumn<string>(
                "City",
                "Educations",
                "varchar(30)",
                maxLength: 30,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(30)",
                oldMaxLength: 30)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "IndexedJobWords",
                table => new
                {
                    Id = table.Column<int>("int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Word = table.Column<string>("varchar(40)", maxLength: 40, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    JobCount = table.Column<int>("int", nullable: false)
                },
                constraints: table => { table.PrimaryKey("PK_IndexedJobWords", x => x.Id); })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "IndexedResumeWords",
                table => new
                {
                    Id = table.Column<int>("int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Word = table.Column<string>("varchar(40)", maxLength: 40, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ResumesCount = table.Column<int>("int", nullable: false)
                },
                constraints: table => { table.PrimaryKey("PK_IndexedResumeWords", x => x.Id); })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "ProcessedJobsWords",
                table => new
                {
                    Id = table.Column<int>("int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    WordCount = table.Column<int>("int", nullable: false),
                    JobWordOccurrences = table.Column<int>("int", nullable: false),
                    JobId = table.Column<int>("int", nullable: false),
                    JobIndexedWordId = table.Column<int>("int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcessedJobsWords", x => x.Id);
                    table.ForeignKey(
                        "FK_ProcessedJobsWords_IndexedJobWords_JobIndexedWordId",
                        x => x.JobIndexedWordId,
                        "IndexedJobWords",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        "FK_ProcessedJobsWords_Jobs_JobId",
                        x => x.JobId,
                        "Jobs",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateTable(
                "ProcessedResumesWords",
                table => new
                {
                    Id = table.Column<int>("int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    WordCount = table.Column<int>("int", nullable: false),
                    ResumeIndexedWordId = table.Column<int>("int", nullable: false),
                    ResumeId = table.Column<int>("int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcessedResumesWords", x => x.Id);
                    table.ForeignKey(
                        "FK_ProcessedResumesWords_IndexedResumeWords_ResumeIndexedWordId",
                        x => x.ResumeIndexedWordId,
                        "IndexedResumeWords",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        "FK_ProcessedResumesWords_Resumes_ResumeId",
                        x => x.ResumeId,
                        "Resumes",
                        "Id",
                        onDelete: ReferentialAction.Cascade);
                })
            .Annotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.CreateIndex(
            "IX_IndexedJobWords_Word",
            "IndexedJobWords",
            "Word",
            unique: true);

        migrationBuilder.CreateIndex(
            "IX_IndexedResumeWords_Word",
            "IndexedResumeWords",
            "Word",
            unique: true);

        migrationBuilder.CreateIndex(
            "IX_ProcessedJobsWords_JobId",
            "ProcessedJobsWords",
            "JobId");

        migrationBuilder.CreateIndex(
            "IX_ProcessedJobsWords_JobIndexedWordId",
            "ProcessedJobsWords",
            "JobIndexedWordId");

        migrationBuilder.CreateIndex(
            "IX_ProcessedResumesWords_ResumeId",
            "ProcessedResumesWords",
            "ResumeId");

        migrationBuilder.CreateIndex(
            "IX_ProcessedResumesWords_ResumeIndexedWordId",
            "ProcessedResumesWords",
            "ResumeIndexedWordId");
    }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(
            "ProcessedJobsWords");

        migrationBuilder.DropTable(
            "ProcessedResumesWords");

        migrationBuilder.DropTable(
            "IndexedJobWords");

        migrationBuilder.DropTable(
            "IndexedResumeWords");

        migrationBuilder.UpdateData(
            "WorkExperiences",
            "Description",
            null,
            "Description",
            "");

        migrationBuilder.AlterColumn<string>(
                "Description",
                "WorkExperiences",
                "varchar(2000)",
                maxLength: 2000,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(2000)",
                oldMaxLength: 2000,
                oldNullable: true)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.AlterColumn<bool>(
            "CurrentlyWorkHere",
            "WorkExperiences",
            "tinyint(1)",
            nullable: false,
            defaultValue: false,
            oldClrType: typeof(bool),
            oldType: "tinyint(1)",
            oldNullable: true);

        migrationBuilder.UpdateData(
            "WorkExperiences",
            "Country",
            null,
            "Country",
            "");

        migrationBuilder.AlterColumn<string>(
                "Country",
                "WorkExperiences",
                "varchar(45)",
                maxLength: 45,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(45)",
                oldMaxLength: 45,
                oldNullable: true)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.UpdateData(
            "WorkExperiences",
            "Company",
            null,
            "Company",
            "");

        migrationBuilder.AlterColumn<string>(
                "Company",
                "WorkExperiences",
                "varchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(100)",
                oldMaxLength: 100,
                oldNullable: true)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.UpdateData(
            "WorkExperiences",
            "CityOrProvince",
            null,
            "CityOrProvince",
            "");

        migrationBuilder.AlterColumn<string>(
                "CityOrProvince",
                "WorkExperiences",
                "varchar(30)",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(30)",
                oldMaxLength: 30,
                oldNullable: true)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.UpdateData(
            "Educations",
            "SchoolName",
            null,
            "SchoolName",
            "");

        migrationBuilder.AlterColumn<string>(
                "SchoolName",
                "Educations",
                "varchar(70)",
                maxLength: 70,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(70)",
                oldMaxLength: 70,
                oldNullable: true)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.UpdateData(
            "Educations",
            "FieldOfStudy",
            null,
            "FieldOfStudy",
            "");

        migrationBuilder.AlterColumn<string>(
                "FieldOfStudy",
                "Educations",
                "varchar(30)",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(30)",
                oldMaxLength: 30,
                oldNullable: true)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.UpdateData(
            "Educations",
            "Country",
            null,
            "Country",
            "");

        migrationBuilder.AlterColumn<string>(
                "Country",
                "Educations",
                "varchar(45)",
                maxLength: 45,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(45)",
                oldMaxLength: 45,
                oldNullable: true)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");

        migrationBuilder.UpdateData(
            "Educations",
            "City",
            null,
            "City",
            "");

        migrationBuilder.AlterColumn<string>(
                "City",
                "Educations",
                "varchar(30)",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(30)",
                oldMaxLength: 30,
                oldNullable: true)
            .Annotation("MySql:CharSet", "utf8mb4")
            .OldAnnotation("MySql:CharSet", "utf8mb4");
    }
}