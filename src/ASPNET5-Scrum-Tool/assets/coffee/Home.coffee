OnWelcomeButtonClick = () ->
    $('#curved-green-button').on 'click', ->
        $('#InitalButton').animate ***REMOVED***'left': '-1000px'***REMOVED***, 'slow'
        
FormBoardSumbit = ->
    $('#boardFormSubmit').on 'click', (event) ->
      boardName = $.trim $('#boardName').val()
      if boardName.length < 1
        alert 'Error, a boardName must be supplied'
        event.preventDefault()
      
        

 
$(document).ready(
    #OnWelcomeButtonClick()
    FormBoardSumbit()
)