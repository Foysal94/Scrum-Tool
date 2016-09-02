***REMOVED***
***REMOVED***
***REMOVED***
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
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

                    b.Property<int?>("BoardsID");

                    b.Property<string>("Name");

                    b.HasKey("ID");
***REMOVED***);

            modelBuilder.Entity("ASPNET5_Scrum_Tool.Models.Comments", b =>
***REMOVED***
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Content");

                    b.Property<DateTime>("CreationDate");

                    b.Property<string>("Name");

                    b.Property<int>("TaskID");

                    b.Property<int?>("TasksID");

                    b.HasKey("ID");
***REMOVED***);

            modelBuilder.Entity("ASPNET5_Scrum_Tool.Models.Labels", b =>
***REMOVED***
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Colour");

                    b.Property<int>("TaskID");

                    b.Property<int?>("TasksID");

                    b.HasKey("ID");
***REMOVED***);

            modelBuilder.Entity("ASPNET5_Scrum_Tool.Models.Tasks", b =>
***REMOVED***
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("BoardID");

                    b.Property<string>("ColumnName");

                    b.Property<int?>("ColumnsID");

                    b.Property<DateTime>("DueDate");

                    b.Property<string>("TaskContent");

                    b.HasKey("ID");
***REMOVED***);

            modelBuilder.Entity("ASPNET5_Scrum_Tool.Models.Columns", b =>
***REMOVED***
                    b.HasOne("ASPNET5_Scrum_Tool.Models.Boards")
                        .WithMany()
                        .HasForeignKey("BoardsID");
***REMOVED***);

            modelBuilder.Entity("ASPNET5_Scrum_Tool.Models.Comments", b =>
***REMOVED***
                    b.HasOne("ASPNET5_Scrum_Tool.Models.Tasks")
                        .WithMany()
                        .HasForeignKey("TasksID");
***REMOVED***);

            modelBuilder.Entity("ASPNET5_Scrum_Tool.Models.Labels", b =>
***REMOVED***
                    b.HasOne("ASPNET5_Scrum_Tool.Models.Tasks")
                        .WithMany()
                        .HasForeignKey("TasksID");
***REMOVED***);

            modelBuilder.Entity("ASPNET5_Scrum_Tool.Models.Tasks", b =>
***REMOVED***
                    b.HasOne("ASPNET5_Scrum_Tool.Models.Columns")
                        .WithMany()
                        .HasForeignKey("ColumnsID");
***REMOVED***);
***REMOVED***
***REMOVED***
***REMOVED***
