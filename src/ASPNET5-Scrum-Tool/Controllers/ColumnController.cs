***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
using Microsoft.AspNetCore.Mvc;
***REMOVED***
***REMOVED***
using Microsoft.EntityFrameworkCore.Scaffolding.Metadata;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

***REMOVED***.Controllers
***REMOVED***
    [Route("[Controller]")]
    public class ColumnController : Controller
***REMOVED***
        private ScrumToolDB m_context;
        private int m_ColumnNameIncrement;

        public ColumnController(ScrumToolDB p_context)
***REMOVED***
            m_context = p_context;
***REMOVED***

        [Route("[Action]")]
        [HttpPost]
        public void ChangeColumnName(string p_OldColumnName, string p_NewColumnName, int p_BoardID)
***REMOVED***
            var columns = m_context.Columns.ToList();
            //string query = "from column in m_context.Columns where column.Name.Equals(p_OldBoardName) select column";

            foreach (Columns c in columns)
***REMOVED***
                if (c.Name == p_OldColumnName)
***REMOVED***
                    //m_context.Columns.Update(c)
                    c.Name = p_NewColumnName;
                    m_context.SaveChanges();
                    break;
***REMOVED***
***REMOVED***


***REMOVED***

        [Route("[Action]")]
        [HttpPost]
        public ViewComponentResult AddColumn(Columns model)
***REMOVED***
            Columns tempColumn = new Columns(model.Name, model.BoardID); // The model got passed the last column ID

            m_context.Columns.Add(tempColumn);
            m_context.SaveChanges();
            tempColumn.TasksList = new List<Tasks>();
            return ViewComponent("Panel_Lists", tempColumn);
***REMOVED***

        [Route("[Action]")]
        [HttpPost]
        public void Delete(int p_ColumnID)
***REMOVED***
            var columnList = m_context.Columns.ToList();

            foreach (Columns c in columnList)
***REMOVED***
                if (c.ID == p_ColumnID)
***REMOVED***
                    m_context.Columns.Remove(c);
                    m_context.SaveChanges();
                    break;
***REMOVED***
***REMOVED***
***REMOVED***

        [Route("[Action]")]
        [HttpGet]
        public string GetColumnHeader(int p_ColumnID)
***REMOVED***
            var columnList = m_context.Columns.ToList();
            string name = "";
            int boardID = 0;
            foreach (Columns c in columnList)
***REMOVED***
                if (c.ID == p_ColumnID)
***REMOVED***
                    name = c.Name;
                    boardID = c.BoardID;
***REMOVED***
***REMOVED***


            return "";
***REMOVED***

***REMOVED***
***REMOVED***
