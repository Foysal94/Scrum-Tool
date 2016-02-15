***REMOVED***
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
            var Board = new BoardModel();
            return View(Board);
***REMOVED***

        [HttpGet]
        public IActionResult SumbitBoardForm(BoardModel model)
***REMOVED***
            
            return RedirectToAction("Show", "Board", new ***REMOVED*** BoardName = model.BoardName***REMOVED*** );
***REMOVED***

        public IActionResult Error()
***REMOVED***
            return View();
***REMOVED***
***REMOVED***
***REMOVED***
