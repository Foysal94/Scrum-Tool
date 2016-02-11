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
        
        public IActionResult Index(string pBoardName)
***REMOVED***
            ViewData["Title"] = pBoardName;
            return View();
***REMOVED***
        
        public IActionResult Create()
***REMOVED***
            return View();
***REMOVED***
***REMOVED***
***REMOVED***
