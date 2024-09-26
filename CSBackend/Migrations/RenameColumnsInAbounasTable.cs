using Microsoft.EntityFrameworkCore.Migrations;

namespace YourNamespace.Migrations
{
    public partial class RenameColumnsInAbounasTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "oldColumnNameForPassword",  // replace with the current name of the Password column
                table: "Abounas",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "username",  // current name of the Username column
                table: "Abounas",
                newName: "Username");

            migrationBuilder.RenameColumn(
                name: "passwordsalt",  // current name of the PasswordSalt column
                table: "Abounas",
                newName: "PasswordSalt");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Password",  // new name of the Password column
                table: "Abounas",
                newName: "oldColumnNameForPassword");  // replace with the original name

            migrationBuilder.RenameColumn(
                name: "Username",  // new name of the Username column
                table: "Abounas",
                newName: "username");  // revert to original name

            migrationBuilder.RenameColumn(
                name: "PasswordSalt",  // new name of the PasswordSalt column
                table: "Abounas",
                newName: "passwordsalt");  // revert to original name
        }
    }
}
