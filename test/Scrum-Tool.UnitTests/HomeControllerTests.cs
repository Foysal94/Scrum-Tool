***REMOVED***
using ASPNET5_Scrum_Tool.Controllers;
***REMOVED***
using Microsoft.AspNetCore.Mvc;
***REMOVED***
using FluentAssertions;
using Xunit;

namespace Scrum_Tool.UnitTests
***REMOVED*** 
    [Collection("ScrumToolDB Collection")]
    public class HomeControllerTests 
***REMOVED***
        HomeController m_HomeController;
        private ScrumToolDBFixture m_ScrumToolDBFixture;
		private ScrumToolDB m_ScrumToolDBContext;

        public HomeControllerTests(ScrumToolDBFixture p_ScrumToolDBFixture)
		***REMOVED***
			m_ScrumToolDBFixture = p_ScrumToolDBFixture;
			m_ScrumToolDBContext = m_ScrumToolDBFixture.ScrumToolDB;
            m_HomeController = new HomeController(m_ScrumToolDBContext);
***REMOVED***

        [Fact]
        public void Redirect_To_Create_If_Board_Does_Not_Exist()
***REMOVED***
            //Act
            Boards newBoard =  new Boards("New Board to Create");
            //Arrange
            RedirectToActionResult result =  m_HomeController.SumbitBoardForm(newBoard)
                                                as RedirectToActionResult;

            //Assert
            result.Should().NotBeNull();
            result.ActionName.Should().Be("Load");
            result.ControllerName.Should().Be("Board");
                
***REMOVED***
        
        [Fact]
        public void Redirect_To_Load_Action_If_Board_Exists()
***REMOVED***
            //Act
            Boards loadedBoard = m_ScrumToolDBContext.Boards.First();
            //Arrange
            RedirectToActionResult result =  m_HomeController.SumbitBoardForm(loadedBoard)
                                                as RedirectToActionResult;
            
            //Assert
            result.Should().NotBeNull();
            result.ActionName.Should().Be("Load");
            result.ControllerName.Should().Be("Board");

***REMOVED***


***REMOVED***
***REMOVED***
