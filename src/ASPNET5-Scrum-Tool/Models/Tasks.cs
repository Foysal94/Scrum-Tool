﻿***REMOVED***
***REMOVED***
using System.ComponentModel.DataAnnotations;
***REMOVED***
***REMOVED***

***REMOVED***.Models
***REMOVED***
    public class Tasks
***REMOVED***
        private DateTime m_DueDate;
        private string m_TaskContent;
        private int m_ID;
        private int m_BoardID;
        private string m_ColumnName;
        private Columns m_ParentColumn;

        [Key]
        public int ID ***REMOVED*** get ***REMOVED***return m_ID;***REMOVED*** set ***REMOVED*** m_ID = value; ***REMOVED*** ***REMOVED***

        public int BoardID ***REMOVED*** get ***REMOVED*** return m_BoardID; ***REMOVED*** set ***REMOVED*** m_BoardID = value; ***REMOVED*** ***REMOVED***

        public string ColumnName ***REMOVED*** get ***REMOVED***return m_ColumnName; ***REMOVED*** set ***REMOVED*** m_ColumnName = value; ***REMOVED*** ***REMOVED***
        public DateTime DueDate ***REMOVED*** get ***REMOVED*** return m_DueDate; ***REMOVED***set ***REMOVED*** m_DueDate = value; ***REMOVED*** ***REMOVED***
        public string TaskContent ***REMOVED*** get ***REMOVED***return m_TaskContent;***REMOVED*** set ***REMOVED*** m_TaskContent = value; ***REMOVED*** ***REMOVED***

        public Columns ParentColumn ***REMOVED*** get ***REMOVED***return m_ParentColumn;***REMOVED*** set ***REMOVED*** m_ParentColumn = value; ***REMOVED*** ***REMOVED***

        public Tasks(int p_ID, int p_BoardID, string p_ColumnName, string p_TaskContent)
***REMOVED***
            m_BoardID = p_BoardID;
            m_ID = p_ID;
            m_TaskContent = p_TaskContent;
***REMOVED***

        public Tasks()
***REMOVED***
            
***REMOVED***

***REMOVED***
***REMOVED***