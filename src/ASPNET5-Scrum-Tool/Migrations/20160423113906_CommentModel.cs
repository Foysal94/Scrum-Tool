***REMOVED***
***REMOVED***
using Microsoft.Data.Entity.Migrations;
using Microsoft.Data.Entity.Metadata;

namespace ASPNET5ScrumTool.Migrations
***REMOVED***
    public partial class CommentModel : Migration
***REMOVED***
        protected override void Up(MigrationBuilder migrationBuilder)
***REMOVED***
            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
***REMOVED***
                    ID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Content = table.Column<string>(nullable: false),
                    CreationDate = table.Column<DateTime>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    TaskID = table.Column<int>(nullable: false)
***REMOVED***,
                constraints: table =>
***REMOVED***
                    table.PrimaryKey("PK_Comments", x => x.ID);
***REMOVED***);
***REMOVED***

        protected override void Down(MigrationBuilder migrationBuilder)
***REMOVED***
            migrationBuilder.DropTable("Comments");
***REMOVED***
***REMOVED***
***REMOVED***
