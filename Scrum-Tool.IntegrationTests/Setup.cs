***REMOVED***
***REMOVED***
using System.Data;
***REMOVED***
using System.Net.Http;
using System.Security.Cryptography;
***REMOVED***
using ASPNET5_Scrum_Tool;
***REMOVED***
using GenFu;
using Microsoft.AspNet.TestHost;
using Microsoft.Data.Entity;
***REMOVED***
using GenFu = GenFu.GenFu;


namespace Scrum_Tool.UnitTests
***REMOVED***
    public abstract class Setup
***REMOVED***
        protected  TestServer m_Server;
        protected  HttpClient m_Client;
        protected ScrumToolDB m_Context;

        private DbContextOptionsBuilder<ScrumToolDB> builder;

        private readonly IServiceProvider m_ServiceProvider;
        /*
        public Setup()
***REMOVED***
            // Arrange
            
            //m_Server = new TestServer(TestServer.CreateBuilder()
            //    .UseStartup<Startup>());
           // m_Client = m_Server.CreateClient();

           //var services = new ServiceCollection();

           //services.AddEntityFramework()
            //.AddInMemoryDatabase()
           // .AddDbContext<db>(options => options.UseInMemoryDatabase());


            //m_ServiceProvider = services.BuildServiceProvider();
            //m_Context = new ScrumToolDB();
            var db = new DbContextOptionsBuilder();
            db.UseInMemoryDatabase();
            m_Context = new ScrumToolDB(db.Options);

            CreateTestData(m_Context);

***REMOVED***
        */

        public void CreateTestData(ScrumToolDB dbContext)
***REMOVED***
            
            // CreateBoards(dbContext);
             //CreateColumns(dbContext);
            // CreateTasks(dbContext);

            dbContext.Boards.Add(new Boards("HelloWorld"));

            dbContext.Columns.Add(new Columns("Test1", 1));

            dbContext.Columns.Add(new Columns("Test2", 1));

            dbContext.Tasks.Add(new Tasks(1, "Test1", "SomethingToDo1"));

            dbContext.Tasks.Add(new Tasks(1, "Test1", "SomethingToDo2"));

            dbContext.Tasks.Add(new Tasks(1, "Test1", "SomethingToDo3"));

            dbContext.SaveChanges();

***REMOVED***

        public void CreateBoards(ScrumToolDB dbContext)
***REMOVED***
            int id = 0;
            string Name = "HelloWorld";

            A.Configure<Boards>()
                .Fill(b => b.ID, 
                     () => ***REMOVED*** return id++; ***REMOVED***);

            A.Configure<Boards>()
                .Fill(b => b.CreationDate, DateTime.Now);

              A.Configure<Boards>()
                .Fill(b => b.Name, () => ***REMOVED*** return $"***REMOVED***Name***REMOVED******REMOVED***id++***REMOVED***"; ***REMOVED*** );

            var boards = A.ListOf<Boards>(3);
 
            dbContext.Boards.AddRange(boards);
            dbContext.SaveChanges();

***REMOVED***

        private void CreateColumns(ScrumToolDB dbContext)
***REMOVED***
            int id = 0;
            string Name = "Something";

            A.Configure<Columns>()
                .Fill(c => c.ID, 
                     () => ***REMOVED*** return id++; ***REMOVED***);

            A.Configure<Columns>()
                .Fill(c => c.Name, () => ***REMOVED*** return $"***REMOVED***Name***REMOVED******REMOVED***id++***REMOVED***"; ***REMOVED*** );

            A.Configure<Columns>()
                .Fill(c => c.BoardID, 1 );

            var columns = A.ListOf <Columns>(3);

            dbContext.Columns.AddRange(columns);
            dbContext.SaveChanges();

***REMOVED***

        private void CreateTasks(ScrumToolDB dbContext)
***REMOVED***
            int id = 0;
            string content = "Something To Do Tomorrow";

            A.Configure<Tasks>()
                .Fill(t => t.ID, 
                     () => ***REMOVED*** return id++; ***REMOVED***);

            A.Configure<Tasks>()
                .Fill(t => t.BoardID,1);

            A.Configure<Tasks>()
                .Fill(t => t.ColumnName,"Something1");
    
***REMOVED***


***REMOVED***
***REMOVED***
