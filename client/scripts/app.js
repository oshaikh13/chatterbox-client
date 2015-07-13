var app = {
  // Initialise app and listen for events
  init: function() {
    // Listen for clicks on username
    $('.username').on('click', function(e) {
      e.preventDefault();

      this.addFriend();
    }.bind(this));

    // Listen for form submissions
    $('#send .submit').on('submit', function(e) {
      e.preventDefault();
      
      this.handleSubmit();
    }.bind(this));

    // Fetch the data for the first time
    app.fetch();
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
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      success: function(data) {
        var messages = data.results;

        for (var i = 0; i < messages.length; i++) {
          this.addMessage(messages[i]);
        }
      }.bind(this)
    })
  },

  // Clears out all the messages from the chat window
  clearMessages: function() {
    $('#chats').empty();
  },

  // Addes a message to the chat window
  addMessage: function(message) {

    // createdAt:
    // objectId:
    // roomname:
    // text:
    // updatedAt:
    // username:

    var msg = '<div class="chat">'
      + '<div class="username">' + escapeHtml(message.username) + '</div>'
      + '<div class="message">' + escapeHtml(message.text) + '</div>'
      + '<div class="time">' + escapeHtml(message.createdAt) + '</div>'
      + '<div class="roomname">' + escapeHtml(message.roomname) + '</div>'
      + '</div>';

    $('#chats').append(msg);
  },

  // Adds a chat room
  addRoom: function(roomName) {
    $('#roomSelect').append('<div class="room"></div>') 
  },

  // Adds a friend
  addFriend: function() {

  },

  // Handles submission of message sending
  handleSubmit: function(e) {
    var message = {
      text: $('#message').val(),
      username: getParameterByName('username'),
      roomname: 'to be determined'
    }

    this.send(message);
  }
};