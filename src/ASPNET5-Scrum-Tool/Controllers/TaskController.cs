﻿***REMOVED***
***REMOVED***
***REMOVED***
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
        public TaskController(ScrumToolDB p_context)
***REMOVED***
            m_context = p_context;
***REMOVED***


        [Route("[Action]")]
        [HttpPost]
        public ViewComponentResult AddNewTask(Tasks model)
***REMOVED***
            Tasks tempTask = new Tasks(model.BoardID, model.ColumnName, model.TaskContent); // Adding one to the ID because the model has the last task ID.
            m_context.Tasks.Add(tempTask);
            m_context.SaveChanges();

            return ViewComponent("Task", tempTask);
***REMOVED***

        [Route("[Action]")]
        [HttpPost]
        public ViewComponentResult MovedTask(string p_ColumnName, int p_TaskID)
***REMOVED***
            var tasks = m_context.Tasks.ToList();
            Tasks tempTask = null;
            foreach (Tasks t in tasks)
***REMOVED***
                if (t.ID == p_TaskID)
***REMOVED***
                    t.ColumnName = p_ColumnName;
                    tempTask = t;
                    m_context.SaveChanges();
                    
                    break;
***REMOVED***
***REMOVED***

            return ViewComponent("Task", tempTask);


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
***REMOVED***
***REMOVED***
