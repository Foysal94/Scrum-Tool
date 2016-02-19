AjaxTest = () ->
   $('.AddTask').on 'click', (event) ->
        event.preventDefault()
        
        $.ajax(***REMOVED***
            url: '@Url.Action("Show","Board")',
            type: 'GET',
            dataType: 'HTML'
            success: ChangeHTML
        
***REMOVED***)
    
    

ChangeHTML = () -> 
    $('.AddTask').text 'Hello World' 
   


$(document).ready(
    
    AjaxTest()
)