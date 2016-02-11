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
        
<<<<<<< HEAD
        public IActionResult Index(string pBoardName)
***REMOVED***
            ViewData["Title"] = pBoardName;
=======
        public IActionResult Index(string p_BoardName)
***REMOVED***
            ViewData["Title"] = p_BoardName;
>>>>>>> 80e0797f1f6c68d1e9e129fc830cd262303c3682
            return View();
***REMOVED***
        
        public IActionResult Create()
***REMOVED***
            return View();
***REMOVED***
***REMOVED***
***REMOVED***
