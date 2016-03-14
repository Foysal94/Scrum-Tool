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
            m_Board = null;
            m_context = p_context;
***REMOVED***
        
        [Route("[Action]/***REMOVED***p_BoardName***REMOVED***")]
        public IActionResult Index(string p_BoardName)
***REMOVED***
            m_Board.Name = p_BoardName;
            ViewData["BoardName"] = m_Board.Name;
            return View(m_Board);
***REMOVED***

        [Route("[Action]/***REMOVED***p_BoardID***REMOVED***")]
        public IActionResult Load(int p_BoardID)
***REMOVED***
            var boardList = m_context.Boards.ToList();

            foreach (Boards b in boardList)
***REMOVED***
                if (b.ID == p_BoardID)
***REMOVED***
                    m_Board = b;
                    m_Board.ColumnList  = new List<Columns>();
                    break;
***REMOVED***
***REMOVED***


            var columnList = m_context.Columns.ToList();
            var taskList = m_context.Tasks.ToList();
            var labelList = m_context.Labels.ToList();
            foreach (Columns c in columnList)
***REMOVED***
                if (c.BoardID == m_Board.ID)
***REMOVED***
                    c.TasksList = new List<Tasks>();
                    foreach (Tasks t in taskList)
***REMOVED***
                        if (t.ColumnName == c.Name)
***REMOVED***
                            t.LabelList = new List<Labels>();
                            foreach (Labels label in labelList)
***REMOVED***
                                if (t.ID == label.TaskID)
***REMOVED***
                                    t.LabelList.Add(label);
***REMOVED***
***REMOVED***

                            c.TasksList.Add(t);
***REMOVED***
***REMOVED***
                    m_Board.ColumnList.Add(c);
                    //c.ParentBoard = m_Board;
***REMOVED***
***REMOVED***
            
            return View("Show", m_Board);
            
***REMOVED***

        [Route("[Action]/***REMOVED***p_BoardID***REMOVED***")]
        public IActionResult Create(int p_BoardID)
***REMOVED***
            string boardName = (string) TempData["BoardName"];
            //int boardID = (int) TempData["BoardID"];
            var boards = m_context.Boards.ToList();
            if (boards.Count == p_BoardID)
***REMOVED***
                return RedirectToAction("Load", "Board", new ***REMOVED*** p_BoardID = boards.Count ***REMOVED***);
***REMOVED***
            m_Board = new Boards(boardName);
            
            m_context.Boards.Add(m_Board);
            m_context.SaveChanges();
            return View("Show", m_Board);
***REMOVED***


        [Route("[Action]")]
        [HttpGet]
        public IActionResult ColumnNameChangeForm()
***REMOVED***
           // ViewData["ColumnName"] = p_InitalColumnName;
            return PartialView("_ColumnNameChangeForm");
***REMOVED***

        [Route("[Action]")]
        [HttpGet]
        public IActionResult AddColumnForm()
***REMOVED***
            // ViewData["ColumnName"] = p_InitalColumnName;
            return PartialView("_AddColumnForm");
***REMOVED***

        [Route("[Action]")]
        [HttpGet]
        public IActionResult AddTaskForm()
***REMOVED***
            // ViewData["ColumnName"] = p_InitalColumnName;
            return PartialView("_AddTaskForm");
***REMOVED***
***REMOVED***
***REMOVED***
