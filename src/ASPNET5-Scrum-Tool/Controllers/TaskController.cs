***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
using Microsoft.AspNet.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

***REMOVED***.Controllers
***REMOVED***
    public class TaskController : Controller
***REMOVED***
        // GET: /<controller>/
        public IActionResult Index()
***REMOVED***
            return View();
***REMOVED***

        /*
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
        */
***REMOVED***
***REMOVED***
