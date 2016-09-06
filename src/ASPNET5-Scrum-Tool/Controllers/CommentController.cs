***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult Create(Comments p_Model)
        ***REMOVED***
            Comments tempComment = p_Model;
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
