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
	public interface IUser
	***REMOVED***

		int CalculateAge();
		DateTime DateOfBirth ***REMOVED*** get; set; ***REMOVED***
		string Name ***REMOVED*** get; set; ***REMOVED***
	***REMOVED***
	public class ConsumerOfIUser
	***REMOVED***
		public int Consume(IUser user)
		***REMOVED***
			return user.CalculateAge() + 10;
		***REMOVED***
	***REMOVED***

	public class User : IUser
	***REMOVED***
		public DateTime DateOfBirth ***REMOVED*** get; set; ***REMOVED***
		public string Name ***REMOVED*** get; set; ***REMOVED***

		public int CalculateAge()
		***REMOVED***
			return DateTime.Now.Year - DateOfBirth.Year;
		***REMOVED***
	***REMOVED***
	// This project can output the Class library as a NuGet Package.
	// To enable this option, right-click on the project and select the Properties menu item. In the Build tab select "Produce outputs on build".
	public class BoardControllerTests
	***REMOVED***


		[Fact]
		public void PassingTest()
		***REMOVED***
			var userMock = new Mock<IUser>();
			userMock.Setup(u => u.CalculateAge()).Returns(10);
			var consumer = new ConsumerOfIUser();
			var result = consumer.Consume(userMock.Object);

			result.Should().BeGreaterOrEqualTo(20);
		***REMOVED***
	***REMOVED***
***REMOVED***
