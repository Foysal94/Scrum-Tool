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
	 public class TaskControllerTests 
	 ***REMOVED***
		 private TaskController m_TaskController;
		 private ScrumToolDBFixture m_ScrumToolDBFixture;
		 private ScrumToolDB m_ScrumToolDBContext;
		 private string m_ColumnName;
		 private int m_ParentBoardID;
		 private int m_ParentColumnID;
		 public TaskControllerTests(ScrumToolDBFixture p_ScrumToolDBFixture) 
		 ***REMOVED***
			 m_ScrumToolDBFixture = p_ScrumToolDBFixture;
			 m_ColumnName = m_ScrumToolDBFixture.FirstColumnName;
			 m_ParentBoardID = m_ScrumToolDBFixture.FirstBoardID;
			 m_ScrumToolDBContext = m_ScrumToolDBFixture.ScrumToolDB;
			 m_TaskController = new TaskController(m_ScrumToolDBContext);
		 ***REMOVED***

		 [Fact]
		 public void Add_Task() 
		 ***REMOVED***
			 // Act
			 Tasks testTask = new Tasks(m_ParentBoardID, m_ParentColumnID, m_ColumnName, "New testTask content");
			 int initalTaskCount = m_ScrumToolDBContext.Tasks.Count();
			 // Arrange
			 m_TaskController.AddNewTask(testTask);
			 // Assert
			 m_ScrumToolDBContext.Tasks.Should().NotBeNullOrEmpty()
			 		.And.HaveCount(initalTaskCount + 1, "Number of inital coloumns + 1");
			 m_ScrumToolDBContext.Tasks.Last().ShouldBeEquivalentTo(testTask, options =>
					options.Excluding(t => t.ID)
							 .Excluding(t=> t.DueDate), "The last Task object in the table should be the testTask");
		 ***REMOVED***

		 [Fact]
		 public void Delete_Task()
		 ***REMOVED***
			//Act
			Tasks lastTask = m_ScrumToolDBContext.Tasks.Last();
			int initalTaskCount = m_ScrumToolDBContext.Tasks.Count();
			//Arrange
			m_TaskController.Delete(lastTask.ID);
			//Assert
			m_ScrumToolDBContext.Tasks.Should().HaveCount(initalTaskCount - 1, "Number of inital tasks - 1")
					.And.NotContain(lastTask);
		 ***REMOVED***

		 [Fact]
		 public void Update_Task_Content()
		 ***REMOVED***
			 //Act
			 string newTaskContent = "Content for the test task";
			 Tasks lastTask = m_ScrumToolDBContext.Tasks.Last();
			 //Arrange
			 m_TaskController.UpdateContent(lastTask.ID,newTaskContent);
			 //Assert
			 m_ScrumToolDBContext.Tasks.Last().TaskContent.ShouldBeEquivalentTo(newTaskContent);
		 ***REMOVED***
		 
		 [Fact]
		 public void Update_Task_Date() 
		 ***REMOVED***
			 //Arrange
			 Tasks lastTask = m_ScrumToolDBContext.Tasks.Last();
          string originalDate = lastTask.DueDate.ToString();
			 string newDate = System.DateTime.Now.AddHours(3).ToString();
			 //Act
			 m_TaskController.UpdateDate(lastTask.ID, newDate);
			 //Assert
			 m_ScrumToolDBContext.Tasks.Last().DueDate.ToString().Should().NotBe(originalDate);
		 ***REMOVED***

		 [Fact]
		 public void Update_Task_Column_When_Moved()
		 ***REMOVED***
			 //Arrange
			 Tasks lastTask = m_ScrumToolDBContext.Tasks.Last(); 
			 int originalColumnID = lastTask.ColumnID;
			 int newColumnID = 100;
			 string originalColumnName = lastTask.ColumnName;
			 string newColumnName = "New Column For task";
			 //Act
			 m_TaskController.MovedTask(newColumnName, newColumnID, lastTask.ID);
			 //Assert
			 m_ScrumToolDBContext.Tasks.Last().ColumnID.ShouldBeEquivalentTo(newColumnID);
			 m_ScrumToolDBContext.Tasks.Last().ColumnName.ShouldBeEquivalentTo(newColumnName);
			 		

		 ***REMOVED***

		 [Fact]
		 public void Correct_View_Returned_When_Clicked_For_PopupWindow()
		 ***REMOVED***
			 //Arrange
			 int taskID = m_ScrumToolDBFixture.FirstTaskID;
			 int labelListCount = m_ScrumToolDBContext.Tasks.First().LabelList.Count();
			 //Act
			 PartialViewResult result = (PartialViewResult) m_TaskController.Information(taskID);
			 //Assert
			 result.Should().NotBeNull()
			 	.And.BeOfType<PartialViewResult>();
			 result.ViewName.Should().Be("_Information");
			 result.ViewData.Model.Should().BeOfType<Tasks>()
			 	.Which.LabelList.Count.ShouldBeEquivalentTo(labelListCount);


		 ***REMOVED***

	 ***REMOVED***
***REMOVED***
