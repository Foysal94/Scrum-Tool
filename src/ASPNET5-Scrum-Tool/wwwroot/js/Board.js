var AjaxTest, ChangeHTML, GetBoardName;

GetBoardName = function() ***REMOVED***
  var BoardName;
  return BoardName = $('.BoardNameHeading').text();
***REMOVED***;

AjaxTest = function() ***REMOVED***
  return $('.AddTask').on('click', function(event) ***REMOVED***
    var BoardName;
    event.preventDefault();
    BoardName = GetBoardName();
    return $.ajax(***REMOVED***
      url: '/Board/' + BoardName,
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
