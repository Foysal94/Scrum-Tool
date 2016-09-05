***REMOVED***
***REMOVED***
***REMOVED***
using System.Security.AccessControl;
***REMOVED***
using Microsoft.AspNetCore.Mvc;
***REMOVED***
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
            m_Task = new Tasks(model.BoardID, model.ColumnID, model.ColumnName, model.TaskContent);
            m_context.Add(m_Task);
            m_context.SaveChanges();

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
        public void UpdateContent(int p_TaskID, string p_NewTaskContent)
***REMOVED***
            var tasks = m_context.Tasks.ToList();

            foreach (Tasks t in tasks)
***REMOVED***
                if (t.ID == p_TaskID)
***REMOVED***
                    t.TaskContent = p_NewTaskContent;
                    m_context.SaveChanges();
                    break;
***REMOVED***
***REMOVED***
***REMOVED***

        [Route("[Action]")]
        [HttpPost]
        public string GetTaskContent(int p_TaskID)
***REMOVED***
            var tasks = m_context.Tasks.ToList();

            foreach (Tasks t in tasks)
***REMOVED***
                if (t.ID == p_TaskID)
***REMOVED***
                    return t.TaskContent;
***REMOVED***
***REMOVED***

            return "Error, no content found";
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
        [HttpGet]
        public IActionResult Information(int p_TaskID)
***REMOVED***
            var taskList = m_context.Tasks.ToList();
            var labelList = m_context.Labels.ToList();
            var commentList = m_context.Comments.ToList();
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

                    t.CommentList = new List<Comments>();
                    foreach (Comments comment in commentList)
***REMOVED***
                        if (t.ID == comment.TaskID)
***REMOVED***
                            t.CommentList.Add(comment);
***REMOVED***

***REMOVED***
                    m_Task = t;
                    break;
***REMOVED***
***REMOVED***
            return PartialView("_Information", m_Task);
***REMOVED***


        [Route("[Action]")]
        [HttpPost]
        public void UpdateDate(int p_TaskID, string p_Date)
***REMOVED***
            var tasks = m_context.Tasks.ToList();
            DateTime dateTime = DateTime.Parse(p_Date);

            foreach (Tasks t in tasks)
***REMOVED***
                if (t.ID == p_TaskID)
***REMOVED***
                    t.DueDate = dateTime.Date;
                    m_context.SaveChanges();
                    break;
***REMOVED***
***REMOVED***
***REMOVED***


        [Route("[Action]")]
        [HttpGet]
        public IActionResult EditTaskForm(int p_TaskID)
***REMOVED***
            return PartialView("_EditTaskForm");
***REMOVED***



***REMOVED***
***REMOVED***