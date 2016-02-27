var AddColumn, BoardName, ColumnNameForm, PanelTitleClick, SumbitColumnForm;

BoardName = $('.BoardNameHeading').text();

ColumnNameForm = "<input class='PreviousColumnName' type='hidden'  style='display: none;' /> <input name='ColumnName' class='NewColumnName'> <input type='submit' value='Continue' class='ColumnTitleSumbit'>";

PanelTitleClick = function() ***REMOVED***
  return $('#MainColumn').on('click', 'div.panel-heading', function() ***REMOVED***
    var PreventFormReload, initalColumnName, selectedColumn, selectedColumnID;
    PreventFormReload = $(this).find('.NewColumnName');
    if (PreventFormReload.length !== 0) ***REMOVED***
      return;
***REMOVED***
    selectedColumn = $(this).parent();
    selectedColumnID = $(selectedColumn).attr('id');
    initalColumnName = $(this).find('.panel-title').text();
    return $.ajax(***REMOVED***
      url: '/Board/Show/' + BoardName,
      type: 'GET',
      success: function() ***REMOVED***
        var DoesFormExist, oldBoardName, panelHeading;
        DoesFormExist = $('#MainColumn').find('.NewColumnName');
        if (DoesFormExist.length !== 0) ***REMOVED***
          panelHeading = DoesFormExist.parent();
          oldBoardName = $('.PreviousColumnName').val();
          panelHeading.html("<h3 class='panel-title'></h3>").text(oldBoardName);
***REMOVED***
        selectedColumn.find('.panel-title').html(ColumnNameForm);
        $('.PreviousColumnName').val(initalColumnName);
        return $('.NewColumnName').val(initalColumnName);
  ***REMOVED***
***REMOVED***);
  ***REMOVED***);
***REMOVED***;

SumbitColumnForm = function() ***REMOVED***
  return $('.panel-heading').on('click', 'input.ColumnTitleSumbit', function(event) ***REMOVED***
    var columnName, columnNumber;
    event.preventDefault();
    columnName = $('.NewColumnName').val().trim();
    columnNumber = $(this).parent().parent().attr('id');
    return $.ajax(***REMOVED***
      url: '/Board/ChangeColumnName',
      type: 'POST',
      data: ***REMOVED***
        ColumnName: columnName,
        ColumnNumber: columnNumber
  ***REMOVED***,
      dataType: 'json',
      success: function(data) ***REMOVED***
        var panelHeading;
        panelHeading = $('.panel-heading').find('.NewColumnName').parent();
        return $(panelHeading).html("<h3 class='panel-title'> <h3>").text(columnName);
  ***REMOVED***,
      error: function(error) ***REMOVED***
        return alert("no good " + JSON.stringify(error));
  ***REMOVED***
***REMOVED***);
  ***REMOVED***);
***REMOVED***;

AddColumn = function() ***REMOVED***
  return $('#AddColumnButton').on('click', function(event) ***REMOVED***
    var newColumnDataID, newColumnName;
    event.preventDefault();
    newColumnDataID = $('#MainColumn').children().last().prev().attr('id');
    newColumnName = 'Something';
    return $.ajax(***REMOVED***
      url: '/Board/AddColumn',
      type: 'POST',
      data: ***REMOVED***
        ColumnName: newColumnName,
        ColumnNumber: newColumnDataID
  ***REMOVED***,
      success: function(data) ***REMOVED***
        return $('#AddColumnButton').before(data);
  ***REMOVED***,
      error: function() ***REMOVED***
        return alert("Hit the error part");
  ***REMOVED***
***REMOVED***);
  ***REMOVED***);
***REMOVED***;

$(document).ready(PanelTitleClick(), SumbitColumnForm(), AddColumn());
