***REMOVED***
***REMOVED***
***REMOVED***
using System.Security.AccessControl;
***REMOVED***
using Microsoft.AspNet.Mvc;
***REMOVED***
// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

***REMOVED***.Controllers
***REMOVED***
    [Route("[controller]")]
    public class TaskController : Controller
***REMOVED***
        private ScrumToolDB m_context;
        private Tasks m_Task;
        public TaskController(ScrumToolDB p_context)
***REMOVED***
            m_context = p_context;
            m_Task = null;
***REMOVED***


        [Route("[Action]")]
        [HttpPost]
        public ViewComponentResult AddNewTask(Tasks model)
***REMOVED***
            m_Task = new Tasks(model.BoardID, model.ColumnName, model.TaskContent); // Adding one to the ID because the model has the last task ID.
            m_context.Tasks.Add(m_Task);
            m_context.SaveChanges();

            return ViewComponent("Task", m_Task);
***REMOVED***

        [Route("[Action]")]
        [HttpPost]
        public ViewComponentResult MovedTask(string p_ColumnName, int p_TaskID)
***REMOVED***
            var tasks = m_context.Tasks.ToList();

            foreach (Tasks t in tasks)
***REMOVED***
                if (t.ID == p_TaskID)
***REMOVED***
                    t.ColumnName = p_ColumnName;
                    m_Task = t;
                    m_context.SaveChanges();

                    break;
***REMOVED***
***REMOVED***

            return ViewComponent("Task", m_Task);


***REMOVED***

        [Route("[Action]")]
        [HttpPost]
        public void Delete(int p_TaskID)
***REMOVED***
            var taskList = m_context.Tasks.ToList();

            foreach (Tasks t in taskList)
***REMOVED***
                if (t.ID == p_TaskID)
***REMOVED***
                    m_context.Tasks.Remove(t);
                    m_context.SaveChanges();
                    break;
***REMOVED***
***REMOVED***
***REMOVED***

        [Route("[Action]")]
        [HttpPost]
        public void AddLabel(int p_TaskID, string p_LabelColour)
***REMOVED***
            Labels tempLabel = new Labels(p_TaskID, p_LabelColour);
            m_context.Labels.Add(tempLabel);
            m_context.SaveChanges();
***REMOVED***

        [Route("[Action]")]
        [HttpGet]
        public IActionResult Information(int p_TaskID)
***REMOVED***
            var taskList = m_context.Tasks.ToList();
            var labelList = m_context.Labels.ToList();
            foreach (Tasks t in taskList)
***REMOVED***
                if (t.ID == p_TaskID)
***REMOVED***
                    t.LabelList = new List<Labels>();
                    foreach (Labels label in labelList)
***REMOVED***
                        if (t.ID == label.TaskID)
***REMOVED***
                            t.LabelList.Add(label);
***REMOVED***
***REMOVED***
                    m_Task = t;
                    break;
***REMOVED***
***REMOVED***
            return PartialView("_Information", m_Task);
***REMOVED***




***REMOVED***
***REMOVED***