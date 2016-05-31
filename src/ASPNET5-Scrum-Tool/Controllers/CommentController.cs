***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
using Microsoft.AspNet.Mvc;

***REMOVED***.Controllers
***REMOVED***
    [Route("[Controller]")]
    public class CommentController : Controller
***REMOVED***
        private ScrumToolDB m_context;
        
        public CommentController(ScrumToolDB p_context)
***REMOVED***
            m_context = p_context;
***REMOVED***


        [Route("[Action]")]
        [HttpPost]
        public IActionResult Create(int p_TaskID, string p_Name, string p_Content)
***REMOVED***
            Comments tempComment = new Comments(p_Name, p_Content, p_TaskID);
            m_context.Comments.Add(tempComment);
            m_context.SaveChanges();
            return ViewComponent("Comment", tempComment);
***REMOVED***

        [Route("[Action]")]
        [HttpPost]
        public void Delete(int p_CommentID)
***REMOVED***
            var commentList = m_context.Comments.ToList();

            foreach (Comments c in commentList)
***REMOVED***
                if (c.ID == p_CommentID)
***REMOVED***
                    m_context.Comments.Remove(c);
                    m_context.SaveChanges();
                    break;
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
