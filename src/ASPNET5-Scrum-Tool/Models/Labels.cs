***REMOVED***
***REMOVED***
using System.ComponentModel.DataAnnotations;
***REMOVED***
***REMOVED***

***REMOVED***.Models
***REMOVED***
    public class Labels
***REMOVED***
        private int m_ID;
        private int m_TaskID;
        private string m_Colour;

        public int ID ***REMOVED*** get ***REMOVED***return m_ID;***REMOVED*** set ***REMOVED*** m_ID = value; ***REMOVED*** ***REMOVED***

        public int TaskID ***REMOVED*** get ***REMOVED*** return m_TaskID; ***REMOVED*** set ***REMOVED*** m_TaskID = value; ***REMOVED*** ***REMOVED***

        public string Colour ***REMOVED*** get ***REMOVED*** return m_Colour;***REMOVED*** set ***REMOVED*** m_Colour = value; ***REMOVED*** ***REMOVED***

        public Labels(int p_TaskID, string p_Colour)
***REMOVED***
            m_TaskID = p_TaskID;
            m_Colour = p_Colour;
***REMOVED***

        public Labels() ***REMOVED*** ***REMOVED***
***REMOVED***
***REMOVED***