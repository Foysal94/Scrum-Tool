
GetBoardName = () ->
    BoardName = $('.BoardNameHeading').text()

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
 
PanelTitleClick = () ->
    $('.panel-title').on 'click', () ->
          $.ajax(***REMOVED***
            url: '/Board/' + BoardName,
            type: 'POST',
            dataType: 'HTML'

***REMOVED***)

ChangePanelTitle = () ->


ChangeHTML = () -> 
    $('.AddTask').text 'Hello World' 



$(document).ready(
    
    AjaxTest()
)