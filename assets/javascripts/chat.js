$(function () {


    $('#chat-button').on('click', function () {

        $('#new-chat').show();

        var chat = {

            init: function () {
                this.cacheDOM();
                this.bindEvents();
                this.render();
            },
            cacheDOM: function () {
                this.$chatHistory = $('.chat-history');
                this.$button = $('button');
                this.$textarea = $('#message-to-send');
            },
            bindEvents: function () {
                this.$button.on('click', this.addMessage.bind(this));
                this.$textarea.on('keyup', this.addMessageEnter.bind(this));
            },
            render: function () {
                this.scrollToBottom();
                //if (this.messageToSend.trim() !== '') {
                //    this.scrollToBottom();
                //    this.$textarea.val('');
                //
                //
                //}

            },

            addMessage: function () {
                //this.messageToSend = this.$textarea.val()
                this.render();
            },
            addMessageEnter: function (event) {
                // enter was pressed
                if (event.keyCode === 13) {
                    this.addMessage();
                }
            },
            scrollToBottom: function () {
                this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
            }

        };

        chat.init();


    });

    $('#chat-close').on('click', function (e) {

        $('#new-chat').hide();

    });

});
