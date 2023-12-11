using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApplicationDAL.AppContextMigrations
{
    /// <inheritdoc />
    public partial class RelationsToIndexedEntitiesAddedWithTheirCounts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "WorkExperiences",
                type: "varchar(2000)",
                maxLength: 2000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(2000)",
                oldMaxLength: 2000)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<bool>(
                name: "CurrentlyWorkHere",
                table: "WorkExperiences",
                type: "tinyint(1)",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AlterColumn<string>(
                name: "Country",
                table: "WorkExperiences",
                type: "varchar(45)",
                maxLength: 45,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(45)",
                oldMaxLength: 45)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Company",
                table: "WorkExperiences",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(100)",
                oldMaxLength: 100)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "CityOrProvince",
                table: "WorkExperiences",
                type: "varchar(30)",
                maxLength: 30,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(30)",
                oldMaxLength: 30)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "SchoolName",
                table: "Educations",
                type: "varchar(70)",
                maxLength: 70,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(70)",
                oldMaxLength: 70)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "FieldOfStudy",
                table: "Educations",
                type: "varchar(30)",
                maxLength: 30,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(30)",
                oldMaxLength: 30)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Country",
                table: "Educations",
                type: "varchar(45)",
                maxLength: 45,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(45)",
                oldMaxLength: 45)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "City",
                table: "Educations",
                type: "varchar(30)",
                maxLength: 30,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(30)",
                oldMaxLength: 30)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "IndexedJobWords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Word = table.Column<string>(type: "varchar(40)", maxLength: 40, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    JobCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IndexedJobWords", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "IndexedResumeWords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Word = table.Column<string>(type: "varchar(40)", maxLength: 40, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ResumesCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IndexedResumeWords", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ProcessedJobsWords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    WordCount = table.Column<int>(type: "int", nullable: false),
                    JobWordOccurrences = table.Column<int>(type: "int", nullable: false),
                    JobId = table.Column<int>(type: "int", nullable: false),
                    JobIndexedWordId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcessedJobsWords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProcessedJobsWords_IndexedJobWords_JobIndexedWordId",
                        column: x => x.JobIndexedWordId,
                        principalTable: "IndexedJobWords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProcessedJobsWords_Jobs_JobId",
                        column: x => x.JobId,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ProcessedResumesWords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    WordCount = table.Column<int>(type: "int", nullable: false),
                    ResumeIndexedWordId = table.Column<int>(type: "int", nullable: false),
                    ResumeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProcessedResumesWords", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProcessedResumesWords_IndexedResumeWords_ResumeIndexedWordId",
                        column: x => x.ResumeIndexedWordId,
                        principalTable: "IndexedResumeWords",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProcessedResumesWords_Resumes_ResumeId",
                        column: x => x.ResumeId,
                        principalTable: "Resumes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_IndexedJobWords_Word",
                table: "IndexedJobWords",
                column: "Word",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_IndexedResumeWords_Word",
                table: "IndexedResumeWords",
                column: "Word",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProcessedJobsWords_JobId",
                table: "ProcessedJobsWords",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_ProcessedJobsWords_JobIndexedWordId",
                table: "ProcessedJobsWords",
                column: "JobIndexedWordId");

            migrationBuilder.CreateIndex(
                name: "IX_ProcessedResumesWords_ResumeId",
                table: "ProcessedResumesWords",
                column: "ResumeId");

            migrationBuilder.CreateIndex(
                name: "IX_ProcessedResumesWords_ResumeIndexedWordId",
                table: "ProcessedResumesWords",
                column: "ResumeIndexedWordId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProcessedJobsWords");

            migrationBuilder.DropTable(
                name: "ProcessedResumesWords");

            migrationBuilder.DropTable(
                name: "IndexedJobWords");

            migrationBuilder.DropTable(
                name: "IndexedResumeWords");

            migrationBuilder.UpdateData(
                table: "WorkExperiences",
                keyColumn: "Description",
                keyValue: null,
                column: "Description",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "WorkExperiences",
                type: "varchar(2000)",
                maxLength: 2000,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(2000)",
                oldMaxLength: 2000,
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<bool>(
                name: "CurrentlyWorkHere",
                table: "WorkExperiences",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "WorkExperiences",
                keyColumn: "Country",
                keyValue: null,
                column: "Country",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Country",
                table: "WorkExperiences",
                type: "varchar(45)",
                maxLength: 45,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(45)",
                oldMaxLength: 45,
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "WorkExperiences",
                keyColumn: "Company",
                keyValue: null,
                column: "Company",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Company",
                table: "WorkExperiences",
                type: "varchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(100)",
                oldMaxLength: 100,
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "WorkExperiences",
                keyColumn: "CityOrProvince",
                keyValue: null,
                column: "CityOrProvince",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "CityOrProvince",
                table: "WorkExperiences",
                type: "varchar(30)",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(30)",
                oldMaxLength: 30,
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Educations",
                keyColumn: "SchoolName",
                keyValue: null,
                column: "SchoolName",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "SchoolName",
                table: "Educations",
                type: "varchar(70)",
                maxLength: 70,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(70)",
                oldMaxLength: 70,
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Educations",
                keyColumn: "FieldOfStudy",
                keyValue: null,
                column: "FieldOfStudy",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "FieldOfStudy",
                table: "Educations",
                type: "varchar(30)",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(30)",
                oldMaxLength: 30,
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Educations",
                keyColumn: "Country",
                keyValue: null,
                column: "Country",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Country",
                table: "Educations",
                type: "varchar(45)",
                maxLength: 45,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(45)",
                oldMaxLength: 45,
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Educations",
                keyColumn: "City",
                keyValue: null,
                column: "City",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "City",
                table: "Educations",
                type: "varchar(30)",
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
}
