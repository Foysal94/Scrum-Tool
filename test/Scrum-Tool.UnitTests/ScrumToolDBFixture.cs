***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
using Xunit;

namespace Scrum_Tool.UnitTests
***REMOVED***
	[Collection("ScrumToolDB Collection")]
	public class ScrumToolDBFixture
	***REMOVED***
		private ScrumToolDB m_ScrumToolDB;
		private const int m_FirstBoardID = 0;
		private const int m_FirstTaskID = 0;
		private const string m_FirstColumnName = "TestColumn0";
		public ScrumToolDB ScrumToolDB ***REMOVED*** get ***REMOVED*** return m_ScrumToolDB;***REMOVED*** ***REMOVED***
		public int FirstBoardID ***REMOVED*** get ***REMOVED***return m_FirstBoardID;***REMOVED*** ***REMOVED***
		public int FirstTaskID ***REMOVED*** get ***REMOVED***return m_FirstTaskID;***REMOVED*** ***REMOVED***
		public string ColumnName ***REMOVED*** get ***REMOVED***return m_FirstColumnName;***REMOVED*** ***REMOVED***
		
		public ScrumToolDBFixture() 
		***REMOVED***
			var dbOptions = CreateFakeDatabaseOptions();
			m_ScrumToolDB = new ScrumToolDB(dbOptions);
			AddTestData();
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
		private void AddTestData()
		***REMOVED***
			var boardData = CreateBoardData();
			var columnData = CreateColumnData();
			var taskData = CreateTaskData();

			m_ScrumToolDB.Boards.AddRange(boardData);
			m_ScrumToolDB.Columns.AddRange(columnData);
			m_ScrumToolDB.Tasks.AddRange(taskData);
			m_ScrumToolDB.SaveChanges();
		***REMOVED***
		private IQueryable<Boards> CreateBoardData()
		***REMOVED***
			List<Boards> board = new List<Boards>()
			***REMOVED***
				new Boards("TestBoard1")
			***REMOVED***;

			return board.AsQueryable();
		***REMOVED***
		private IQueryable<Columns> CreateColumnData()
		***REMOVED***
			List<Columns> columns = new List<Columns>()
			***REMOVED***
				new Columns(m_FirstColumnName, m_FirstBoardID),
				new Columns("TestColumn1", m_FirstBoardID),
				new Columns("TestColumn2", m_FirstBoardID), 
			***REMOVED***;

			return columns.AsQueryable();
		***REMOVED***
		private IQueryable<Tasks> CreateTaskData()
		***REMOVED***
			List<Tasks> tasks = new List<Tasks>()
			***REMOVED***
				new Tasks(m_FirstBoardID, m_FirstColumnName, "TaskContent1"),
				new Tasks(m_FirstBoardID, m_FirstColumnName, "TaskContent2"),
				new Tasks(m_FirstBoardID, m_FirstColumnName, "TaskContent3"),
			***REMOVED***

			return tasks.AsQueryable();
		***REMOVED***

		


	***REMOVED***
***REMOVED***