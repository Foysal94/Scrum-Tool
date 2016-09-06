***REMOVED***
***REMOVED***
using Microsoft.AspNetCore.Mvc;
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