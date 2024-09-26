using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CSBackend.Migrations
{
    /// <inheritdoc />
    public partial class RemoveTableMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Abounas",
                columns: table => new
                {
                    AbounaId = table.Column<string>(type: "text", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Username = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    PasswordSalt = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Availability = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Abounas", x => x.AbounaId);
                });

            migrationBuilder.CreateTable(
                name: "Meetings",
                columns: table => new
                {
                    MeetingId = table.Column<string>(type: "text", nullable: false),
                    MeetingType = table.Column<string>(type: "text", nullable: false),
                    AbounaId = table.Column<string>(type: "text", nullable: false),
                    SchedulingUserName = table.Column<string>(type: "text", nullable: false),
                    SchedulingUserEmail = table.Column<string>(type: "text", nullable: false),
                    StartTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DayOfMeeting = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Meetings", x => x.MeetingId);
                });

            migrationBuilder.CreateTable(
                name: "AbounaMeetings",
                columns: table => new
                {
                    AbounaId = table.Column<string>(type: "text", nullable: false),
                    MeetingId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AbounaMeetings", x => new { x.AbounaId, x.MeetingId });
                    table.ForeignKey(
                        name: "FK_AbounaMeetings_Abounas_AbounaId",
                        column: x => x.AbounaId,
                        principalTable: "Abounas",
                        principalColumn: "AbounaId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AbounaMeetings_Meetings_MeetingId",
                        column: x => x.MeetingId,
                        principalTable: "Meetings",
                        principalColumn: "MeetingId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AbounaMeetings_MeetingId",
                table: "AbounaMeetings",
                column: "MeetingId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AbounaMeetings");

            migrationBuilder.DropTable(
                name: "Abounas");

            migrationBuilder.DropTable(
                name: "Meetings");
        }
    }
}
