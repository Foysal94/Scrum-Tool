***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
using Xunit;

namespace Scrum_Tool.UnitTests
***REMOVED***
	
	public class ScrumToolDBFixture 
	***REMOVED***
		private ScrumToolDB m_ScrumToolDB;
		private const int m_FirstBoardID = 1;
		private const int m_FirstTaskID = 1;
		private const string m_FirstColumnName = "TestColumn1";
		public ScrumToolDB ScrumToolDB ***REMOVED*** get ***REMOVED*** return m_ScrumToolDB;***REMOVED*** ***REMOVED***
		public int FirstBoardID ***REMOVED*** get ***REMOVED***return m_FirstBoardID;***REMOVED*** ***REMOVED***
		public int FirstTaskID ***REMOVED*** get ***REMOVED***return m_FirstTaskID;***REMOVED*** ***REMOVED***
		public string FirstColumnName ***REMOVED*** get ***REMOVED***return m_FirstColumnName;***REMOVED*** ***REMOVED***
		
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
			var labelData = CreateLabelData();
			var commentData = CreateCommentData();

			m_ScrumToolDB.Boards.AddRange(boardData);
			m_ScrumToolDB.Columns.AddRange(columnData);
			m_ScrumToolDB.Tasks.AddRange(taskData);
			m_ScrumToolDB.Labels.AddRange(labelData);
			m_ScrumToolDB.Comments.AddRange(commentData);
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
				new Columns("TestColumn2", m_FirstBoardID),
				new Columns("TestColumn3", m_FirstBoardID), 
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
			***REMOVED***;

			return tasks.AsQueryable();
		***REMOVED***
		private IQueryable<Labels> CreateLabelData()
		***REMOVED***
			List<Labels> labels = new List<Labels>()
			***REMOVED***
				new Labels(m_FirstTaskID,"Blue"),
				new Labels(m_FirstTaskID,"Green"),
				new Labels(m_FirstTaskID,"Purple")
			***REMOVED***;

			return labels.AsQueryable();
		***REMOVED***
		private IQueryable<Comments> CreateCommentData()
		***REMOVED***
			List<Comments> comments = new List<Comments>()
			***REMOVED***
				new Comments("Foysal Ahmed","Comment Content 1", m_FirstTaskID),
				new Comments("Foysal Ahmed","Comment Content 2", m_FirstTaskID),
				new Comments("Foysal Ahmed","Comment Content 3", m_FirstTaskID),
			***REMOVED***;

			return comments.AsQueryable();
		***REMOVED***


	***REMOVED***
***REMOVED***