var AddColumn, BoardName, ColumnNameForm, PanelTitleClick, SumbitColumnForm;

BoardName = $('.BoardNameHeading').text();

ColumnNameForm = "<input class='PreviousColumnName' type='hidden'  style='display: none;' /> <input name='ColumnName' class='NewColumnName'> <input type='submit' value='Continue' class='ColumnTitleSumbit'>";

PanelTitleClick = function() ***REMOVED***
  return $('.panel-heading').on('click', function() ***REMOVED***
    var PreventFormReload, initalColumnName, selectedColumn, selectedColumnID;
    PreventFormReload = $(this).find('.NewColumnName');
    if (PreventFormReload.length !== 0) ***REMOVED***
      return;
***REMOVED***
    selectedColumn = $(this).parent();
    selectedColumnID = $(selectedColumn).attr('id');
    initalColumnName = $(this).find('.panel-title').text();
    return $.ajax(***REMOVED***
      url: '/Board/Show',
      type: 'GET',
      dataType: 'HTML',
      success: function() ***REMOVED***
        var DoesFormExist, oldBoardName, panelHeading;
        DoesFormExist = $('#MainColumn').find('.NewColumnName');
        if (DoesFormExist.length !== 0) ***REMOVED***
          panelHeading = DoesFormExist.parent();
          oldBoardName = $('.PreviousColumnName').val();
          DoesFormExist.remove();
          $('.ColumnTitleSumbit').remove();
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
      success: function(data) ***REMOVED***
        var panelHeading, panelTitleHTML;
        panelTitleHTML = "<h3 class='panel-title'></h3>";
        panelHeading = $('.panel-heading').find('.NewColumnName').parent();
        $(panelHeading).empty();
        $(panelHeading).append(panelTitleHTML);
        return $(panelHeading).find('.panel-title').text(columnName);
  ***REMOVED***,
      error: function(xhr, err) ***REMOVED***
        alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status);
        return alert("responseText: " + xhr.responseText);
  ***REMOVED***
***REMOVED***);
  ***REMOVED***);
***REMOVED***;

AddColumn = function() ***REMOVED***
  return $('#AddColumnButton').on('click', function(event) ***REMOVED***
    event.preventDefault();
    return $.ajax(***REMOVED***
      url: '/Board/AddColumn',
      type: 'POST',
      success: function(data) ***REMOVED***
        alert("Hit the success part");
        return alert(data);
  ***REMOVED***,
      error: function() ***REMOVED***
        return alert("Hit the error part");
  ***REMOVED***
***REMOVED***);
  ***REMOVED***);
***REMOVED***;

$(document).ready(PanelTitleClick(), SumbitColumnForm(), AddColumn());
