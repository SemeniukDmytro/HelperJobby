using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApplicationDAL.Migrations
{
    /// <inheritdoc />
    public partial class ContactNumberAddedToEmployerAccount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ContactNumber",
                table: "EmployerAccounts",
                type: "varchar(15)",
                maxLength: 15,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContactNumber",
                table: "EmployerAccounts");
        }
    }
}
