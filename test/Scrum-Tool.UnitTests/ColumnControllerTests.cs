***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
using Microsoft.AspNetCore.Mvc;
using ASPNET5_Scrum_Tool.Controllers;
***REMOVED***
using FluentAssertions;
using Xunit;
using Moq;
using GenFu;

namespace Scrum_Tool.UnitTests
***REMOVED***

    public class ColumnControllerTests 
***REMOVED***
		  private const int m_BoardID = 0;
		  private ScrumToolDB m_ScrumToolDB;
		  private ColumnController m_ColumnController;

		  private IQueryable<Columns> GenerateTestData() 
  ***REMOVED***
***REMOVED***
            int id = 0;
            int numberOfColumns = 3;
            string Name = "TestColumn";
            
            A.Configure<Columns>()
                .Fill(c => c.ID,() => ***REMOVED*** return id++; ***REMOVED***)
                .Fill(c => c.Name, () => ***REMOVED*** return $"***REMOVED***Name***REMOVED******REMOVED***id***REMOVED***"; ***REMOVED***)
                .Fill(c => c.BoardID,() => ***REMOVED*** return m_BoardID; ***REMOVED***);
            var columns = A.ListOf<Columns>(numberOfColumns);
            return columns.AsQueryable();
***REMOVED***

              List<Columns> columns = new List<Columns>()
  ***REMOVED***
                  new Columns("TestColumn0", m_BoardID) ***REMOVED***ID = 0***REMOVED***,
                  new Columns("TestColumn1", m_BoardID) ***REMOVED***ID = 1***REMOVED***,
                  new Columns("TestColumn2", m_BoardID) ***REMOVED***ID = 2***REMOVED***,
  ***REMOVED***;

              return columns.AsQueryable();
  ***REMOVED***

        private DbContextOptions<ScrumToolDB> CreateFakeDatabaseOptions() 
		  ***REMOVED***
			  // Create a fresh service provider, and therefore a fresh 
            // InMemory database instance.
            var serviceProvider = new ServiceCollection()
                .AddEntityFrameworkInMemoryDatabase()
                .BuildServiceProvider();

            // Create a new options instance telling the context to use an
            // InMemory database and the new service provider.
            var builder = new DbContextOptionsBuilder<ScrumToolDB>();
            builder.UseInMemoryDatabase()
                   .UseInternalServiceProvider(serviceProvider);

            return builder.Options;
		  ***REMOVED***

        public ColumnControllerTests() 
***REMOVED***
			  var dbOptions = CreateFakeDatabaseOptions();
			  var testColumnList = GenerateTestData();

			  m_ScrumToolDB = new ScrumToolDB(dbOptions);
			  m_ScrumToolDB.Columns.AddRange(testColumnList);
			  m_ColumnController = new ColumnController(m_ScrumToolDB);
***REMOVED***





***REMOVED***
***REMOVED***

