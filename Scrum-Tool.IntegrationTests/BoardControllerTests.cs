***REMOVED***
***REMOVED***
***REMOVED***
using System.Security.Cryptography.X509Certificates;
***REMOVED***
using ASPNET5_Scrum_Tool;
using ASPNET5_Scrum_Tool.Controllers;
***REMOVED***
using Microsoft.AspNet.TestHost;
using Microsoft.Data.Entity;
using Xunit;

namespace Scrum_Tool.IntegrationTests
***REMOVED***
    public class BoardControllerTests :Setup
***REMOVED***
        private BoardController m_BoardController;
        private ScrumToolDB m_Context;

        public BoardControllerTests()
***REMOVED***
            // Arrange
            var db = new DbContextOptionsBuilder();
            db.UseInMemoryDatabase();
            m_Context = new ScrumToolDB(db.Options);
            CreateTestData(m_Context);
            m_BoardController= new BoardController(m_Context);

            m_Server = new TestServer(TestServer.CreateBuilder()
  ***REMOVED***);
             m_Client = m_Server.CreateClient();

***REMOVED***

        [Fact]
        public void ReturnLoadBoard()
***REMOVED***
            var response = m_Client.GetAsync("/Board/Load/1");

***REMOVED***
        
***REMOVED***
***REMOVED***
