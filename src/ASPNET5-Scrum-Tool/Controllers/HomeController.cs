***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
using Microsoft.AspNet.Mvc;

***REMOVED***.Controllers
***REMOVED***
    public class HomeController : Controller
***REMOVED***
        public IActionResult Index()
***REMOVED***
            return View();
***REMOVED***

        [HttpGet]
        public IActionResult GoToBoardPage()
***REMOVED***
            string boardName = "";
            return RedirectToAction("Index", "Board", boardName);
***REMOVED***

        public IActionResult Error()
***REMOVED***
            return View();
***REMOVED***
***REMOVED***
***REMOVED***
