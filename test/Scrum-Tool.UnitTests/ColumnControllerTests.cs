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
				/*
				int id = 0;
				int numberOfColumns = 3;
				string Name = "TestColumn";
				
				A.Configure<Columns>()
					 .Fill(c => c.ID,() => ***REMOVED*** return id++; ***REMOVED***)
					 .Fill(c => c.Name, () => ***REMOVED*** return $"***REMOVED***Name***REMOVED******REMOVED***id***REMOVED***"; ***REMOVED***)
					 .Fill(c => c.BoardID,() => ***REMOVED*** return m_BoardID; ***REMOVED***);
				var columns = A.ListOf<Columns>(numberOfColumns);
				return columns.AsQueryable();
				*/

			List<Columns> columns = new List<Columns>()
			***REMOVED***
				new Columns("TestColumn0", m_BoardID),
				new Columns("TestColumn1", m_BoardID),
				new Columns("TestColumn2", m_BoardID), 
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
			m_ScrumToolDB.SaveChanges();
			m_ColumnController = new ColumnController(m_ScrumToolDB);
		***REMOVED***

		[Fact]
		public void DeleteColumn()
		***REMOVED***
			// Arrange
			Columns testColumn = m_ScrumToolDB.Columns.Last();
			// Act
			m_ColumnController.Delete(testColumn.ID);
			// Assert
			m_ScrumToolDB.Columns.Should().HaveCount(2, "Inital column list count is 3, and deleted one")
					.And.NotContain(testColumn);
					 
		***REMOVED***

		[Fact]
		public void AddColumn()
		***REMOVED***
			// Arrange
			Columns testColumn = new Columns("Something", m_BoardID);
			//Act
			m_ColumnController.AddColumn(testColumn);
			// Assert
			m_ScrumToolDB.Columns.Should().NotBeNullOrEmpty()
					.And.HaveCount(4, "Number of inital columns created plus one");
			m_ScrumToolDB.Columns.Last().ShouldBeEquivalentTo(testColumn, options =>
					options.Excluding(c => c.ID));
		***REMOVED***



	 ***REMOVED***

***REMOVED***

