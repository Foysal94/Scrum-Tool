***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
using Microsoft.AspNetCore.Mvc;
using ASPNET5_Scrum_Tool.Controllers;
***REMOVED***
using FluentAssertions;
using Xunit;

namespace Scrum_Tool.UnitTests
***REMOVED***
	[Collection("ScrumToolDB Collection")]
	public class ColumnControllerTests 
	***REMOVED***
		private ColumnController m_ColumnController;
		private ScrumToolDBFixture m_ScrumToolDBFixture;
		private ScrumToolDB m_ScrumToolDBContext;
		private int m_BoardID;
		public ColumnControllerTests(ScrumToolDBFixture p_ScrumToolDBFixture) 
		***REMOVED***
			m_ScrumToolDBFixture = p_ScrumToolDBFixture;

			m_BoardID = m_ScrumToolDBFixture.FirstBoardID;
			m_ScrumToolDBContext = m_ScrumToolDBFixture.ScrumToolDB;
			m_ColumnController = new ColumnController(m_ScrumToolDBContext);
		***REMOVED***

		[Fact]
		public void DeleteColumn()
		***REMOVED***
			// Arrange
			Columns testColumn = m_ScrumToolDBContext.Columns.Last();
			int initalColoumnCount = m_ScrumToolDBContext.Columns.Count();
			// Act
			m_ColumnController.Delete(testColumn.ID);
			// Assert
			m_ScrumToolDBContext.Columns.Should().HaveCount(initalColoumnCount - 1, "Inital column list count is 3, and deleted one")
					.And.NotContain(testColumn);
					 
		***REMOVED***

		[Fact]
		public void AddColumn()
		***REMOVED***
			// Arrange
			Columns testColumn = new Columns("Something", m_BoardID);
			int initalColoumnCount = m_ScrumToolDBContext.Columns.Count();
			//Act
			m_ColumnController.AddColumn(testColumn);
			// Assert
			m_ScrumToolDBContext.Columns.Should().NotBeNullOrEmpty()
					.And.HaveCount(initalColoumnCount + 1, "Number of inital columns created plus one");
			m_ScrumToolDBContext.Columns.Last().ShouldBeEquivalentTo(testColumn, options =>
					options.Excluding(c => c.ID));
		***REMOVED***

		[Fact]
		public void ChangeColumnName()
		***REMOVED***
			// Arrange
			string newColumnName = "NewName";
			Columns lastColumn = m_ScrumToolDBContext.Columns.Last();
			// Act
			m_ColumnController.ChangeColumnName(lastColumn.Name, newColumnName, m_BoardID);
			// Assert
			m_ScrumToolDBContext.Columns.Last().Name.ShouldBeEquivalentTo(newColumnName);
		***REMOVED***

		  

	***REMOVED***

***REMOVED***

