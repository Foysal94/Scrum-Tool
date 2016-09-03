***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
using ASPNET5_Scrum_Tool;
using ASPNET5_Scrum_Tool.Controllers;
***REMOVED***
using Microsoft.AspNetCore.Mvc;
***REMOVED***


using FluentAssertions;
using Xunit;
using Moq;

namespace Scrum_Tool.UnitTests
***REMOVED***
		// Assumptions:
	public class Bar
	***REMOVED***
		// Bar implementation
	***REMOVED***

	public interface IFoo ***REMOVED***
		bool DoSomething();
		string DoSomethingStringy();
		bool TryParse();
		bool Submit();
		int GetCount();
		int GetCountThing();
	***REMOVED***
	 // This project can output the Class library as a NuGet Package.
	 // To enable this option, right-click on the project and select the Properties menu item. In the Build tab select "Produce outputs on build".
	public class BoardControllerTests
	***REMOVED***


		[Fact]
		public void PassingTest()
		***REMOVED***
			Mock mock = new Mock<IFoo>();
			mock.Setup(foo => foo.DoSomething("ping")).Returns(true);
			mock.Should().BeTrue();
			

		***REMOVED***
	***REMOVED***

***REMOVED***
