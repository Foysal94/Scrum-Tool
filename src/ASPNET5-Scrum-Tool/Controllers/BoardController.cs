***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
using Microsoft.AspNet.Mvc;
***REMOVED***

***REMOVED***.Controllers
***REMOVED***
    [Route("[controller]")]
    public class BoardController : Controller
***REMOVED***
        Logger<BoardController> logger;
        private BoardModel m_Board;

        public BoardController()
***REMOVED***
            m_Board = new BoardModel();
            m_Board.ColumnList = new List<ColumnModel>();
            m_Board.ColumnList.Add(new ColumnModel("Something1", 1));
            m_Board.ColumnList.Add(new ColumnModel("Something2", 2));
***REMOVED***
        
        [Route("***REMOVED***p_BoardName***REMOVED***")]
        public IActionResult Show(string p_BoardName)
***REMOVED***
            m_Board.BoardName = p_BoardName;
            ViewData["BoardName"] = m_Board.BoardName;
            return View(m_Board);
***REMOVED***

        [HttpPost]
        public IActionResult ChangeColumnName(string name)
***REMOVED***
            
            return View("Show");
***REMOVED***
***REMOVED***
***REMOVED***
