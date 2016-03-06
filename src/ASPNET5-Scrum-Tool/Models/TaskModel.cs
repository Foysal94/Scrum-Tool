***REMOVED***
***REMOVED***
using System.ComponentModel.DataAnnotations;
***REMOVED***
***REMOVED***

***REMOVED***.Models
***REMOVED***
    public class TaskModel
***REMOVED***
        private int m_ParentColumnID;
        private DateTime m_DueDate;
        private string m_TaskContent;
        private int m_ID;

        public int ParentColumnID ***REMOVED*** get ***REMOVED***return m_ParentColumnID;***REMOVED*** set ***REMOVED*** m_ParentColumnID = value; ***REMOVED*** ***REMOVED***
        public DateTime DueDate ***REMOVED*** get ***REMOVED*** return m_DueDate; ***REMOVED***set ***REMOVED*** m_DueDate = value; ***REMOVED*** ***REMOVED***
        public string TaskContent ***REMOVED*** get ***REMOVED***return m_TaskContent;***REMOVED*** set ***REMOVED*** m_TaskContent = value; ***REMOVED*** ***REMOVED***

        [Key]
        public int ID ***REMOVED*** get ***REMOVED***return m_ID;***REMOVED*** set ***REMOVED*** m_ID = value; ***REMOVED*** ***REMOVED***

        public TaskModel(int p_columnID , int p_ID, string p_TaskContent)
***REMOVED***
            m_ParentColumnID = p_columnID;
            m_ID = p_ID;
            m_TaskContent = p_TaskContent;
***REMOVED***

        public TaskModel()
***REMOVED***
            
***REMOVED***

***REMOVED***
***REMOVED***
