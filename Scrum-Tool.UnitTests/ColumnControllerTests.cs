***REMOVED***
using ASPNET5_Scrum_Tool.Controllers;
***REMOVED***
using FluentAssertions;
using Microsoft.Data.Entity;
using Xunit;

namespace Scrum_Tool.UnitTests
***REMOVED***
    public class ColumnControllerTests : Setup
***REMOVED***
        private ColumnController m_ColumnController;
       
        // private DbContextOptionsBuilder<ScrumToolDB> builder;

        public ColumnControllerTests()
***REMOVED***
            //Arrange
            var db = new DbContextOptionsBuilder();
            db.UseInMemoryDatabase();
            m_Context = new ScrumToolDB(db.Options);
            CreateTestData(m_Context);
            m_ColumnController = new ColumnController(m_Context);

***REMOVED***

        [Fact]
        public void ColumnNameChanged()
***REMOVED***
            // Act
            var column = m_Context.Columns.First();
            m_ColumnController.ChangeColumnName(column.Name, "Test", 1);
            // Assert
            column.Should().NotBeNull();
            column.Name.Should().Be("Test");
***REMOVED***
        
        [Fact]
        public void ColumnAdded()
***REMOVED***
            // Act
            var column = new Columns("TestColumnToAdd", 1);
            var viewComponentResult = m_ColumnController.AddColumn(column);
            //column.ID = m_Context.Columns.Last().ID;
            // Assert
            viewComponentResult.Should().NotBeNull();
            m_Context.Columns.Should().Contain(column)
                .Which.Name.Should().Be("TestColumnToAdd");


***REMOVED***

        [Fact]
        public void ColumnDeleted()
***REMOVED***
            int firstColumnID = m_Context.Columns.First().ID;
            m_ColumnController.Delete(firstColumnID);
            m_Context.Columns.First().ID.Should().NotBe(firstColumnID);
***REMOVED***           


***REMOVED***

***REMOVED***

