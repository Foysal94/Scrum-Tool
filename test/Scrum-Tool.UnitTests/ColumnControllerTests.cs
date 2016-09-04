***REMOVED***
***REMOVED***
***REMOVED***
using Microsoft.AspNetCore.Mvc;
***REMOVED***
using ASPNET5_Scrum_Tool.Controllers;
***REMOVED***
using FluentAssertions;
using Xunit;
using Moq;
using GenFu;

namespace Scrum_Tool.UnitTests
***REMOVED***

    public interface ITestRespository<T> 
***REMOVED***
        void Add(T model);
        void Remove(T model);
        void Edit(T model);
        void Delete(T model);
        T FindById(int id);
        T FindObject(T model);
        void ReturnCount();
        IQueryable<T> ReturnAll();
        void Save();

***REMOVED***
    
    public class ColumnControllerTests 
***REMOVED***
        private const int m_BoardID = 0;
		  private ScrumToolDB m_ScrumToolDB;
		  private ColumnController m_ColumnController;
        public ColumnControllerTests() 
***REMOVED***
			  var dbOptions = CreateFakeDatabaseOptions();
			  m_ScrumToolDB = new ScrumToolDB(dbOptions);
			  m_ColumnController = new ColumnController(m_ScrumToolDB);
***REMOVED***

        private IQueryable<Columns> GenerateMockData() 
***REMOVED***
            int id = 0;
            int numberOfColumns = 3;
            string Name = "TestColumn";

            A.Configure<Columns>()
                .Fill(c => c.ID,
                     () => ***REMOVED*** return id++; ***REMOVED***)
                .Fill(c => c.Name, () => ***REMOVED*** return $"***REMOVED***Name***REMOVED******REMOVED***id++***REMOVED***"; ***REMOVED***)
                .Fill(c => c.BoardID, m_BoardID);

            var columns = A.ListOf<Columns>(numberOfColumns);
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

***REMOVED***
***REMOVED***

