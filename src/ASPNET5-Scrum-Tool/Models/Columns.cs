***REMOVED***
***REMOVED***
using System.ComponentModel.DataAnnotations;
***REMOVED***
using System.Security.AccessControl;
***REMOVED***
using Microsoft.AspNet.Mvc;

***REMOVED***.Models
***REMOVED***

    public class Columns
***REMOVED***
        private string m_name;
        private int m_ID;
        private List<Tasks> m_TasksList;
        private int m_BoardID;
        private Boards m_board;

        [Key]
        public int ID ***REMOVED*** get ***REMOVED*** return m_ID; ***REMOVED*** set ***REMOVED*** m_ID = value; ***REMOVED*** ***REMOVED***

        public string Name ***REMOVED*** get ***REMOVED*** return m_name;***REMOVED*** set ***REMOVED*** m_name = value; ***REMOVED*** ***REMOVED***
        public List<Tasks> TasksList ***REMOVED*** get ***REMOVED***return m_TasksList;***REMOVED*** set ***REMOVED*** m_TasksList = value; ***REMOVED*** ***REMOVED***
        public int BoardID ***REMOVED*** get ***REMOVED*** return m_BoardID; ***REMOVED*** set ***REMOVED*** m_BoardID = value; ***REMOVED*** ***REMOVED***
        public Boards ParentBoard ***REMOVED*** get ***REMOVED***return m_board;***REMOVED*** set ***REMOVED*** m_board = value; ***REMOVED*** ***REMOVED***


        public Columns(string p_Name, int p_ColumnNumber, int p_BoardID)
***REMOVED***
            m_name = p_Name;
            m_ID= p_ColumnNumber;
            m_BoardID = p_BoardID;
            m_TasksList = new List<Tasks>();
***REMOVED***

        public Columns() ***REMOVED*** ***REMOVED***
***REMOVED***
***REMOVED***