***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
using Microsoft.AspNet.Mvc;
***REMOVED***

***REMOVED***.Controllers
***REMOVED***
    [Route("[controller]")]
    public class BoardController : Controller
***REMOVED***
        Logger<BoardController> logger;

        
        [Route("***REMOVED***BoardName***REMOVED***")]
        public IActionResult Show(string BoardName)
***REMOVED***
            ViewData["Title"] = BoardName;
            return View();
***REMOVED***

        public IActionResult Create()
***REMOVED***
            return View();
***REMOVED***
***REMOVED***
***REMOVED***
