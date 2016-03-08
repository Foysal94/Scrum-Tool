***REMOVED***
***REMOVED***
using System.Data.SqlClient;
using System.Data.SqlTypes;
***REMOVED***
***REMOVED***
***REMOVED***
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity;

***REMOVED***.Controllers
***REMOVED***
    public class HomeController : Controller
***REMOVED***
        private ScrumToolDB m_context;

        public HomeController(ScrumToolDB p_context)
***REMOVED***
            m_context = p_context;
***REMOVED***

        public IActionResult Index()
***REMOVED***
            var Board = new Boards();
            return View(Board);
***REMOVED***

        [HttpPost]
        public IActionResult SumbitBoardForm(Boards model)
***REMOVED***
            var query = from board in m_context.Boards where board.Name.Equals(model.Name) select board;
            var boards = m_context.Boards.ToList();
            bool found = false;
            foreach (var boardModel in boards)
***REMOVED***
                if (boardModel.Name == model.Name)
***REMOVED***
                    found = true;
                    break;
***REMOVED***
***REMOVED***

            return RedirectToAction("Index", "Board", new ***REMOVED*** p_BoardName = model.Name***REMOVED*** );
***REMOVED***


***REMOVED***
***REMOVED***
