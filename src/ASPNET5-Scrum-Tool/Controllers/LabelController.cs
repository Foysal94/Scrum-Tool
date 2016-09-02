***REMOVED***
***REMOVED***
***REMOVED***
using System.Security.AccessControl;
***REMOVED***
using Microsoft.AspNetCore.Mvc;
***REMOVED***

***REMOVED***.Controllers
***REMOVED***
    [Route("[Controller]")]
    public class LabelController : Controller
***REMOVED***
        private ScrumToolDB m_context;
        private Labels m_Label;
        public LabelController(ScrumToolDB p_context)
***REMOVED***
            m_context = p_context;
            m_Label = null;
***REMOVED***

        [Route("[Action]")]
        [HttpPost]
        public void Delete(int p_LabelID)
***REMOVED***
            var labelList = m_context.Labels.ToList();

            foreach (Labels label in labelList)
***REMOVED***
                if (label.ID == p_LabelID)
***REMOVED***
                    m_context.Labels.Remove(label);
                    m_context.SaveChanges();
                    break;
***REMOVED***
***REMOVED***
***REMOVED***

        [Route("[Action]")]
        [HttpPost]
        public void Add(int p_TaskID, string p_LabelColour)
***REMOVED***
            m_Label = new Labels(p_TaskID, p_LabelColour);
            m_context.Labels.Add(m_Label);
            m_context.SaveChanges();
***REMOVED***

        [Route("[Action]")]
        [HttpPost]
        public ViewComponentResult TaskAddLabel(int p_TaskID, string p_LabelColour)
***REMOVED***
            m_Label = new Labels(p_TaskID, p_LabelColour);
            m_context.Labels.Add(m_Label);
            m_context.SaveChanges();
            return ViewComponent("Label", m_Label);
***REMOVED***

***REMOVED***
***REMOVED***
