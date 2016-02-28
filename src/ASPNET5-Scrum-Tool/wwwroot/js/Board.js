var AddColumn, AddTaskForm, BoardName, ColumnNameForm, PanelTitleClick, SubmitColumnForm, SubmitTaskForm, TaskForm;

BoardName = $('.BoardNameHeading').text();

ColumnNameForm = "<input class='PreviousColumnName' type='hidden'  style='display: none;' /> <input name='ColumnName' class='NewColumnName'> <input type='submit' value='Continue' class='ColumnTitleSubmit'>";

TaskForm = "<input name='TaskContent' class='TaskContent'> <input type='submit' value='Continue' class='TaskFormSubmit'>";

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

SubmitColumnForm = function() ***REMOVED***
  return $('.panel-heading').on('click', 'input.ColumnTitleSubmit', function(event) ***REMOVED***
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
        ColumnID: newColumnDataID
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

AddTaskForm = function() ***REMOVED***
  return $('#MainColumn').on('click', '.AddTask', function(event) ***REMOVED***
    var PreventFormReload, prevTask, selectedColumn, selectedColumnID;
    event.preventDefault();
    selectedColumn = $(this).parent().parent();
    PreventFormReload = $(selectedColumn).find('TaskContent');
    if (PreventFormReload.length !== 0) ***REMOVED***
      return;
***REMOVED***
    selectedColumnID = $(selectedColumn).attr('id');
    prevTask = $(this).prev();
    return $.ajax(***REMOVED***
      url: '/Board/Show/' + BoardName,
      type: 'GET',
      success: function() ***REMOVED***
        var DoesFormExist, column;
        DoesFormExist = $('#MainColumn').find('.TaskContent');
        if (DoesFormExist.length !== 0) ***REMOVED***
          column = DoesFormExist.parent();
          column.find('.TaskContent').replaceWith("<a class='AddTask'> Add a task.... </a>");
          column.find('.TaskFormSubmit').remove();
***REMOVED***
        return $(selectedColumn).find('.AddTask').replaceWith(TaskForm);
  ***REMOVED***
***REMOVED***);
  ***REMOVED***);
***REMOVED***;

SubmitTaskForm = function() ***REMOVED***
  return $('.panel-body').on('click', '.TaskFormSubmit', function(event) ***REMOVED***
    var selectedColumn, taskContent, taskID;
    event.preventDefault();
    selectedColumn = $('.TaskContent').parent().parent();
    taskContent = $('.TaskContent').val();
    taskID = $('.TaskContent').prev().attr('id');
    if (typeof TaskID !== "undefined" && TaskID !== null) ***REMOVED***
      taskID === 0;
***REMOVED***
    return $.ajax(***REMOVED***
      url: '/Board/AddNewTask',
      type: 'POST',
      data: ***REMOVED***
        ParentColumn: selectedColumn,
        TaskID: taskID,
        TaskContent: taskContent
  ***REMOVED***,
      success: function(data) ***REMOVED***
        alert("Hit the success part");
        return $('#AddColumnButton').before(data);
  ***REMOVED***,
      error: function(error) ***REMOVED***
        return alert("no good " + JSON.stringify(error));
  ***REMOVED***
***REMOVED***);
  ***REMOVED***);
***REMOVED***;

$(document).ready(PanelTitleClick(), SubmitColumnForm(), AddTaskForm(), SubmitTaskForm(), AddColumn());
