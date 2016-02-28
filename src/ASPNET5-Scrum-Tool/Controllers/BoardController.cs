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
        //Logger<BoardController> logger;
        private BoardModel m_Board;

        public BoardController()
***REMOVED***
            m_Board = new BoardModel();
            m_Board.ColumnList = new List<ColumnModel>();
            m_Board.ColumnList.Add(new ColumnModel("Something1", 1));
            m_Board.ColumnList.Add(new ColumnModel("Something2", 2));
            m_Board.ColumnList[1].TasksList.Add(new TaskModel(m_Board.ColumnList[1], 1, "asdasdasdas vvxcvd vd fsdfdsfsdf sdhfhdfgdfg "));
            m_Board.ColumnList[1].TasksList.Add(new TaskModel(m_Board.ColumnList[1], 2, "asdasdasdas vvxcvd vd fsdfdsfsdf sdhfhdfgdfg "));
            m_Board.ColumnList[1].TasksList.Add(new TaskModel(m_Board.ColumnList[1], 3, "asdasdasdas vvxcvd vd fsdfdsfsdf sdhfhdfgdfg "));
            m_Board.ColumnList[1].TasksList.Add(new TaskModel(m_Board.ColumnList[1], 4, "asdasdasdas vvxcvd vd fsdfdsfsdf sdhfhdfgdfg "));
***REMOVED***
        
        [Route("[Action]/***REMOVED***p_BoardName***REMOVED***")]
        public IActionResult Show(string p_BoardName)
***REMOVED***
            m_Board.BoardName = p_BoardName;
            ViewData["BoardName"] = m_Board.BoardName;
            return View(m_Board);
***REMOVED***


        [Route("[Action]")]
        [HttpPost]
        public JsonResult ChangeColumnName(ColumnModel model)
***REMOVED***
            //ColumnModel column = JsonConvert.DeserializeObject<ColumnModel>(newColumnData);
            // Update column name in the board model, the board model stores a list of columns
            m_Board.ColumnList[model.ColumnID].ColumnName = model.ColumnName; 

           // var json = JsonConvert.SerializeObject( m_Board.ColumnList[model.ColumnNumber]);

            return Json(model.ColumnName);
***REMOVED***

        [Route("[Action]")]
        [HttpPost]
        public ViewComponentResult AddColumn(ColumnModel model)
***REMOVED***
            ColumnModel tempColumn = new ColumnModel(model.ColumnName,model.ColumnID + 1);
            m_Board.ColumnList.Add(tempColumn);
            return ViewComponent("Panel_Lists", tempColumn);
***REMOVED***

        [Route("[Action]")]
        [HttpPost]
        public JsonResult AddNewTask(TaskModel model)
***REMOVED***
            TaskModel tempTask = new TaskModel(model.ParentColumn,model.TaskID + 1, model.TaskContent);
            
            m_Board.ColumnList[tempTask.ParentColumn.ColumnID].TasksList.Add(tempTask);
            return Json(tempTask);
***REMOVED***

        
***REMOVED***
***REMOVED***
