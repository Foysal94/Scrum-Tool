***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
using Xunit;

namespace Scrum_Tool.IntegrationTests
***REMOVED***
    // This project can output the Class library as a NuGet Package.
    // To enable this option, right-click on the project and select the Properties menu item. In the Build tab select "Produce outputs on build".
    public class Board
***REMOVED***
       [Fact]
        public void PassingTest()
***REMOVED***
            Assert.Equal(4, Add(2, 2));
***REMOVED***

        [Fact]
        public void FailingTest()
***REMOVED***
            Assert.Equal(5, Add(2, 2));
***REMOVED***

        int Add(int x, int y)
***REMOVED***
            return x + y;
***REMOVED***
***REMOVED***
    
***REMOVED***
