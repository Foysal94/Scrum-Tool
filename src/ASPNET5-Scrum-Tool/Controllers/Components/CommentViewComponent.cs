***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
using Microsoft.AspNetCore.Mvc;

***REMOVED***.Controllers.Components
***REMOVED***
    public class CommentViewComponent : ViewComponent
    ***REMOVED***

        public IViewComponentResult Invoke(Comments model)
        ***REMOVED***
            return View("Comment", model);
***REMOVED***

        /*
        public Task<IViewComponentResult> InvokeAsync()
        ***REMOVED***
            return View();
***REMOVED***
        */
***REMOVED***
***REMOVED***
