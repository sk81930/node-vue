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
               <!--  <li>
                  <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 48 48">
                    <path d="M38.4,48c-2.1,0-5.1-.8-9.5-3.2a62.9,62.9,0,0,1-14.6-11A61.7,61.7,0,0,1,3.2,19C-.9,11.8-.3,8.5.7,6.4A9.7,9.7,0,0,1,4.8,2,21.1,21.1,0,0,1,7.8.4h.3c1.8-.7,3-.3,4.9,1.5h.1a40.1,40.1,0,0,1,5.4,8.2c1.3,2.6,1.6,4.3-.2,6.9l-.5.6c-.8,1-.8,1.2-.8,1.6s1.9,3.4,5.2,6.7S28,30.8,28.8,31s.6,0,1.6-.8l.7-.4c2.5-1.9,4.2-1.6,6.8-.3A40.6,40.6,0,0,1,46.1,35h.1c1.8,1.9,2.2,3.1,1.5,4.9v.2h0a21.1,21.1,0,0,1-1.6,3,10,10,0,0,1-4.3,4.1A7.7,7.7,0,0,1,38.4,48ZM9.5,4.1H9.2L6.9,5.4H6.8A6.3,6.3,0,0,0,4.3,8.1c-.3.7-1.2,2.6,2.4,9A58.9,58.9,0,0,0,17.1,30.9,58.2,58.2,0,0,0,30.9,41.3c6.4,3.6,8.4,2.7,9.1,2.4a6.7,6.7,0,0,0,2.5-2.5.1.1,0,0,0,.1-.1c.5-.8.9-1.6,1.3-2.4v-.2l-.5-.6a35.4,35.4,0,0,0-7.3-4.8c-1.7-.8-1.8-.8-2.7-.1l-.6.4A5.3,5.3,0,0,1,28,34.9c-2.9-.6-7.4-4.9-8.7-6.2s-5.6-5.8-6.2-8.7.6-3.6,1.5-4.8l.4-.6c.7-.9.8-1-.1-2.7a35.4,35.4,0,0,0-4.8-7.3Z" fill="#f68b3c" />
                  </svg>
                </li> -->
                <li title="Screen share">
                  <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 46.8 47.4" @click="screenShare">
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
              <div class="custom-form__send-img" for="files">
                  <svg for="files" class="svg-icon svg-icon--send-img" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 112.55 122.88" style="enable-background:new 0 0 112.55 122.88" xml:space="preserve"><g><path class="st0" d="M104.41,6.1c6.26,5.13,6.93,11.83,7.62,13.46l0.34,2.5c0.9,5.39-1.65,12.75-5.58,17.38L89.2,59.84 c-6.76,7.84-18.04,10.44-27.48,6.37l-0.03,0.04c3.45,5.63,3.15,9.64,3.46,10.57c0.9,5.41-1.65,12.74-5.58,17.38L41.97,114.6 c-8.53,9.89-23.58,11.1-33.53,2.61c-5.04-5.04-7.84-9.31-8.37-16.49c-0.47-6.24,1.53-12.37,5.59-17.18l17.92-20.79 c5.01-5.14,7.5-5.86,13.33-7.47l2.5-0.34l10.66,1.56c0.22,0.08,0.44,0.18,0.65,0.27l0.03-0.04c-5.35-8.71-4.57-20.11,2.14-27.97 L70.48,8.37c4.11-4.77,9.99-7.71,16.15-8.19c5.37-0.89,12.77,1.64,17.38,5.58L104.41,6.1L104.41,6.1z M74.23,51.71l-3.66,4.24 l0.64,0.01l0.02,0l0.6-0.02l0.01,0l0.14-0.01l0.02,0c2.11-0.16,4.19-0.88,5.96-2.14c0.34-0.24,0.68-0.51,1.02-0.82l0,0l0,0 c0.3-0.27,0.62-0.59,0.93-0.95l0,0l0.12-0.13l17.45-20.24c1.47-1.7,2.36-3.75,2.68-5.86c0.07-0.44,0.11-0.87,0.13-1.26 c0.02-0.41,0.01-0.85-0.01-1.28l0-0.05l-0.01-0.11c-0.16-2.11-0.88-4.19-2.14-5.96c-0.24-0.34-0.51-0.67-0.78-0.97l-0.03-0.04 c-0.29-0.32-0.61-0.64-0.94-0.94l0,0l-0.06-0.05l-0.05-0.05L96.16,15c-1.69-1.43-3.7-2.3-5.78-2.61l-0.03,0 c-0.43-0.06-0.85-0.11-1.24-0.12c-0.41-0.02-0.84-0.01-1.27,0.01l-0.07,0l-0.1,0.01c-2.11,0.16-4.19,0.88-5.96,2.14 c-0.34,0.24-0.68,0.51-0.98,0.78l-0.03,0.03c-0.33,0.29-0.64,0.61-0.94,0.95l0,0l-0.12,0.13L62.2,36.55 c-1.47,1.7-2.36,3.75-2.68,5.86h0c-0.06,0.43-0.11,0.86-0.12,1.26c-0.02,0.41-0.01,0.85,0.01,1.28l0.01,0.15l0,0.01v0.02 c0.03,0.46,0.09,0.91,0.18,1.37l3.58-4.15l0.1-0.12l0.13-0.14l0,0l0.02-0.02c1.29-1.39,3.02-2.18,4.79-2.3 c1.78-0.13,3.62,0.39,5.1,1.6l0,0l0.02,0.01l0.09,0.08l0.02,0.02l0.02,0.02l0.01,0.01l0.02,0.01l0.07,0.06l0,0l0,0 c2.06,1.83,2.82,4.6,2.21,7.13c-0.12,0.5-0.3,1-0.54,1.48c-0.22,0.46-0.51,0.9-0.83,1.31l-0.02,0.02l-0.03,0.04l0,0l-0.01,0.02 l-0.1,0.12l0,0L74.23,51.71L74.23,51.71z M40.06,80.23L40.06,80.23c2.33,2.01,5.88,1.75,7.89-0.58l5.58-6.47 c0.65,1.45,1.04,3,1.16,4.57c0.25,3.44-0.79,6.97-3.19,9.75l-17.46,20.24c-2.4,2.79-5.73,4.34-9.16,4.59 c-3.38,0.25-6.84-0.75-9.59-3.05l-0.16-0.14c-2.78-2.4-4.34-5.73-4.59-9.16c-0.25-3.4,0.76-6.89,3.1-9.65l0.09-0.1l17.25-20l0,0 l0,0l0.21-0.24c2.4-2.78,5.73-4.34,9.16-4.59c1.58-0.12,3.18,0.04,4.71,0.47l-5.58,6.47C37.47,74.67,37.73,78.22,40.06,80.23 L40.06,80.23z"/></g></svg>
                  <input 
                      id ="files"
                      ref="files" 
                      type="file"
                      multiple 
                      @change="handleFilesUpload"
                      style="display:none" 
                  />
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
          <div style="display:flex">
            <video v-if="(isLocal == true)" ref="localVideo" id="local-video" style="width:100%" autoplay></video>
            <video v-if="(isRemote == true)" ref="remoteVideo" id="remote-video" style="width:100%" autoplay></video>
            <div class="fullscreen"  v-if="(isRemote == true || isLocal == true)" @click="fullscreen">
             <svg height="14px" version="1.1" viewBox="0 0 14 14" width="14px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#000000" id="Core" transform="translate(-215.000000, -257.000000)"><g id="fullscreen" transform="translate(215.000000, 257.000000)"><path d="M2,9 L0,9 L0,14 L5,14 L5,12 L2,12 L2,9 L2,9 Z M0,5 L2,5 L2,2 L5,2 L5,0 L0,0 L0,5 L0,5 Z M12,12 L9,12 L9,14 L14,14 L14,9 L12,9 L12,12 L12,12 Z M9,0 L9,2 L12,2 L12,5 L14,5 L14,0 L9,0 L9,0 Z" id="Shape"/></g></g></g></svg>
            </div>
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
              isRemote: false,
              isLocal: false,
              streamUserOnline: false,
          }
      },
      async created() {

        

      },
      mounted() {

            this.handleNotification();

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


                  if(data.sender_id == this.chatUser.id){

                      this.showV = true;

                      var dataSend = {
                        reciever_id : data.sender_id,
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

                      
                      rtcPeerConnection.onaddstream = this.onstreamFunc;

                      this.socket.emit("ready", dataSend);

                  }else{

                      var dataSend = {
                        reciever_id : data.sender_id,
                        sender_id : this.crUser.id,
                      }
                      
                      this.socket.emit("userNotOnline", dataSend);
                  }  

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

              this.socket.on("endedStream",function(answer){

                  if(_that.$refs.remoteVideo && _that.$refs.remoteVideo.srcObject){
                    _that.$refs.remoteVideo.srcObject.getTracks()[0].stop();
                  }

                  if(rtcPeerConnection){
                    rtcPeerConnection.onaddstream = null;
                    rtcPeerConnection.onicecandidate = null;
                    rtcPeerConnection.close();
                  }
                  _that.isRemote = false;
              })

              this.socket.on("userNotOnline",function(){

                  // alert()

                  // if(this.streamUserOnline){
                  //   setTimeout(function(){

                  //     alert("User Not Live!");

                  //     if(_that.$refs.localVideo && _that.$refs.localVideo.srcObject){
                  //       _that.$refs.localVideo.srcObject.getTracks()[0].stop();
                  //     }

                  //     if(rtcPeerConnection){
                  //       rtcPeerConnection.onaddstream = null;
                  //       rtcPeerConnection.onicecandidate = null;
                  //       rtcPeerConnection.close();
                  //     }
                  //     _that.isLocal = false;
                  //   },500);
                  //   this.streamUserOnline = false
                    
                  // }
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

              navigator.mediaDevices.getDisplayMedia({ video: { cursor: "always" }, audio: false })
                .then(stream => {

                    this.streamUserOnline = true;

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

                    stream.getVideoTracks()[0].addEventListener('ended', () => {
                        
                        var dataSend = {
                          reciever_id : ____that.chatUser.id,
                          sender_id : ____that.crUser.id,
                        }
                        ____that.socket.emit("endedStream", dataSend);

                        if(____that.$refs.localVideo.srcObject){
                          ____that.$refs.localVideo.srcObject.getTracks()[0].stop();
                        }
                        if(rtcPeerConnection){
                          rtcPeerConnection.onaddstream = null;
                          rtcPeerConnection.onicecandidate = null;
                          rtcPeerConnection.close();
                        }

                        this.isLocal = false;
                    });

                    this.isLocal = true;

                    var dataSend = {
                      reciever_id : this.chatUser.id,
                      sender_id : this.crUser.id,
                    }

                    setTimeout(function(){

                      ____that.$refs.localVideo.srcObject = stream;
                      ____that.$refs.localVideo.onloadedmetadata = function(e){
                        this.play();
                      }

                    },100)

                    


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


                    // this.$refs.localVideo.srcObject = stream;
                    // this.$refs.localVideo.onloadedmetadata = function(e){
                    //   this.play();
                    // }
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

              this.isRemote = true;

              let __that = this;

              setTimeout(function(){

                  __that.$refs.remoteVideo.srcObject = event.stream

                  __that.$refs.remoteVideo.onloadedmetadata = function(e){
                        this.muted = true;
                        this.play();
                  }

              },100)

              

          },
          fullscreen(event){

              var elem;

              if(this.$refs.remoteVideo){
                 elem = this.$refs.remoteVideo;
              }else if(this.$refs.localVideo){
                 elem = this.$refs.localVideo;
              }

              if (elem.requestFullscreen) {
                elem.requestFullscreen();
              } else if (elem.webkitRequestFullscreen) { /* Safari */
                elem.webkitRequestFullscreen();
              } else if (elem.msRequestFullscreen) { /* IE11 */
                elem.msRequestFullscreen();
              }

          },
          handleNotification(notification = false) {
            // Display desktop notification
            if (Notification.permission === 'granted') {
              if(notification){
                new Notification(notification);
              }
            } else if (Notification.permission !== 'denied') {
              Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                  if(notification){
                    new Notification(notification);
                  }  
                }
              });
            }
          }
          

      }
  }
</script>