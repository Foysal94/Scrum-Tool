***REMOVED***
***REMOVED***
using Microsoft.AspNet.Mvc;
***REMOVED***

***REMOVED***.Controllers.Components
***REMOVED***
    public class Panel_ListsViewComponent : ViewComponent
***REMOVED***
        private ScrumToolDB m_context;

        public Panel_ListsViewComponent(ScrumToolDB p_context)
***REMOVED***
            m_context = p_context;
***REMOVED***

        public IViewComponentResult Invoke(Columns model)
***REMOVED***
            var TaskList = m_context.Tasks.ToList();

            foreach (Tasks t in TaskList)
***REMOVED***
                if (t.ColumnName == model.Name && t.BoardID == model.BoardID)
***REMOVED***
                    model.TasksList.Add(t);
                    t.ParentColumn = model;
***REMOVED***
***REMOVED***
            
            return View(model);
            
***REMOVED***

        /*
        public Task<IViewComponentResult> InvokeAsync()
***REMOVED***
            return View();
***REMOVED***
        */
***REMOVED***
***REMOVED***