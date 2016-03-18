DeleteLabelLink = () ->
     $('body').on 'click', '.DeleteTaskLabel', (event) ->
        event.preventDefault()
        labelParent_li = $(this).closest('.TaskLabels')
        labelID = $(labelParent_li).attr 'id'
        
        $.ajax
            url: '/Label/Delete'
            type: 'POST'
            data: ***REMOVED***p_LabelID: labelID***REMOVED***
            success: (data) ->
                  alert 'Label was added successfully'
                  labelParent_li.remove()
            error: (error) ->
                  alert 'Error while deleting Label'
                  alert "no good "+JSON.stringify(error);
                  
AddLabelClick = () ->
    $('body').on 'click', '.TaskColourLabel', (event) ->
        event.preventDefault();
        labelColour = $(this).attr 'id'
        colour = labelColour.slice(0,-5)
        taskID = $('.TaskWindow').attr 'id'
        
        $.ajax 
              url: '/Label/TaskAddLabel'
              type: 'POST'
              data: ***REMOVED***p_TaskID: taskID, p_LabelColour: colour ***REMOVED***
              success: (data) ->
                         alert 'Label was added successfully'
                         $('.LabelListDiv').find('ul').append data
              error: (error) ->
                     alert 'AddLabelClick Method'
                     alert "no good "+JSON.stringify(error);
                  
$(document).ready(
    DeleteLabelLink()
    AddLabelClick()
)
