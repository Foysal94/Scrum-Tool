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
	 public class CommentControllerTests 
	 ***REMOVED***
		 private CommentController m_CommentController;
		 private ScrumToolDBFixture m_ScrumToolDBFixture;
		 private ScrumToolDB m_ScrumToolDBContext;
		 private int m_ParentTaskID;
		 public CommentControllerTests(ScrumToolDBFixture p_ScrumToolDBFixture)
		 ***REMOVED***
			 m_ScrumToolDBFixture = p_ScrumToolDBFixture;
			 m_ParentTaskID = m_ScrumToolDBFixture.FirstTaskID;
			 m_ScrumToolDBContext = m_ScrumToolDBFixture.ScrumToolDB;
			 m_CommentController = new CommentController(m_ScrumToolDBContext);
		 ***REMOVED***

		 [Fact]
		 public void Add_Comment()
		 ***REMOVED***
			 //Act
			 Comments testComment = new Comments("TestComment", "Comment to add for testing", m_ParentTaskID);
			 int initalCommentCount = m_ScrumToolDBContext.Comments.Count();
			 //Arrange
			 m_CommentController.Create(testComment);
			 //Assert
			 m_ScrumToolDBContext.Comments.Should().NotBeNullOrEmpty()
			 		.And.HaveCount(initalCommentCount + 1, "Inital Comment Count + 1");
			 m_ScrumToolDBContext.Comments.Last().ShouldBeEquivalentTo(testComment, 
			 		options => options.Excluding(c => c.ID), "The last comment object in the table should be the testComment");
		 ***REMOVED***

		 [Fact]
		 public void Delete_Comment()
		 ***REMOVED***
			 //Act
			 Comments lastComment = m_ScrumToolDBContext.Comments.Last();
			 int initalCommentCount = m_ScrumToolDBContext.Comments.Count();
			 //Arrange
			 m_CommentController.Delete(lastComment.ID);
			 //Assert
			 m_ScrumToolDBContext.Comments.Should().HaveCount(initalCommentCount - 1, "Number of inital Comment - 1")
			 		.And.NotContain(lastComment);
			
		 ***REMOVED***

	 ***REMOVED***

***REMOVED***