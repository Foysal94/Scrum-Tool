***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED***.Models
***REMOVED***
    public class TaskModel
***REMOVED***
        private ColumnModel m_ParentColumn;
        private DateTime m_DueDate;
        private string m_TaskContent;
        private int m_ID;

        public ColumnModel ParentColumn ***REMOVED*** get ***REMOVED***return m_ParentColumn;***REMOVED*** set ***REMOVED*** m_ParentColumn = value; ***REMOVED*** ***REMOVED***
        public DateTime DueDate ***REMOVED*** get ***REMOVED*** return m_DueDate; ***REMOVED***set ***REMOVED*** m_DueDate = value; ***REMOVED*** ***REMOVED***
        public string TaskContent ***REMOVED*** get ***REMOVED***return m_TaskContent;***REMOVED*** set ***REMOVED*** m_TaskContent = value; ***REMOVED*** ***REMOVED***
        public int TaskID ***REMOVED*** get ***REMOVED***return m_ID;***REMOVED*** set ***REMOVED*** m_ID = value; ***REMOVED*** ***REMOVED***

        public TaskModel(ColumnModel p_column , int p_ID, string p_TaskContent)
***REMOVED***
            m_ParentColumn = p_column;
            m_ID = p_ID;
            m_TaskContent = p_TaskContent;
***REMOVED***

        public TaskModel()
***REMOVED***
            
***REMOVED***

***REMOVED***
***REMOVED***
