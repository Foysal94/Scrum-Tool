***REMOVED***
***REMOVED***
using System.ComponentModel.DataAnnotations;
***REMOVED***
***REMOVED***
using Microsoft.AspNet.Mvc;

***REMOVED***.Models
***REMOVED***
    public class Boards
***REMOVED***

        private string m_BoardName;
        private List<Columns> m_ColumnList;
        private int m_ID;
        private DateTime m_CreationDate;

        [Key]
        public int ID ***REMOVED*** get ***REMOVED***return m_ID;***REMOVED*** set ***REMOVED*** m_ID = value; ***REMOVED*** ***REMOVED***

        [DataType(DataType.Date)]
        public DateTime CreationDate  ***REMOVED*** get ***REMOVED*** return m_CreationDate; ***REMOVED*** set ***REMOVED*** m_CreationDate = value; ***REMOVED*** ***REMOVED***

        public string Name ***REMOVED*** get ***REMOVED*** return m_BoardName; ***REMOVED*** set ***REMOVED*** m_BoardName = value; ***REMOVED*** ***REMOVED***

        public List<Columns> ColumnList ***REMOVED*** get ***REMOVED*** return m_ColumnList; ***REMOVED*** set ***REMOVED*** m_ColumnList = value; ***REMOVED*** ***REMOVED***

        public Boards(string p_Name )
***REMOVED***
            m_BoardName = p_Name;
            m_ColumnList = new List<Columns>();
            m_CreationDate = DateTime.Now;
***REMOVED***

        public Boards(string p_Name, int p_ID)
***REMOVED***
            m_BoardName = p_Name;
            m_ID = p_ID;
            m_ColumnList = new List<Columns>();
            m_CreationDate = DateTime.Now;
***REMOVED***

        public Boards() ***REMOVED*** ***REMOVED***

***REMOVED***
***REMOVED***