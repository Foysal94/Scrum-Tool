***REMOVED***
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;
***REMOVED***

namespace ASPNET5ScrumTool.Migrations
***REMOVED***
    [DbContext(typeof(ScrumToolDB))]
    [Migration("20160309224439_InitalMigration")]
    partial class InitalMigration
***REMOVED***
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
***REMOVED***
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0-rc1-16348")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ASPNET5_Scrum_Tool.Models.Boards", b =>
***REMOVED***
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("ID");
***REMOVED***);

            modelBuilder.Entity("ASPNET5_Scrum_Tool.Models.Columns", b =>
***REMOVED***
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BoardID");

                    b.Property<string>("ColumnName")
                        .IsRequired();

                    b.Property<string>("Name");

                    b.HasKey("ID");
***REMOVED***);

            modelBuilder.Entity("ASPNET5_Scrum_Tool.Models.Tasks", b =>
***REMOVED***
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BoardID");

                    b.Property<string>("ColumnName");

                    b.Property<string>("TaskContent");

                    b.HasKey("ID");
***REMOVED***);

            modelBuilder.Entity("ASPNET5_Scrum_Tool.Models.Columns", b =>
***REMOVED***
                    b.HasOne("ASPNET5_Scrum_Tool.Models.Boards")
                        .WithMany()
                        .HasForeignKey("BoardID");
***REMOVED***);

            modelBuilder.Entity("ASPNET5_Scrum_Tool.Models.Tasks", b =>
***REMOVED***
                    b.HasOne("ASPNET5_Scrum_Tool.Models.Columns")
                        .WithMany()
                        .HasForeignKey("ColumnName")
                        .HasPrincipalKey("ColumnName");
***REMOVED***);
***REMOVED***
***REMOVED***
***REMOVED***
