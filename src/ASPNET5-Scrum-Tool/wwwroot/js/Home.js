var FormBoardSumbit, OnWelcomeButtonClick;

OnWelcomeButtonClick = function() ***REMOVED***
  return $('#curved-green-button').on('click', function() ***REMOVED***
    return $('#InitalButton').animate(***REMOVED***
      'left': '-1000px'
***REMOVED***, 'slow');
  ***REMOVED***);
***REMOVED***;

FormBoardSumbit = function() ***REMOVED***
  return $('.boardFormSubmit').on('click', function(event) ***REMOVED***
    var boardName;
    boardName = $.trim($('#boardName').val());
    if (boardName.length < 1) ***REMOVED***
      alert('Error, a boardName must be supplied');
      return event.preventDefault();
***REMOVED***
  ***REMOVED***);
***REMOVED***;

$(document).ready(FormBoardSumbit());
