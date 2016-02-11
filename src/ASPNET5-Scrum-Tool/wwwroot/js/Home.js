<<<<<<< HEAD
var FormBoardSumbit, OnWelcomeButtonClick;
=======
var OnWelcomeButtonClick;
>>>>>>> 80e0797f1f6c68d1e9e129fc830cd262303c3682

OnWelcomeButtonClick = function() ***REMOVED***
  return $('#curved-green-button').on('click', function() ***REMOVED***
    return $('#InitalButton').animate(***REMOVED***
      'left': '-1000px'
***REMOVED***, 'slow');
  ***REMOVED***);
***REMOVED***;

<<<<<<< HEAD
FormBoardSumbit = function() ***REMOVED***
  return $('#boardFormSubmit').on('click', function(event) ***REMOVED***
    var boardName;
    boardName = $.trim($('#boardName').val());
    if (boardName.length < 1) ***REMOVED***
      alert('Error, a boardName must be supplied');
      return event.preventDefault();
***REMOVED***
  ***REMOVED***);
***REMOVED***;

$(document).ready(FormBoardSumbit());
=======
$(document).ready(function() ***REMOVED***
  return OnWelcomeButtonClick();
***REMOVED***);
>>>>>>> 80e0797f1f6c68d1e9e129fc830cd262303c3682
