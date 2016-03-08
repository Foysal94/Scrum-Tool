***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.ModelBinding.Validation;
***REMOVED***
using Newtonsoft.Json;

***REMOVED***.Controllers
***REMOVED***
    [Route("[controller]")]
    public class BoardController : Controller
***REMOVED***
        //Logger<BoardController> logger;
        public Boards m_Board;
        private ScrumToolDB m_context;
        public BoardController(ScrumToolDB p_context)
***REMOVED***
            m_context = p_context;
***REMOVED***
        
        [Route("[Action]/***REMOVED***p_BoardName***REMOVED***")]
        public IActionResult Index(string p_BoardName)
***REMOVED***
            m_Board.Name = p_BoardName;
            ViewData["BoardName"] = m_Board.Name;
            return View(m_Board);
***REMOVED***

        [Route("[Action]/***REMOVED***p_BoardName***REMOVED***")]
        public IActionResult Load(string p_BoardName)
***REMOVED***
            return View();
***REMOVED***

        public IActionResult Create(string p_BoardName)
***REMOVED***
            return View();
***REMOVED***
        
***REMOVED***
***REMOVED***
