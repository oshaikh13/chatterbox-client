var app = {
  // Initialise app and listen for events
  init: function() {
    $('.username').on('click', function(e) {
      e.preventDefault();

      this.addFriend();
    }.bind(this));

    $('#send .submit').on('submit', function(e) {
      e.preventDefault();

      this.handleSubmit();
    }.bind(this));
  },
  
  // Makes a post request to send a message
  send: function(message) {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  },

  // Make a get request to get messages
  fetch: function(){
    $.ajax({
      type: 'GET',
      success: function(data){
        console.log(data);
      }
    })
  },

  // Clears out all the messages from the chat window
  clearMessages: function() {
    $('#chats').empty();
  },

  // Addes a message to the chat window
  addMessage: function(message) {
    $('#chats').append('<div class="chat username"></div>');
  },

  // Adds a chat room
  addRoom: function(roomName) {
    $('#roomSelect').append('<div class="room"></div>') 
  },

  // Adds a friend
  addFriend: function() {

  },

  // Handles submission of message sending
  handleSubmit: function() {
    
  }
}