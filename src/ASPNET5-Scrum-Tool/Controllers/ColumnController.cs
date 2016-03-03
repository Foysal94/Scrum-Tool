***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***
using Microsoft.AspNet.Mvc;
***REMOVED***

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

***REMOVED***.Controllers
***REMOVED***
    [Route("[Controller]")]
    public class ColumnController : Controller
***REMOVED***   
        /*
        [Route("[Action]")]
        [HttpPost]
        public JsonResult ChangeColumnName(ColumnModel model)
***REMOVED***
            //ColumnModel column = JsonConvert.DeserializeObject<ColumnModel>(newColumnData);
            // Update column name in the board model, the board model stores a list of columns
            ColumnList[model.ColumnID].ColumnName = model.ColumnName;

            // var json = JsonConvert.SerializeObject( m_Board.ColumnList[model.ColumnNumber]);

            return Json(model.ColumnName);
***REMOVED***

        [Route("[Action]")]
        [HttpPost]
        public ViewComponentResult AddColumn(ColumnModel model)
***REMOVED***
            ColumnModel tempColumn = new ColumnModel(model.ColumnName, model.ColumnID + 1);
            m_Board.ColumnList.Add(tempColumn);
            return ViewComponent("Panel_Lists", tempColumn);
***REMOVED***
        */

***REMOVED***
***REMOVED***
