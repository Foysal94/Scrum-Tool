var AjaxTest, ChangeHTML;

AjaxTest = function() ***REMOVED***
  return $('.AddTask').on('click', function(event) ***REMOVED***
    event.preventDefault();
    return $.ajax(***REMOVED***
      url: '@Url.Action("Show","Board")',
      type: 'GET',
      dataType: 'HTML',
      success: ChangeHTML
***REMOVED***);
  ***REMOVED***);
***REMOVED***;

ChangeHTML = function() ***REMOVED***
  return $('.AddTask').text('Hello World');
***REMOVED***;

$(document).ready(AjaxTest());
