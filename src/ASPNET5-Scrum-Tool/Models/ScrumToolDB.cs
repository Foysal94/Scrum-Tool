using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Infrastructure;

***REMOVED***.Models
***REMOVED***
    public class ScrumToolDB : DbContext
***REMOVED***
        /*
        protected override void OnModelCreating(ModelBuilder modelBuilder)
***REMOVED***
            modelBuilder.Entity<Boards>(entity =>
***REMOVED***
                entity.HasMany(b => b.ColumnList).WithOne(c => c.ParentBoard).HasForeignKey("BoardID");
***REMOVED***);

            modelBuilder.Entity<Columns>(entity =>
***REMOVED***
                entity.HasMany(c => c.TasksList).WithOne(t => t.ParentColumn).HasForeignKey("ColumnName");
***REMOVED***);

    
***REMOVED***
        */

        public ScrumToolDB(DbContextOptions options) : base(options)
***REMOVED***
            
***REMOVED***
        public DbSet<Boards> Boards ***REMOVED*** get; set; ***REMOVED***

        public DbSet<Columns> Columns ***REMOVED*** get; set; ***REMOVED***

        public DbSet<Tasks> Tasks ***REMOVED*** get; set; ***REMOVED***

        public DbSet<Labels> Labels ***REMOVED*** get; set; ***REMOVED*** 
        
        public DbSet<Comments> Comments ***REMOVED*** get; set; ***REMOVED*** 

***REMOVED***
***REMOVED***
