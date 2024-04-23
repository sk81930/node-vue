<template>
    <div class="chat__container">
        <div class="chat__wrapper py-2 pt-mb-2 pb-md-3">
          <div class="chat__messaging pb-2 pb-md-2 pl-2 pl-md-4 pr-2" :class="{'messaging-member--online': userOnline}">
            <div class="chat__previous d-flex d-md-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon svg-icon--previous" viewBox="0 0 45.5 30.4">
                <path d="M43.5,13.1H7l9.7-9.6A2.1,2.1,0,1,0,13.8.6L.9,13.5h0L.3,14v.6c0,.1-.1.1-.1.2v.4a2,2,0,0,0,.6,1.5l.3.3L13.8,29.8a2.1,2.1,0,1,0,2.9-2.9L7,17.2H43.5a2,2,0,0,0,2-2A2.1,2.1,0,0,0,43.5,13.1Z" fill="#f68b3c" />
              </svg>
            </div>
            <div class="chat__notification d-flex d-md-none chat__notification--new">
              <span>1</span>
            </div>
            <div class="chat__infos pl-2 pl-md-0">
              <div class="chat-member__wrapper" data-online="false" v-if="chatUser">
                <div class="chat-member__avatar">
                  <img src="../../Assets/images/user-1.jpg" alt="Jenny Smith" loading="lazy">
                  <div class="user-status user-status--large"></div>
                </div>
                <div class="chat-member__details">
                  <span class="chat-member__name">{{chatUser.name}}</span>
                  <span class="chat-member__status" v-if="(userOnline == true)">Online</span>
                  <span class="chat-member__status" v-else>Offline</span>
                </div>
              </div>
            </div>
            <div class="chat__actions mr-2 ">
              <ul class="m-0">
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 48 48">
                    <path d="M38.4,48c-2.1,0-5.1-.8-9.5-3.2a62.9,62.9,0,0,1-14.6-11A61.7,61.7,0,0,1,3.2,19C-.9,11.8-.3,8.5.7,6.4A9.7,9.7,0,0,1,4.8,2,21.1,21.1,0,0,1,7.8.4h.3c1.8-.7,3-.3,4.9,1.5h.1a40.1,40.1,0,0,1,5.4,8.2c1.3,2.6,1.6,4.3-.2,6.9l-.5.6c-.8,1-.8,1.2-.8,1.6s1.9,3.4,5.2,6.7S28,30.8,28.8,31s.6,0,1.6-.8l.7-.4c2.5-1.9,4.2-1.6,6.8-.3A40.6,40.6,0,0,1,46.1,35h.1c1.8,1.9,2.2,3.1,1.5,4.9v.2h0a21.1,21.1,0,0,1-1.6,3,10,10,0,0,1-4.3,4.1A7.7,7.7,0,0,1,38.4,48ZM9.5,4.1H9.2L6.9,5.4H6.8A6.3,6.3,0,0,0,4.3,8.1c-.3.7-1.2,2.6,2.4,9A58.9,58.9,0,0,0,17.1,30.9,58.2,58.2,0,0,0,30.9,41.3c6.4,3.6,8.4,2.7,9.1,2.4a6.7,6.7,0,0,0,2.5-2.5.1.1,0,0,0,.1-.1c.5-.8.9-1.6,1.3-2.4v-.2l-.5-.6a35.4,35.4,0,0,0-7.3-4.8c-1.7-.8-1.8-.8-2.7-.1l-.6.4A5.3,5.3,0,0,1,28,34.9c-2.9-.6-7.4-4.9-8.7-6.2s-5.6-5.8-6.2-8.7.6-3.6,1.5-4.8l.4-.6c.7-.9.8-1-.1-2.7a35.4,35.4,0,0,0-4.8-7.3Z" fill="#f68b3c" />
                  </svg>
                </li>
                <li>
                  <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 46.8 47.4" @click="screenShare2" v-if="showV">
                    <path d="M35.8,47.4H11a11,11,0,0,1-11-11V11.6A11,11,0,0,1,11,.6h8.8a2,2,0,1,1,0,4H11a7,7,0,0,0-7,7V36.4a7,7,0,0,0,7,7H35.8a7,7,0,0,0,7-7v-9a2,2,0,1,1,4,0v9A11,11,0,0,1,35.8,47.4Z" fill="#f68b3c" />
                    <path d="M36.6,20.4A10.2,10.2,0,1,1,46.8,10.2,10.2,10.2,0,0,1,36.6,20.4ZM36.6,4a6.2,6.2,0,1,0,6.2,6.2A6.2,6.2,0,0,0,36.6,4Z" fill="#f68b3c" />
                  </svg>
                </li>
                <li class="chat__details d-flex d-xl-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 42.2 11.1">
                    <g>
                      <circle cx="5.6" cy="5.6" r="5.6" fill="#d87232" />
                      <circle cx="21.1" cy="5.6" r="5.6" fill="#d87232" />
                      <circle cx="36.6" cy="5.6" r="5.6" fill="#d87232" />
                    </g>
                  </svg>
                </li>
              </ul>

            </div>
          </div>
          <div class="chat__content pt-4 px-3"  ref="messageContainer">
            <ul class="chat__list-messages" v-if="chatData">
              <li  v-for="(chatdd, chat_ind) in chatData" :index="chat_ind"  >
                  <div class="chat__time" v-if="chatdd && chatdd.message && shouldDisplayTimestamp(chat_ind,formatTimestamp(chatdd.updatedAt))">{{formatTimestamp(chatdd.updatedAt)}}</div>
                  <div :class="getClassChat(chatdd,crUser.id)"  class="chat__bubble">
                      {{chatdd.message}}
                  </div>
              </li>
             
              <li v-for="(msg, index) in messages" :key="index">
                <div class="chat__time">09:26</div>
                <div class="chat__bubble chat__bubble--me">
                  {{ msg }}
                </div>
              </li>
            </ul>
          </div>

          <div class="chat__send-container px-2 px-md-3 pt-1 pt-md-3">
            <div class="custom-form__send-wrapper">

              <EmojiPicker v-model="message_text" @input="startTyping" @keydown.enter="submitMessage" picker-type="input" @update:text="onSelectEmoji" ref="emojiPicker" />
              <div class="custom-form__send-img">
                <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon svg-icon--send-img" viewBox="0 0 45.7 45.7">
                  <path d="M6.6,45.7A6.7,6.7,0,0,1,0,39.1V6.6A6.7,6.7,0,0,1,6.6,0H39.1a6.7,6.7,0,0,1,6.6,6.6V39.1h0a6.7,6.7,0,0,1-6.6,6.6ZM39,4H6.6A2.6,2.6,0,0,0,4,6.6V39.1a2.6,2.6,0,0,0,2.6,2.6H39.1a2.6,2.6,0,0,0,2.6-2.6V6.6A2.7,2.7,0,0,0,39,4Zm4.7,35.1Zm-4.6-.4H6.6a2.1,2.1,0,0,1-1.8-1.1,2,2,0,0,1,.3-2.1l8.1-10.4a1.8,1.8,0,0,1,1.5-.8,2.4,2.4,0,0,1,1.6.7l4.2,5.1,6.6-8.5a1.8,1.8,0,0,1,1.6-.8,1.8,1.8,0,0,1,1.5.8L40.7,35.5a2,2,0,0,1,.1,2.1A1.8,1.8,0,0,1,39.1,38.7Zm-17.2-4H35.1l-6.5-8.6-6.5,8.4C22,34.6,22,34.7,21.9,34.7Zm-11.2,0H19l-4.2-5.1Z" fill="#f68b3c" />
                </svg>
              </div>
              <button type="button" class="custom-form__send-submit" @click="submitMessage">
                <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon svg-icon--send" viewBox="0 0 45.6 45.6">
                  <g>
                    <path d="M20.7,26.7a1.4,1.4,0,0,1-1.2-.6,1.6,1.6,0,0,1,0-2.4L42.6.5a1.8,1.8,0,0,1,2.5,0,1.8,1.8,0,0,1,0,2.5L21.9,26.1A1.6,1.6,0,0,1,20.7,26.7Z" fill="#d87232" />
                    <path d="M29.1,45.6a1.8,1.8,0,0,1-1.6-1L19.4,26.2,1,18.1a1.9,1.9,0,0,1-1-1.7,1.8,1.8,0,0,1,1.2-1.6L43.3.1a1.7,1.7,0,0,1,1.8.4,1.7,1.7,0,0,1,.4,1.8L30.8,44.4a1.8,1.8,0,0,1-1.6,1.2ZM6.5,16.7l14.9,6.6a2,2,0,0,1,.9.9l6.6,14.9L41,4.6Z" fill="#d87232" />
                  </g>
                </svg>
              </button>
            </div>
          </div>
          <p class="type_div" v-if="isTyping">Typing.......</p>
          <button @click="screenShare">Screen share</button>
          <div style="display:flex">
          <video ref="localVideo" id="local-video" style="width:50%" autoplay></video>
          <video ref="remoteVideo" id="remote-video" style="width:50%" autoplay></video>
          </div>
        </div>
      </div>
