var BoardName, ColumnNameForm, PanelTitleClick, SumbitColumnForm;

BoardName = $('.BoardNameHeading').text();

ColumnNameForm = "<form class='ColumnTitleForm' asp-controller='Board' asp-action='ChangeColumnName' method='POST'> <input class='PreviousColumnName' type='hidden'  style='display: none;' /> <input asp-for='ColumnName' class='NewColumnName'> <input type='submit' value='Continue' class='ColumnTitleSumbit'> </form>";

PanelTitleClick = function() ***REMOVED***
  return $('.panel-heading').on('click', function() ***REMOVED***
    var initalColumnName, selectedColumn, selectedColumnID;
    selectedColumn = $(this).parent();
    selectedColumnID = $(selectedColumn).attr('id');
    initalColumnName = $(this).find('.panel-title').text();
    return $.ajax(***REMOVED***
      url: '/Board/Show',
      type: 'GET',
      dataType: 'HTML',
      success: function() ***REMOVED***
        var DoesFormExist, oldBoardName, panelHeading;
        DoesFormExist = $('#MainColumn').find('.ColumnTitleForm');
        if (DoesFormExist.length !== 0) ***REMOVED***
          panelHeading = DoesFormExist.parent();
          oldBoardName = $('.PreviousColumnName').val();
          DoesFormExist.remove();
          panelHeading.append("<h3 class='panel-title'></h3>");
          panelHeading.find('.panel-title').text(oldBoardName);
***REMOVED***
        selectedColumn.find('.panel-title').remove();
        selectedColumn.find('.panel-heading').append(ColumnNameForm);
        $('.PreviousColumnName').val(initalColumnName);
        return $('.NewColumnName').val(initalColumnName);
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
