***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
using Microsoft.AspNet.Mvc;
***REMOVED***
using Newtonsoft.Json;

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
<<<<<<< HEAD
        public JsonResult ChangeColumnName(ColumnModel model)
***REMOVED***
           // ColumnModel column = JsonConvert.DeserializeObject<ColumnModel>(newColumnData);
            // Update column name in the board model, the board model stores a list of columns
            m_Board.ColumnList[model.ColumnNumber].ColumnName = model.ColumnName;

            //var json = JsonConvert.SerializeObject(m_Board.ColumnList[column.ColumnNumber]);

            return Json(model.ColumnName);
***REMOVED***

        [HttpPost]
        public IActionResult AddColumn()
***REMOVED***
            return ViewComponent("Panel_Lists");
=======
        public Json ChangeColumnName(ColumnModel newColumnData)
***REMOVED***
            string name = newColumnData.ColumnName;
            int columnID = newColumnData.ColumnNumber;
            m_Board.ColumnList[columnID].ColumnName = name;
            return View("Show", m_Board);
>>>>>>> c8c888e56b2a28245cec67001eaddd58941f837d
***REMOVED***
***REMOVED***
***REMOVED***
