***REMOVED***
***REMOVED***
using System.ComponentModel.DataAnnotations;
***REMOVED***
using System.Security.AccessControl;
***REMOVED***
using Microsoft.AspNet.Mvc;

***REMOVED***.Models
***REMOVED***

    public class ColumnModel
***REMOVED***
        private string m_name;
        private int m_ID;
        private List<TaskModel> m_TasksList;
        private int m_ParentBoardID;

        [Key]
        public int ID ***REMOVED*** get ***REMOVED*** return m_ID; ***REMOVED*** set ***REMOVED*** m_ID = value; ***REMOVED*** ***REMOVED***
        public string Name ***REMOVED*** get ***REMOVED*** return m_name;***REMOVED*** set ***REMOVED*** m_name = value; ***REMOVED*** ***REMOVED***
        public List<TaskModel> TasksList ***REMOVED*** get ***REMOVED***return m_TasksList;***REMOVED*** set ***REMOVED*** m_TasksList = value; ***REMOVED*** ***REMOVED***
        public int BoardID ***REMOVED*** get ***REMOVED*** return m_ParentBoardID; ***REMOVED*** set ***REMOVED*** m_ParentBoardID = value; ***REMOVED*** ***REMOVED***



        public ColumnModel(string p_Name, int p_ColumnNumber)
***REMOVED***
            m_name = p_Name;
            m_ID= p_ColumnNumber;
            m_TasksList = new List<TaskModel>();
***REMOVED***

        public ColumnModel() ***REMOVED*** ***REMOVED***
***REMOVED***
***REMOVED***