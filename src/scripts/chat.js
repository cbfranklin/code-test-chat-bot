// store this selector for repetative use
var $timeline = $('.chat-window-timeline');

// document ready
$(function(){
  handleUserOptions();
  $('.chat-window-close').on('click',closeChatWindow);
  beginBotScript();
})

// begins the bot apocolypse
function beginBotScript(){
  newMessage('partner','Hi! Do you have any questions I can answer for you?');
  presentUserOptions(['Not now', 'Yes please']);
}

// generate and append new message, accepts template (string) and message (string)
function newMessage(template,message){
  if(template === 'partner'){
    partnerIsTyping();
    setTimeout(appendMessage, 1000)
  }
  else{
    appendMessage();
  }
  // generates message HTML from appropriate template, stored in DOM
  function appendMessage(){
    $('.chat-window-timeline .chat-partner-typing').remove();
    template = '.template-chat-' + template;
    var data = {
      message: message
    }
    var templateHTML = $('.templates').find(template).html();
    var renderedHTML = Mustache.to_html(templateHTML, data);
    // append message and scroll to bottom of timeline
    $timeline.append(renderedHTML).scrollTop($timeline[0].scrollHeight);
  }
}

// shows user options, accepts array of options (strings)
function presentUserOptions(options){
  setTimeout(appendUserOptions, 2000);
  function appendUserOptions(){
    var data = {
      options: options,
    }
    var templateHTML = $('.template-chat-user-options').html();
    var renderedHTML = Mustache.to_html(templateHTML, data);
    $timeline.append(renderedHTML);
  }
}

// removes user options after selection
function removeUserOptions(){
  $('.chat-window-timeline .chat-user-options').remove();
}

// displays typing indicator
function partnerIsTyping(){
  var html = $('.template-chat-partner-typing').html();
  $timeline.append(html);
  $timeline.scrollTop($timeline[0].scrollHeight);
}

// handles clicks of user option bubbles
function handleUserOptions(){
  $('body').on('click','.chat-user-options .chat-bubble',function(){
    var choice = $(this).text();
    // Clicking on one of the pre-determined responses causes the other to disappear
    removeUserOptions();
        // rerenders user's choice as a user message bubble ("inactive" styling)
    newMessage('user',choice);
    if(choice.toLowerCase().indexOf('yes') > -1 || choice.toLowerCase().indexOf('actually') > -1){
      // shows the typing indicator, followed by “Great! We’ll get you connected to a representative”
      newMessage('partner', 'Great! We’ll get you connected to a representative')
      // followed by the typing indicator, which acts as loading.
      setTimeout(partnerIsTyping, 1000);
       // The chat window should disappear after 3 seconds once the “Great! We’ll get you connected to a representative” is shown.
      setTimeout(closeChatWindow, 3000);

    }
    else{
      newMessage('partner', 'No problem! If you decide you need me, just click "Contact Us"');
      presentUserOptions('Actually, let’s chat!')
    }
  })
}

function closeChatWindow(){
  $('.chat-window').remove();
}
