***REMOVED***
using Microsoft.AspNet.Mvc;
***REMOVED***

***REMOVED***.Controllers.Components
***REMOVED***
    public class Panel_ListsViewComponent : ViewComponent
***REMOVED***
        

        public IViewComponentResult Invoke(ColumnModel model)
***REMOVED***
            ViewData["ColumnNumber"] = model.ColumnNumber;
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