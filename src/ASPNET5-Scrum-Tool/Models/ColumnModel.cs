***REMOVED***
***REMOVED***
using System.ComponentModel.DataAnnotations;
***REMOVED***
***REMOVED***
using Microsoft.AspNet.Mvc;

***REMOVED***.Models
***REMOVED***

    public class ColumnModel
***REMOVED***
        private string m_name;
        private int m_columnNumber;

        public int ColumnNumber ***REMOVED*** get ***REMOVED*** return m_columnNumber; ***REMOVED*** ***REMOVED***
        public string ColumnName ***REMOVED*** get ***REMOVED*** return m_name;***REMOVED*** set ***REMOVED*** m_name = value; ***REMOVED*** ***REMOVED***

        public ColumnModel(string p_Name, int p_ColumnNumber)
***REMOVED***
            m_name = p_Name;
            m_columnNumber = p_ColumnNumber;
***REMOVED***
***REMOVED***
***REMOVED***