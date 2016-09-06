***REMOVED***
***REMOVED***
using System.ComponentModel.DataAnnotations;
***REMOVED***
using System.Security.AccessControl;
***REMOVED***

***REMOVED***.Models
***REMOVED***
    public class Comments
    ***REMOVED***
        private int m_ID;
        private string m_Name;
        private int m_TaskID;
        private string m_Content;
        private DateTime m_CreationDate;

        public int ID ***REMOVED*** get ***REMOVED*** return m_ID; ***REMOVED*** set ***REMOVED*** m_ID = value; ***REMOVED*** ***REMOVED***
        public int TaskID ***REMOVED*** get ***REMOVED*** return m_TaskID; ***REMOVED*** set ***REMOVED*** m_TaskID = value; ***REMOVED*** ***REMOVED***

        [DataType(DataType.Date)]
        public DateTime CreationDate ***REMOVED*** get ***REMOVED*** return m_CreationDate; ***REMOVED*** set ***REMOVED*** m_CreationDate = value; ***REMOVED*** ***REMOVED***

        public string Name ***REMOVED*** get ***REMOVED***return m_Name;***REMOVED*** set ***REMOVED*** m_Name = value; ***REMOVED*** ***REMOVED***
        public string Content ***REMOVED*** get ***REMOVED*** return m_Content;***REMOVED*** set ***REMOVED*** m_Content = value; ***REMOVED*** ***REMOVED***

        public Comments(string p_Name, string p_Content, int p_TaskID)
        ***REMOVED***
            m_Name = p_Name;
            m_Content = p_Content;
            m_TaskID = p_TaskID;
            m_CreationDate = DateTime.Now;
***REMOVED***

        public Comments() ***REMOVED*** ***REMOVED***

***REMOVED***


***REMOVED***
