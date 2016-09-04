***REMOVED***
using ASPNET5_Scrum_Tool.Controllers;
***REMOVED***
using FluentAssertions;
using Xunit;
using Moq;
using Microsoft.AspNetCore.Mvc;
***REMOVED***
using GenFu;

namespace Scrum_Tool.UnitTests
***REMOVED***
    
    public class ColumnControllerTests 
***REMOVED***
        private const int m_BoardID = 0;
        public ColumnControllerTests() 
***REMOVED***
           
***REMOVED***

        private IQueryable<Columns> GenerateMockData() 
***REMOVED***
            int id = 0;
            int numberOfColumns = 3;
            string Name = "TestColumn";

            A.Configure<Columns>()
                .Fill(c => c.ID,
                     () => ***REMOVED*** return id++; ***REMOVED***)
                .Fill(c => c.Name, () => ***REMOVED*** return $"***REMOVED***Name***REMOVED******REMOVED***id++***REMOVED***"; ***REMOVED***)
                .Fill(c => c.BoardID, m_BoardID);

            var columns = A.ListOf<Columns>(numberOfColumns);
            return columns.AsQueryable();
***REMOVED***

        

***REMOVED***
***REMOVED***

