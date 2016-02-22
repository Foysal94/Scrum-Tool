***REMOVED***
using Microsoft.AspNet.Mvc;
***REMOVED***

***REMOVED***.Controllers.Components
***REMOVED***
    public class Panel_ListsViewComponent : ViewComponent
***REMOVED***
        private int m_ColumnID = 0;

        public IViewComponentResult Invoke(ColumnModel model)
***REMOVED***
            m_ColumnID++;
            
            ViewData["ColumnID"] = m_ColumnID;
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