***REMOVED***
using ASPNET5_Scrum_Tool.Controllers;
***REMOVED***
using FluentAssertions;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;
using Xunit;

namespace Scrum_Tool.UnitTests
***REMOVED***
    public class HomeControllerTests : Setup
***REMOVED***
        private HomeController m_HomeController;
       
        //private DbContextOptionsBuilder<ScrumToolDB> builder;

        public HomeControllerTests() : base() //Arange
***REMOVED***
            var db = new DbContextOptionsBuilder();
            db.UseInMemoryDatabase();
            m_Context = new ScrumToolDB(db.Options);
            CreateTestData(m_Context);
            m_HomeController = new HomeController(m_Context);
***REMOVED***

        [Fact]
        public void SumbitBoardFormShouldReturnIndexOnErrors()
***REMOVED***
            //arange
            m_HomeController.ModelState.AddModelError("", "dummy error");

            // Act
            var actionResult = m_HomeController.SumbitBoardForm(new Boards()) as RedirectToActionResult;
            // Assert
            actionResult.Should().NotBeNull();
            actionResult.Should().BeOfType<RedirectToActionResult>().Which.ActionName.Should().Be("Index");

***REMOVED***

        [Fact]
        public void RedirectToLoadWhenBoardNameFound()
***REMOVED***
            // Act
            var board = m_Context.Boards.First(); // Returns "HelloWorld"
            var actionResult =  m_HomeController.SumbitBoardForm(board) as RedirectToActionResult;
            
            // Assert
            board.Should().NotBeNull();
            actionResult.Should().BeOfType<RedirectToActionResult>()
                .Which.ActionName.Should().Be("Load");

***REMOVED***

        /*
        [Fact]
        public void RedirectToCreateIfBoardNameNotFound()
***REMOVED***
            var board = new Boards("Test");
            var actionResult = m_HomeController.SumbitBoardForm(board) as RedirectToActionResult;
            board.Should().NotBeNull();
            actionResult.Should().BeOfType<RedirectToActionResult>()
                .Which.ActionName.Should().Be("Create");
***REMOVED***
        */




***REMOVED***
***REMOVED***
