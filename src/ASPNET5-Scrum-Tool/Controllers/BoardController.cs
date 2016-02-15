***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
using Microsoft.AspNet.Mvc;
***REMOVED***

***REMOVED***.Controllers
***REMOVED***
    public class BoardController : Controller
***REMOVED***
        Logger<BoardController> logger;

        [Route("***REMOVED***boardName***REMOVED***")]
        public IActionResult Show(string boardName)
***REMOVED***
            ViewData["Title"] = boardName;
            return View();
***REMOVED***

        public IActionResult Create()
***REMOVED***
            return View();
***REMOVED***
***REMOVED***
***REMOVED***
