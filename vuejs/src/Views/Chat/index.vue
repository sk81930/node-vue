<template>
    <div class="chat-box">

            <div class="home-page__content messages-page">
              <div class="container-fluid h-100">
                <div class="row px-0 h-100">
                  <!-- start message list section  -->
                  <div class="col-12 col-md-4 col-lg-5 col-xl-3 px-0 messages-page__list-scroll">

                    <div class="messages-page__header mb-0 px-4 pt-3 pb-3">
                      <span class="messages-page__title">Chats</span>
                      <span class="messages-page__title chatUser">
                        <b-dropdown id="dropdown-user"  text="+" class="m-md-2 dropdown-user" ref="dropdown" autoClose="outside">
                          <b-dropdown-form>
                            <div class="search-in">
                               <input type="text" class="form-control " placeholder="Search" v-model="searchTerm" @input="filteredChatUsers">
                            </div>
                            <ul class="userListtdata">
                              <li v-for="userr in chatFilterUser">
                                <div class="main-d" @click="AddChatUser(userr)" :class="{'messaging-member--online': (onlineUsers && (onlineUsers.includes(userr.id)))}">
                                   <div class="list_image">
                                     <img src="../../Assets/images/user-1.jpg">
                                     <div class="user-status user-status--large"></div>
                                   </div>
                                   
                                   <span>{{userr.name}}</span>
                                </div>
                              </li>
                            </ul>
                          </b-dropdown-form>  
                        </b-dropdown>
                      </span>
                    </div>
                    <div class="messages-page__search mb-0 px-3 pb-3">
                      <div class="custom-form__search-wrapper">
                        <input @input="filteredConversationUsers" v-model="searchQuery" type="text" class="form-control custom-form ddd" id="search" placeholder="Rechercher un message, un utilisateur…" autocomplete="off">
                        <button type="submit" class="custom-form__search-submit">
                          <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon svg-icon--search" viewBox="0 0 46.6 46.6">
                            <path d="M46.1,43.2l-9-8.9a20.9,20.9,0,1,0-2.8,2.8l8.9,9a1.9,1.9,0,0,0,1.4.5,2,2,0,0,0,1.5-.5A2.3,2.3,0,0,0,46.1,43.2ZM4,21a17,17,0,1,1,33.9,0A17.1,17.1,0,0,1,33,32.9h-.1A17,17,0,0,1,4,21Z" fill="#f68b3c" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <ul class="messages-page__list pb-5 px-1 px-md-3">
                      <!--  messaging-member--active -->
                      <li class="messaging-member"  :class="{'messaging-member--online': (onlineUsers && (onlineUsers.includes(conversation.sender_id) || onlineUsers.includes(conversation.reciever_id))),'messaging-member--new': (conversation && conversation.message && conversation.message.id &&  !conversation.message.read) }" :sender_id="conversation.sender_id" :reciever_id="conversation.reciever_id" v-bind:class="{'messaging-member--active':(conversation.conversation_id === parseInt(conversationId))}"  v-for="(conversation, index_con) in filterConversations" :key="index_con"> 
                        <router-link :to="'/'+crUser.role+/chat/+conversation.conversation_id" class="linkkk"> 
                          <div class="messaging-member__wrapper">
                            <div class="messaging-member__avatar">
                              <img src="../../Assets/images/user-1.jpg" alt="Bessie Cooper" loading="lazy">
                              <div class="user-status"></div>
                            </div>

                            <div class="iduser">
                              <span class="messaging-member__name" v-if="conversation.reciever_id != crUser.id">{{conversation.reciever_id_user.name}}</span>
                              <span class="messaging-member__name" v-else>{{conversation.sender_id_user.name}}</span>
                            </div>

                            <span class="messaging-member__message" v-if="conversation.message">{{conversation.message.body}}</span>
                          </div>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                  <!-- end message list section  -->
                  <!-- start content section  -->
                  <div class="chat col-12 col-md-8 col-lg-7 col-xl-8 px-0 pl-md-1" v-if="(loadChat == 'true')">
                        <chatContainer  :crUser="crUser" :chatData="chatData" conversationId="conversationId" getConversations="getConversations" socket="socket" />
                  </div>
                  <div class="empty-chat col-12 col-md-8 col-lg-7 col-xl-8 px-0 pl-md-1" v-else>
                    <div class="empty-chat-inner"> Say Hi, To user!</div>
                  </div>
                  <!-- end content section  -->
                  <!-- start infos section  -->
                 <!--  <div class="col-12 col-md-5 col-lg-4 col-xl-3 px-4 px-sm-5 px-lg-4 user-profile" v-if="(loadChat == 'true')">
                    <div class="user-profile__close d-flex d-xl-none">
                      <svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" viewBox="0 0 38.8 38.9">
                        <g>
                          <path d="M2,38.9a1.9,1.9,0,0,1-1.4-.5,2.1,2.1,0,0,1,0-2.9L35.4.6a1.9,1.9,0,0,1,2.8,0,1.9,1.9,0,0,1,0,2.8L3.4,38.4A1.9,1.9,0,0,1,2,38.9Z" fill="#d87232" />
                          <path d="M36.8,38.9a1.9,1.9,0,0,1-1.4-.5L.6,3.4A1.9,1.9,0,0,1,.6.6,1.9,1.9,0,0,1,3.4.6L38.2,35.5a2.1,2.1,0,0,1,0,2.9A1.9,1.9,0,0,1,36.8,38.9Z" fill="#d87232" />
                        </g>
                      </svg>
                    </div>
                    <div class="user-profile__wrapper">
                      <div class="user-profile__avatar">
                        <img src="https://randomuser.me/api/portraits/thumb/men/74.jpg" alt="Jenny Smith" loading="lazy">
                      </div>
                      <div class="user-profile__details mt-1">
                        <span class="user-profile__name">Jenny Smith</span>
                        <span class="user-profile__phone">(025) 015-234-567</span>
                        <span class="user-profile__location">New York, United States</span>
                      </div>
                      <div class="user-profile__description">
                        <p>Fly me to the moon 🌙 If you feel like your life is a routine, step back and take a deep breath.</p>
                      </div>
                      <div class="user-profile__learning mt-4">
                        <span class="user-profile__label">Social Medias</span>
                        <ul class="user-profile__tags user-profile__tags--primary mt-2">
                          <li><a href="https://www.instagram.com/tiantsoa_sh/" target="_blank">Instagram</a></li>
                          <li><a href="https://www.linkedin.com/in/tiantsoa-rabemananjara-254655152/" target="_blank">Linkedin</a></li>
                          <li><a href="https://codepen.io/tiantsoa" target="_blank">Codepen</a></li>
                        </ul>
                      </div>
                      <div class="user-profile__hobbies">
                        <span class="user-profile__label">Activities</span>
                        <ul class="user-profile__tags user-profile__tags--secondary mt-2">
                          <li>Biking</li>
                          <li>Cooking</li>
                          <li>Traveling</li>
                          <li>Grahic design</li>
                        </ul>
                      </div>
                    </div>
                  </div> -->
                  <!-- end infos section  -->
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

  
  import chatContainer from "./chatContainer.vue";

  import { io } from "socket.io-client";


  let socket = null;
  export default {
      name: 'Chat',
      components: {
          EmojiPicker,
          chatContainer
      },
      data() {
          return {
              searchQuery: null,
              socket: null,
              conversationId: null,
              messages: [],
              message: '',
              message_text: "",
              chatUsers: [],
              chatFilterUser: [],
              conversations: [],
              filterConversations: [],
              searchTerm: '',
              crUser: null,
              chatData: null,
              loadChat: null,
              onlineUsers: null,
          }
      },
      async created() {
         let user = await store.getters["auth/user"];
         this.crUser = user;

          await this.getUserRoleFunc();
          await this.getConversations();

      },
      async mounted() {

          let _that = this;

          watchEffect(() => {
            var conId = this.$route.params.id;
            if(conId != undefined){
              
              this.conversationId = conId;
              this.getChatByConIdFunc(conId);

            }else{
              this.loadChat = null;
            }
          }, this.$route.params.id);

          var sockett = await store.dispatch('auth/initializeSocket');

          if(sockett){

            this.socket = sockett;

            this.socket.on('online_users', users => {

                if(users && users.length > 0){
                     let userss = [];
                     users.forEach(function(uu){
                        if(uu.userId != _that.crUser.id){
                             userss.push(uu.userId);
                        }
                        
                     })
                     this.onlineUsers = userss;
                }else{
                    this.onlineUsers = null;
                }


            });
            this.socket.on('chat_message', data => {
                this.getConversations();
            });

          }else{
              this.socket = null;
          }
 
         
      },
      methods: {
          async getUserRoleFunc() {
                await store.dispatch('auth/getUserRole').then(async response => {

                      if(response.data && response.data.data && response.data.data.userrole && response.data.data.userrole.length > 0){

                        var dataUser = [];

                        let itemsss = [];
                        let __that = this;

                        await response.data.data.userrole.filter(async item => {

                              if (item.id == __that.crUser.id) {

                                return false; // Skip this item

                              }else{
                                itemsss.push(item);
                              }
                        });
                        //console.log(itemsss)
                        this.chatUsers = itemsss;
                        this.chatFilterUser = this.chatUsers;

                      }
                        


                })
                .catch(error => {

                    var res_error = error.response;

                      if(error.response.data.message && Array.isArray(error.response.data.message)){
                        this.errors = error.response.data.message;
                      }else{
                        this.errors = [error.response.data.message];
                      }

                     
                     
                });
          },
          scrollToEnd() {
            // Scroll to the end of the message container
            const container = this.$refs.messageContainer;
            container.scrollTop = container.scrollHeight;
          },
          filteredChatUsers() {

              // Convert the search term to lowercase for case-insensitive matching
              const searchTermLowerCase = this.searchTerm.toLowerCase();
              
              // Filter items based on the search term
              let itemss =  this.chatUsers.filter(item => {
                                // Convert the item name to lowercase for case-insensitive matching
                                const itemNameLowerCase = item.name.toLowerCase();
                                
                                // Check if the item name contains the search term
                                return itemNameLowerCase.includes(searchTermLowerCase);
                              });
              this.chatFilterUser = itemss;
          },
          async getChatByConIdFunc(conid) {

            

                await store.dispatch('chat/getChatByConId',{conid:conid}).then(async response => {


                      if(response.data && response.data.data && response.data.data.chatData && response.data.data.chatData.dataMessages){

                        
                        this.chatData = response.data.data.chatData;
                        this.loadChat = "true";
                        if(this.socket){
                          this.socket.emit('online_users', {});
                        }


                         // { value: 'user', text: 'User' , selected : true},
                         // { value: 'manager', text: 'Manager' },
                      }

                      this.getConversations();
                      


                })
                .catch(error => {

                      var res_error = error.response;

                      if(error.response.data.message && Array.isArray(error.response.data.message)){
                        this.errors = error.response.data.message;
                      }else{
                        this.errors = [error.response.data.message];
                      }
                     
                });

               



            
          },
          async AddChatUser (user) {

              this.$refs.dropdown.close(true);

                await store.dispatch('chat/addChatUser',{id:user.id}).then(async response => {

                      if(response.data && response.data.data && response.data.data.con_id && response.data.data.con_id != ""){
                         await this.getConversations();
                         await this.getChatByConIdFunc(response.data.data.con_id);
                         this.$router.push("/"+this.crUser.role+"/chat/"+response.data.data.con_id) 
                      }

                      

                      /*console.log(response)

                      if(response.data && response.data.data && response.data.data.userrole && response.data.data.userrole.length > 0){

                        var dataUser = [];

                        // response.data.data.userrole.forEach(function(user,index){

                        //     dataUser.push({value: user.id, label: user.name+" (Role: "+user.role+")"});
                        // })

                       // debugger;
                        let itemsss = [];
                        let __that = this;

                        await response.data.data.userrole.filter(async item => {

                              if (item.id == __that.crUser.id) {

                                return false; // Skip this item
                              }else{
                                itemsss.push(item);
                              }
                        });
                        console.log(itemsss)
                        this.chatUsers = itemsss;
                        this.chatFilterUser = this.chatUsers;


                         // { value: 'user', text: 'User' , selected : true},
                         // { value: 'manager', text: 'Manager' },
                      }*/
                        


                })
                .catch(error => {

                      var res_error = error.response;

                      if(error.response.data.message && Array.isArray(error.response.data.message)){
                        this.errors = error.response.data.message;
                      }else{
                        this.errors = [error.response.data.message];
                      }
                     
                });


            
          },
          async getConversations () {


                await store.dispatch('chat/getConversations').then(async response => {

                    //  console.log(response)

                      if(response.data && response.data.data && response.data.data.conversations && response.data.data.conversations.length > 0){

                        this.conversations = response.data.data.conversations;
                        this.filterConversations = this.conversations;


                         // { value: 'user', text: 'User' , selected : true},
                         // { value: 'manager', text: 'Manager' },
                      }
                        


                })
                .catch(error => {

                      var res_error = error.response;

                      if(error.response.data.message && Array.isArray(error.response.data.message)){
                        this.errors = error.response.data.message;
                      }else{
                        this.errors = [error.response.data.message];
                      }
                     
                });


            
          },
          filteredConversationUsers() {


              let itemss =  this.conversations.filter(item => {
                //debugger;
                          // Convert the item name to lowercase for case-insensitive matching
                          const itemNameLowerCase = item.sender_id_user.name.toLowerCase();
                          const sender_id_user = itemNameLowerCase.includes(this.searchQuery);

                          if(sender_id_user){
                            return sender_id_user;
                          }

                          const recieveritemNameLowerCase = item.reciever_id_user.name.toLowerCase();
                          const reciever_id_user = recieveritemNameLowerCase.includes(this.searchQuery);
                          if(reciever_id_user){
                            return reciever_id_user;
                          }
                        });
              this.filterConversations = itemss;
          },
      }
  }
</script>