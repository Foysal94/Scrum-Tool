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

        public IActionResult About()
***REMOVED***
            ViewData["Message"] = "Your application description page.";

            return View();
***REMOVED***

        public IActionResult Contact()
***REMOVED***
            ViewData["Message"] = "Your contact page.";

            return View();
***REMOVED***

        public IActionResult Error()
***REMOVED***
            return View();
***REMOVED***
***REMOVED***
***REMOVED***
