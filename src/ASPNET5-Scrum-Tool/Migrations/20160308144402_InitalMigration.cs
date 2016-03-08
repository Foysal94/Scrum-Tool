***REMOVED***
***REMOVED***
using Microsoft.Data.Entity.Migrations;
using Microsoft.Data.Entity.Metadata;

namespace ASPNET5ScrumTool.Migrations
***REMOVED***
    public partial class InitalMigration : Migration
***REMOVED***
        protected override void Up(MigrationBuilder migrationBuilder)
***REMOVED***
            migrationBuilder.CreateTable(
                name: "Boards",
                columns: table => new
***REMOVED***
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreationDate = table.Column<DateTime>(nullable: true),
                    Name = table.Column<string>(nullable: false)
***REMOVED***,
                constraints: table =>
***REMOVED***
                    table.PrimaryKey("PK_Boards", x => x.ID);
***REMOVED***);
            migrationBuilder.CreateTable(
                name: "Columns",
                columns: table => new
***REMOVED***
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BoardID = table.Column<int>(nullable: false),
                    ColumnName = table.Column<string>(nullable: false),
***REMOVED***,
                constraints: table =>
***REMOVED***
                    table.PrimaryKey("PK_Columns", x => x.ID);
                    table.UniqueConstraint("AK_Columns_ColumnName", x => x.ColumnName);
                    table.ForeignKey(
                        name: "FK_Columns_Boards_BoardID",
                        column: x => x.BoardID,
                        principalTable: "Boards",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
***REMOVED***);
            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
***REMOVED***
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    BoardID = table.Column<int>(nullable: false),
                    ColumnName = table.Column<string>(nullable: true),
                    DueDate = table.Column<DateTime>(nullable: true),
                    TaskContent = table.Column<string>(nullable: true)
***REMOVED***,
                constraints: table =>
***REMOVED***
                    table.PrimaryKey("PK_Tasks", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Tasks_Columns_ColumnName",
                        column: x => x.ColumnName,
                        principalTable: "Columns",
                        principalColumn: "ColumnName",
                        onDelete: ReferentialAction.Restrict);
***REMOVED***);
***REMOVED***

        protected override void Down(MigrationBuilder migrationBuilder)
***REMOVED***
            migrationBuilder.DropTable("Tasks");
            migrationBuilder.DropTable("Columns");
            migrationBuilder.DropTable("Boards");
***REMOVED***
***REMOVED***
***REMOVED***
