***REMOVED***
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Migrations;
***REMOVED***

namespace ASPNET5ScrumTool.Migrations
***REMOVED***
    [DbContext(typeof(ScrumToolDB))]
    partial class ScrumToolDBModelSnapshot : ModelSnapshot
***REMOVED***
        protected override void BuildModel(ModelBuilder modelBuilder)
***REMOVED***
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0-rc1-16348")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ASPNET5_Scrum_Tool.Models.Boards", b =>
***REMOVED***
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("CreationDate");

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

                    b.Property<DateTime>("DueDate");

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