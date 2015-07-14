var app = {
  // Initialise app and listen for events
  init: function() {
    // Fetch the data for the first time
    this.fetch();

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

    // Listen for room selections
    $('#room-select').change(function(){
      var roomname = $('#room-select').val();
      roomname ? this.fetch(roomname) : this.fetch();
    }.bind(this));

    // Refresh messages every 10 seconds
    setInterval(function(e) {
      this.fetch(this.getRoom());
    }.bind(this), 10000);
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

    this.fetch(this.getRoom());
  },

  // Make a get request to get messages
  fetch: function(roomname) {
    // Make ajax request to server
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      success: function(data) {
        // Clear html first
        this.clearMessages();

        var messages = data.results;

        // Filter messages if a roomname is passed in
        if (roomname) {
          messages = _.filter(messages, function(item) {
            return item.roomname === roomname;
          });
        }

        // Loop over the messages and output them
        for (var i = 0; i < messages.length; i++) {
          var message = messages[i];

          this.addMessage(message);
          
          if (!this.rooms.hasOwnProperty(message.roomname)) {
            this.rooms[message.roomname] = message.roomname;
            this.addRoom(message.roomname);
          }
        }
      }.bind(this)
    });
  },

  // Clears out all the messages from the chat window
  clearMessages: function() {
    $('#chats').empty();
  },

  // Addes a message to the chat window
  addMessage: function(message) {

    var msg = '<div class="chat">'
      + '<div class="username">' + escapeHtml(message.username) + '</div>'
      + '<div class="message">' + escapeHtml(message.text) + '</div>'
      + '<div class="meta">'
        + '<span class="time">Posted on: ' + escapeHtml(message.createdAt) + '</span>'
        + '<span class="roomname">Posted in: ' + escapeHtml(message.roomname) + '</span>'
      + '</div>'
      + '</div>';

    $('#chats').append(msg);
  },

  rooms: {},

  // Adds a chat room
  addRoom: function(roomName) {
    $('#room-select').append('<option value="' + escapeHtml(roomName) + '">' + escapeHtml(roomName) + '</option>') 
  },

  getRoom: function() {
    return $('#room-select').val();
  },

  // Adds a friend
  addFriend: function() {

  },

  // Handles submission of message sending
  handleSubmit: function(e) {
    var roomname = $('#room-select').val();
    
    if (!roomname) {
      roomname = prompt('Enter a roomname!');
    }

    var message = {
      text: $('#message').val(),
      username: getParameterByName('username'),
      roomname: roomname
    }

    this.send(message);
  }
};