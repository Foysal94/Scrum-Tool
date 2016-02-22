***REMOVED***
***REMOVED***
using System.ComponentModel.DataAnnotations;
***REMOVED***
***REMOVED***
using Microsoft.AspNet.Mvc;

***REMOVED***.Models
***REMOVED***
    public class BoardModel
***REMOVED***
        private string m_BoardName;
        private List<ColumnModel> m_ColumnList;
       

        [Required]
        public string BoardName ***REMOVED*** get ***REMOVED*** return m_BoardName; ***REMOVED*** set ***REMOVED*** m_BoardName = value; ***REMOVED*** ***REMOVED***

        public List<ColumnModel> ColumnList
***REMOVED***
            get ***REMOVED*** return m_ColumnList; ***REMOVED***
            set ***REMOVED*** m_ColumnList = value; ***REMOVED***
***REMOVED***

***REMOVED***
***REMOVED***