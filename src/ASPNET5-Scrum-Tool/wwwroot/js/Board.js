var BoardName, ColumnNameForm, PanelTitleClick, SumbitColumnForm;

BoardName = $('.BoardNameHeading'.text());


/*
AjaxTest = () ->
   $('.AddTask').on 'click', (event) ->
        event.preventDefault()
        BoardName = GetBoardName()
        $.ajax(***REMOVED***
            url: '/Board/' + BoardName,
            type: 'GET',
            dataType: 'HTML'
            success: ChangeHTML
        
***REMOVED***)
 */

PanelTitleClick = function() ***REMOVED***
  return $('.panel-title').on('click', function() ***REMOVED***
    return $.ajax(***REMOVED***
      url: '/Board/' + BoardName,
      type: 'POST',
      dataType: 'HTML',
      success: ColumnNameForm
***REMOVED***);
  ***REMOVED***);
***REMOVED***;

ColumnNameForm = function() ***REMOVED***
  var Form;
  $('.panel-title'.remove());
  Form = "<form class='ColumnTitleForm' asp-controller='Board' asp-action='ChangeColumnName' method='POST'> <input asp-for='ColumnName' class='NewColumnName'> <input type='submit' value='Continue' class='ColumnTitleSumbit'> </form>";
  return $('.panel-heading'.append(Form));
***REMOVED***;

SumbitColumnForm = function() ***REMOVED***
  return $('.ColumnTitleSumbit').on('click', function(event) ***REMOVED***
    event.preventDefault();
    return $.ajax(***REMOVED***
      url: '/Board/ChangeColumnName',
      type: 'POST',
      dataType: 'text',
      success: function() ***REMOVED***
        if (data.status === "Success") ***REMOVED***
          alert("Done");
          return $('.ColumnTitleForm'.submit());
***REMOVED*** else ***REMOVED***
          return alert("Error occurs on the Database level!");
***REMOVED***
  ***REMOVED***,
      error: function() ***REMOVED***
        return alert("An error has occured when changing column name");
  ***REMOVED***
***REMOVED***);
  ***REMOVED***);
***REMOVED***;


/*
ChangeHTML = () -> 
    $('.AddTask').text 'Hello World'
 */

$(document).ready(PanelTitleClick());
