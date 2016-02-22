var BoardName, ColumnNameForm, PanelTitleClick, SumbitColumnForm;

BoardName = $('.BoardNameHeading').text();

ColumnNameForm = "<form class='ColumnTitleForm' asp-controller='Board' asp-action='ChangeColumnName' method='POST'> <input asp-for='ColumnName' class='NewColumnName'> <input type='submit' value='Continue' class='ColumnTitleSumbit'> </form>";

PanelTitleClick = function() ***REMOVED***
  return $('.panel-heading').on('click', function() ***REMOVED***
    var column, columnID;
    column = $(this).parent();
    columnID = $(column).attr('id');
    return $.ajax(***REMOVED***
      url: '/Board/' + BoardName,
      type: 'GET',
      dataType: 'HTML',
      success: function() ***REMOVED***
        column.find('.panel-title').remove();
        return column.find('.panel-heading').append(ColumnNameForm);
  ***REMOVED***
***REMOVED***);
  ***REMOVED***);
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
