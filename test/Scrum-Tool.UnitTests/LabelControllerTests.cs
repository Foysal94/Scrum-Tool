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
	 public class LabelControllerTests 
	 ***REMOVED***
		 private LabelController m_LabelController;
		 private ScrumToolDBFixture m_ScrumToolDBFixture;
		 private ScrumToolDB m_ScrumToolDBContext;
		 private int m_ParentTaskID;
		 public LabelControllerTests(ScrumToolDBFixture p_ScrumToolDBFixture)
		 ***REMOVED***
			 m_ScrumToolDBFixture = p_ScrumToolDBFixture;
			 m_ParentTaskID = m_ScrumToolDBFixture.FirstTaskID;
			 m_ScrumToolDBContext = m_ScrumToolDBFixture.ScrumToolDB;
			 m_LabelController = new LabelController(m_ScrumToolDBContext);
		 ***REMOVED***

		 [Fact]
		 public void Add_Label_When_Dropped_On_Task()
		 ***REMOVED***
			 //Act
			 Labels testLabel = new Labels(m_ParentTaskID,"Green");
			 int initalLabelCount = m_ScrumToolDBContext.Labels.Count();
			 //Arrange
			 m_LabelController.Add(testLabel);
			 //Assert
			 m_ScrumToolDBContext.Labels.Should().NotBeNullOrEmpty()
			 		.And.HaveCount(initalLabelCount + 1, "Inital Label Count + 1");
			 m_ScrumToolDBContext.Labels.Last().ShouldBeEquivalentTo(testLabel, 
			 		options => options.Excluding(l => l.ID), "The last label object in the table should be the testLabel");
		 ***REMOVED***

		 [Fact]
		 public void Delete_Label()
		 ***REMOVED***
			 //Act
			 Labels lastLabel = m_ScrumToolDBContext.Labels.Last();
			 int initalLabelCount = m_ScrumToolDBContext.Labels.Count();
			 //Arrange
			 m_LabelController.Delete(lastLabel.ID);
			 //Assert
			 m_ScrumToolDBContext.Labels.Should().HaveCount(initalLabelCount - 1, "Number of inital labels - 1")
			 		.And.NotContain(lastLabel);

		 ***REMOVED***

		 [Fact]
		 public void Add_Label_From_Task_Popup_Window()
		 ***REMOVED***
			 //Act
			 Labels testLabel = new Labels(m_ParentTaskID,"Purple");
			 int initalLabelCount = m_ScrumToolDBContext.Labels.Count();
			 //Arrange
			 m_LabelController.Add(testLabel);
			 //Assert
			 m_ScrumToolDBContext.Labels.Should().NotBeNullOrEmpty()
			 		.And.HaveCount(initalLabelCount + 1, "Inital Label Count + 1");
			 m_ScrumToolDBContext.Labels.Last().ShouldBeEquivalentTo(testLabel, 
			 		options => options.Excluding(l => l.ID), "The last label object in the table should be the testLabel");
		 ***REMOVED***

	 ***REMOVED***

***REMOVED***