***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.ModelBinding.Validation;
***REMOVED***
using Newtonsoft.Json;

***REMOVED***.Controllers
***REMOVED***
    [Route("[controller]")]
    public class BoardController : Controller
***REMOVED***
        //Logger<BoardController> logger;
        public BoardModel m_Board;

        public BoardController()
***REMOVED***
            m_Board = new BoardModel();
            m_Board.ColumnList = new List<ColumnModel>();
            m_Board.ColumnList.Add(new ColumnModel("Something1", 0));
            m_Board.ColumnList.Add(new ColumnModel("Something2", 1));
            m_Board.ColumnList[0].TasksList.Add(new TaskModel(m_Board.ColumnList[0].ID, 0, "Task 1 "));
            m_Board.ColumnList[0].TasksList.Add(new TaskModel(m_Board.ColumnList[0].ID, 1, "Task 2 "));
            m_Board.ColumnList[0].TasksList.Add(new TaskModel(m_Board.ColumnList[0].ID, 2, "Task 3 "));
            m_Board.ColumnList[0].TasksList.Add(new TaskModel(m_Board.ColumnList[0].ID, 3, "Task 4 "));
***REMOVED***
        
        [Route("[Action]/***REMOVED***p_BoardName***REMOVED***")]
        public IActionResult Show(string p_BoardName)
***REMOVED***
            m_Board.Name = p_BoardName;
            ViewData["BoardName"] = m_Board.Name;
            return View(m_Board);
***REMOVED***


        [Route("[Action]")]
        [HttpPost]
        public JsonResult ChangeColumnName(ColumnModel model)
***REMOVED***
            //ColumnModel column = JsonConvert.DeserializeObject<ColumnModel>(newColumnData);
            // Update column name in the board model, the board model stores a list of columns
            m_Board.ColumnList[model.ID].Name = model.Name; 

           // var json = JsonConvert.SerializeObject( m_Board.ColumnList[model.ColumnNumber]);

            return Json(model.Name);
***REMOVED***

        [Route("[Action]")]
        [HttpPost]
        public ViewComponentResult AddColumn(ColumnModel model)
***REMOVED***
            ColumnModel tempColumn = new ColumnModel(model.Name,model.ID + 1 );
            m_Board.ColumnList.Add(tempColumn);
            return ViewComponent("Panel_Lists", tempColumn);
***REMOVED***

        [Route("[Action]")]
        [HttpPost]
        public ViewComponentResult AddNewTask(TaskModel model)
***REMOVED***
            TaskModel tempTask = new TaskModel(model.ColumnID,model.ID, model.TaskContent); // Adding one for a new task
            if (tempTask.ID != 0)
***REMOVED***
                tempTask.ID++;
***REMOVED***
            m_Board.ColumnList[model.ColumnID ].TasksList.Add(tempTask); // -1 or else it will be out of range. List starts from 0 but website columns start from 1
            return ViewComponent("Task", tempTask);
***REMOVED***

        [Route("[Action]")]
        [HttpPost]
        public ViewComponentResult MovedTask(TaskModel model, string NewColumnID)
***REMOVED***
            // Remove the task from its old column
            int oldColumnID = model.ColumnID;
            int newColumnID = int.Parse(NewColumnID);
            //Board.ColumnList[oldColumnID ].TasksList.RemoveAt(model.TaskID);

            // Update task parent column
            TaskModel tempTask = model;
            tempTask.ColumnID = newColumnID;
            m_Board.ColumnList[newColumnID ].TasksList.Add(tempTask);

            return ViewComponent("Task", tempTask);


***REMOVED***

        
***REMOVED***
***REMOVED***
