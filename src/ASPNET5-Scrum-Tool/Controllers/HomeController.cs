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

        
        public IActionResult GoToBoardPage([FromBody] string Name)
***REMOVED***
            //string Name = "Hello";
            return RedirectToAction("Show", "Board", new ***REMOVED*** boardName = Name***REMOVED***);
***REMOVED***

        public IActionResult Error()
***REMOVED***
            return View();
***REMOVED***
***REMOVED***
***REMOVED***