</template>
<script>
  import { ref, watchEffect } from 'vue'
  import "./chatstyle.scss";

  import store from '../../Store';
  import Multiselect from '@vueform/multiselect'

  import EmojiPicker from "vue3-emoji-picker";
  import "/node_modules/vue3-emoji-picker/dist/style.css";

  let typingTimer;

  let rtcPeerConnection;
  let  iceServers = {
          iceServers: [
              {
                urls: "stun:stun.services.mozilla.com",
              },
              {
                urls: "stun:stun.l.google.com:19302",
              },
            ],
          };
  export default {
      name: 'chatContainer',
      components: {
          EmojiPicker
      },
      data() {
          return {
              socket: null,
              conversationId: null,
              messages: [],
              message: '',
              message_text: "",
              chatUsers: [],
              chatFilterUser: [],
              conversations: [],
              searchTerm: '',
              crUser: null,
              chatData: null,
              chatUser: null,
              userOnline: false,
              isTyping: false,
              creater: false,
              userStream: null,
              showV: false,
              reciever_id2: null,
          }
      },
      async created() {

        

      },
      mounted() {

            //socket.emit('online_users');

            this.socket = this.$parent.socket;

            let _that = this;



            watchEffect(() => {

              


              if(this.$parent.chatData && this.$parent.chatData.dataMessages){
                  let chatData = [];

                  this.$parent.chatData.dataMessages.forEach(function(dataM){

                      if(dataM.message){

                        var message_data = {}
                        message_data.updatedAt = dataM.updatedAt;
                        message_data.message = dataM.message.body;
                        message_data.sender_id = dataM.sender_id;
                        message_data.reciever_id = dataM.reciever_id;

                        chatData.push(message_data);

                      }

                  })

                  this.chatData = chatData;
              }
              if(this.$parent.chatData && this.$parent.chatData.user){
                  this.chatUser = this.$parent.chatData.user;
              }

              this.crUser = this.$parent.crUser;

              this.conversationId = this.$parent.conversationId;

              setTimeout(function(){
                    var messageBody = document.querySelector('.chat__content');
                    messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;   
              },100)

              


            }, this.$route.params.id);

            // watchEffect(() => {

            //   if(this.$parent.onlineUsers && this.$parent.onlineUsers.length > 0){
            //       var existOnline = this.$parent.onlineUsers.filter((user) => user == this.chatUser.id);

            //       if(existOnline){
            //           this.userOnline = true;
            //       }else{
            //           this.userOnline = false;
            //       }

            //   }else{
            //       this.userOnline = false;
            //   }

            // }, this.$parent.onlineUsers);

            if(this.socket){

              this.socket.on('chat_message', data => {

                  //console.log(data, this.chatData)

                  if(data.conversation_id == this.conversationId){
                    this.chatData.push(data)
                    setTimeout(function(){
                          var messageBody = document.querySelector('.chat__content');
                          messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;   
                    },100)
                  }

                  this.$parent.getConversations();
              });

              this.socket.on('online_users', users => {

                  if(users && users.length > 0){

                        var existOnline = users.find((user) => user.userId == this.chatUser.id);


                        if(existOnline){
                            this.userOnline = true;
                        }else{
                            this.userOnline = false;
                        }
                  }else{
                      this.userOnline = false;
                  }


              });
              this.socket.on('user_typing', user_typing_data => {
                if(user_typing_data && user_typing_data.user_typing){
                  this.isTyping = true;
                }else{
                  this.isTyping = false;
                }
              });

              this.socket.on('request', data => {

                    this.showV = true;

                    this.reciever_id2 = data.sender_id;

                    
                  /*navigator.mediaDevices.getDisplayMedia({ audio: true, video: true})
                    .then(stream => {

                        this.userStream = stream;

                        var dataSend = {
                          reciever_id : data.sender_id,
                          sender_id : this.crUser.id,
                        }

                        this.socket.emit("ready", dataSend);
                    })
                    .catch(error => {
                      console.error('Error accessing media devices:', error);
                    });*/
              });

              this.socket.on('ready', data => {
                  if(this.creater){


                    rtcPeerConnection.createOffer(
                      function(offer){
                        rtcPeerConnection.setLocalDescription(offer)
                            var dataSend = {
                              reciever_id : _that.chatUser.id,
                              sender_id : _that.crUser.id,
                              offer : offer,
                            }
                            _that.socket.emit("offer", dataSend);
                      },
                      function(error){
                              console.log(error)
                      },
                    )
                  }
              });



              this.socket.on("candidate",function(candidate){
                var iceCandidate = new RTCIceCandidate(candidate);
                rtcPeerConnection.addIceCandidate(iceCandidate)
              })

              this.socket.on("offer",function(offer){

                if(!this.creater){

                  rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(offer))
                  rtcPeerConnection.createAnswer(
                    function(answer){
                            rtcPeerConnection.setLocalDescription(answer)
                            var dataSend = {
                              reciever_id : _that.chatUser.id,
                              sender_id : _that.crUser.id,
                              answer : answer,
                            }
                            _that.socket.emit("answer", dataSend);
                    },
                    function(error){
                            console.log(error)
                    },
                  )
                }

              })

              this.socket.on("answer",function(answer){

                rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(answer))
              })


            }

            

            

      },
      methods: {

          onSelectEmoji(text) {
            this.message_text = text;
          },
          getClassChat(chatdd, crid) {
            let cl =  "chat__bubble--you"
            if(parseInt(chatdd.sender_id) == parseInt(crid)){
              cl =  "chat__bubble--me"
             // / debugger;
            }
            return cl;
          },
          async submitMessage() {

              if (this.message_text) {

                  let dataSend = {
                    userid : this.chatUser.id,
                    message : this.message_text,
                    conversationId : this.conversationId,
                  }

                  let __that = this;

                  await store.dispatch('chat/sendMessage', dataSend).then(async response => {


                      if(response.data && response.data.data && response.data.data.updatedAt){

                              this.socket.emit('chat_message', response.data.data);

                              __that.message_text = '';
                              var emojiPickerEl = __that.$refs.emojiPicker;

                              const inputField = __that.$refs.emojiPicker.$el.querySelector('.v3-emoji-picker-input');
                              inputField.value = "";
                              inputField.dispatchEvent(new Event('input'));

                          
                      }
                }).catch(error => {

                   console.log(error)

                     
                     
                });

                 /* socket.emit('chat_message', dataSend);

                  this.message_text = '';
                  var emojiPickerEl = this.$refs.emojiPicker;

                    const inputField = this.$refs.emojiPicker.$el.querySelector('.v3-emoji-picker-input');
                    inputField.value = "";
                    // Trigger input event manually
                    inputField.dispatchEvent(new Event('input'));
                    this.$nextTick(this.scrollToEnd);*/

              }
          },
          formatTimestamp(timestamp) {
            const messageDate = new Date(timestamp);
            const currentDate = new Date();

            
            // Check if the message was sent today
            if (messageDate.toDateString() === currentDate.toDateString()) {
              // Message was sent today, display time only
              return "Today, "+messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }else if(messageDate.getFullYear() != currentDate.getFullYear()){
              return messageDate.toLocaleDateString([], { year: "numeric",  month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
            } else {
              // Message was sent on a previous day, display date
              return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
            }
          },
          timeModify(time){
            return time.replace(/\s+/g, '');  
          },
          startTyping() {
            let dataSend = {
              reciever_id : this.chatUser.id,
              user_typing: true
            }
            clearTimeout(typingTimer);
            this.socket.emit('user_typing', dataSend);
            typingTimer = setTimeout(this.stopTyping, 1000); // Emit "stop typing" event after 1 second of inactivity
          },
          stopTyping() {
            let dataSend = {
              reciever_id : this.chatUser.id,
              user_typing: false
            }
            clearTimeout(typingTimer);
            this.socket.emit('user_typing', dataSend);
          },
          shouldDisplayTimestamp(index, currentTimestamp) {
            if (index === 0) {
              return true;
            }
            const prevMessage = this.chatData[index - 1];
            return currentTimestamp !== this.formatTimestamp(prevMessage.updatedAt);
          },
          screenShare(){
              this.creater = true;

              navigator.mediaDevices.getDisplayMedia({ audio: true, video: true})
                .then(stream => {

                    this.userStream = stream;

                    rtcPeerConnection = new RTCPeerConnection(iceServers) 

                    let ____that = this;

                    rtcPeerConnection.onicecandidate = function (event) { 
                      console.log('onicecandidate inside getusermedia success', event.candidate)
                      if(event.candidate){
                        var dataSend = {
                          reciever_id : ____that.chatUser.id,
                          sender_id : ____that.crUser.id,
                          candidate : event.candidate,
                        }

                        ____that.socket.emit("candidate", dataSend);
                      }
                    }; 

                    var dataSend = {
                      reciever_id : this.chatUser.id,
                      sender_id : this.crUser.id,
                    }

                    this.$refs.localVideo.srcObject = stream;
                    this.$refs.localVideo.onloadedmetadata = function(e){
                      this.play();
                    }

                    this.socket.emit("request", dataSend);

                    //rtcPeerConnection.ontrack = this.gotRemoteStream;
                    rtcPeerConnection.addStream(this.userStream)

                    rtcPeerConnection.onaddstream = this.onstreamFunc;
                    


                    
                })
                .catch(error => {
                  console.error('Error accessing media devices:', error);
                });
          },
          screenShare2(){

                    this.creater = false
                   


                    

              navigator.mediaDevices.getDisplayMedia({ audio: true, video: true})
                .then(stream => {

                    this.userStream = stream;

                    var dataSend = {
                      reciever_id : this.reciever_id2,
                      sender_id : this.crUser.id,
                    }
                    rtcPeerConnection = new RTCPeerConnection(iceServers) 

                    let ____that = this;
                    rtcPeerConnection.onicecandidate = function (event) { 
                      console.log('onicecandidate inside getusermedia success', event.candidate)
                      
                      if(event.candidate){
                        var dataSend = {
                          reciever_id : ____that.chatUser.id,
                          sender_id : ____that.crUser.id,
                          candidate : event.candidate,
                        }

                        ____that.socket.emit("candidate", dataSend);
                      }
                    }; 


                    this.$refs.localVideo.srcObject = stream;
                    this.$refs.localVideo.onloadedmetadata = function(e){
                      this.play();
                    }
                    this.socket.emit("ready", dataSend);


                    //rtcPeerConnection.ontrack = this.gotRemoteStream;
                    rtcPeerConnection.addStream(this.userStream)

                    rtcPeerConnection.onaddstream = this.onstreamFunc;

                })
                .catch(error => {
                  console.error('Error accessing media devices:', error);
                });
          },
          onstreamFunc(event){


              this.$refs.remoteVideo.srcObject = event.stream

              this.$refs.remoteVideo.onloadedmetadata = function(e){
                this.play();
              }

          },gotRemoteStream(event){
            alert()

              this.$refs.remoteVideo.srcObject = event.streams[0];

              this.$refs.remoteVideo.onloadedmetadata = function(e){
                this.play();
              }

          }
          

      }
  }
</script>