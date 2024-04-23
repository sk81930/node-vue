<template>
  <div class="row" v-if="task" ref="content" id="content">
      <div class="col-md-8">
          <BCard
            style="max-width: 98%;"
            class="mx-20"
            
          >
              <template #header>

                <div class="d-flex justify-content-between">
                  <h2 class="mb-0">{{task.title}}</h2>
                  <router-link to="/manager/tasks"> <b-button type="button" variant="secondary">Back</b-button></router-link>
                </div>
                
              </template>

              <div class="body-card">
                 <p v-html="task.description"></p>
              </div>

          </BCard>   

          <BCard
              style="max-width: 98%;"
              class="mx-20 mt-5"
            >
            <template #header>

              <div class="d-flex justify-content-between">
                <h2 class="mb-0">Add Comment</h2>
              </div>
              
            </template>
            <BAlert :model-value="true" variant="danger" v-if="errors">
                <ul v-for="(errorD) in errors">
                  <li v-for="(error) in errorD">
                    <span>{{error}}</span>
                  </li>  
                </ul>
            </BAlert>

            <BAlert :model-value="true" variant="success" v-if="successprofile">
                 <span>{{successprofile}}</span>
            </BAlert>

                <b-form @submit="onSubmit" v-if="show">

                  <b-form-group id="input-group-1" label="" label-for="input-1" class="mb-0">
                    <textarea id="comment" v-model="form.comment"></textarea>
                  </b-form-group>

                  <fileUploader @filesdata="filedata" :emptyfiles="this.emptyfiles" />

                 
                  <div class="d-flex justify-content-between mt-3">
                    <b-button type="submit" variant="primary">Submit</b-button>
                  </div>
                </b-form>
          </BCard>  
          <Comments @resetcommentparent="resetcommentparentfunc" :resetcomment="this.resetcomment" />
      </div>
      <div class="col-md-4">
        <BCard
            style="max-width: 90%;"
            class="mx-20"
            
          >
          <div class="body-card">
            <div class="inner-dd" v-if="task.assign_to_user">
              <b class="mb-0">Assign to: </b><p>{{task.assign_to_user.name}}</p>
            </div>
            <div class="inner-dd" v-if="task.created_by_user">
              <b class="mb-0">Created By: </b><p>{{task.created_by_user.name}}</p>
            </div>
            <div class="inner-dd" v-if="task.project_data">
              <b class="mb-0">Project : </b><p>{{task.project_data.title}}</p>
            </div>

            <div class="inner-dd" v-if="task.observer_users">
                <b class="mb-0">Observer user: </b>
                <div v-for="(observer_user, indexu) in task.observer_users">
                  <p>{{observer_user.name}}</p>
                </div>
            </div>
             
          </div>
        </BCard>   
      </div>
      <hightlight @selectedData="selectedData" />
  </div>
</template>

<script>

  import { ref } from 'vue'

  import axios from 'axios';
  import { mapMutations } from "vuex";
  import store from '../../Store';



  import Editor from '@tinymce/tinymce-vue'

  import { getTinymce } from '@tinymce/tinymce-vue/lib/cjs/main/ts/TinyMCE';

  import Multiselect from '@vueform/multiselect'
  import "@vueform/multiselect/themes/default.css";

  import fileUploader from "./components/Index.vue";

  import Hightlight from './components/hightlight.vue';

  import Comments from './comments.vue';

  import ClassicEditor from './ckeditor.js';

  let editorRef = ref(null);




  export default {
      name: 'ViewTask',
      components: {
       'editor': Editor,
       'ClassicEditor': ClassicEditor,
       'multiselect': Multiselect,
       'fileUploader': fileUploader,
       'Hightlight': Hightlight,
       'Comments': Comments,
      },
      data() {
          return {
              resetcomment:null,
              emptyfiles:null,
              apikey: "glo0bi24atqwyfnt8cwl9fubznvu9f6z8fsw29roxhix64r3",
              appload:false,
              files:[],
              form:{
                taskid: null,
                comment: "",
                files: [],
              },
              errors:null,
              successprofile:null,
              task: null,
              show: true,
              projectOptions: [],
              assignToOptions: [],
              observerOptions: [],
              mentionItems: [],
              priorityOptions: [{"label": "High",value : "high"},{"label": "Medium",value : "medium"},{"label": "Low",value : "low"}],
          }
      },
      async created() {
        if ('id' in this.$route.params) {
            var id = this.$route.params.id;
            this.form.taskid = id;

            await this.mentionsFetch();

            this.getTaskByIdFunc(id);

        }

        // let user = store.getters["auth/user"];
        // this.form.name = user.name;
        // this.form.email = user.email;
         
      },
      mounted() {
        this.appload = true;

       

        // let user = store.getters["auth/user"];
        // this.form.name = user.name;
        // this.form.email = user.email;
         
      },
      methods: {
          selectedData(data) {
             this.insertTextAtCursor(data);
             //getTinymce().activeEditor.execCommand('mceInsertContent', false, " <b>"+data+"</b> ");
          },
          resetcommentparentfunc() {
             this.resetcomment = null;
          },
          filedata(files) {
            this.form.files = files;
            this.emptyfiles = null;
          },
          async handleKeyDown(e) {
            if (e.key === '@') {
              // Prevent default '@' insertion behavior
              e.preventDefault();
              // Insert a .mention element at the current cursor position
              //editorRef.value.insertContent('<span class="mention">@</span>');
            }
          },
          async onSubmit(event) {
              event.preventDefault()
              const formData = new FormData();


              if(this.form.files.length > 0){
                 this.form.files.forEach(function(file,index){
                      formData.append('files['+index+']', file);
                 })
              }
              formData.append('comment', this.form.comment);
              formData.append('taskid', this.form.taskid);

              this.errors = null;
              this.successprofile = null;
              

              await store.dispatch('task/AddComment', formData).then(async response => {




                      

                      if(response.data.message){
                          editorRef.setData("");
                          this.successprofile = response.data.message;
                          this.form.files = [];
                          this.form.comment = "";
                          this.emptyfiles = 1;
                          this.resetcomment = 1;
                          this.getTaskByIdFunc(this.form.taskid);
                      }


              })
              .catch(error => {
                   let errorsData = Object.values(error.response.data.errors);
                   this.errors = errorsData;
              });

          },
          async insertTextAtCursor(text) {
              const selection = editorRef.model.document.selection;
              const range = selection.getFirstRange();

              if (range) {
                  // Insert text at the cursor position
                  editorRef.model.change(writer => {
                      writer.insertText(text,  { bold: true, html: true }, range.start);
                  });
              }
          },
          async getTaskByIdFunc(id) {
              await store.dispatch('task/getTaskById', {id:id}).then(async response => {

                    let resultt = response.data.data;



                    if(resultt.task && resultt.task.id){

                        this.task = resultt.task;


                    }

                    this.initEditor();

                   
                      


              })
              .catch(error => {
                   
                   let errorsData = Object.values(error.response.data.errors);
                   this.errors = errorsData;
              });
          },
          async initEditor() {

               let __that = this;

              setTimeout(function(){

                  console.log(editorRef)
                  if(typeof editorRef.model === "undefined"){
                      ClassicEditor.create( document.querySelector( '#comment' ) ,{
                        mention: {
                            feeds: [
                                {
                                    marker: '@',
                                    feed: __that.getFeedItems,
                                    itemRenderer: item => {

                                        const itemElement = document.createElement( 'button' );

                                        itemElement.classList.add( 'custom-mention' );
                                        itemElement.id = `mention-user-id-${ item.userId }`;
                                        itemElement.textContent = `${ item.name } `;
                                        return itemElement;
                                    }
                                }
                            ]
                        }
                      }).then( editor => {

                          editor.model.document.on( 'change:data', () => {
                              let editorData = editor.getData();
                              __that.form.comment = editorData;
                          } );

                          editorRef = editor;
                          
                      } )
                      .catch( error => {
                          console.error( error );
                      } );
                  }
              },100)

          },
          async mentionsFetch() {
              await store.dispatch('auth/getUserRole').then(async response => {

                   if(response.data && response.data.data.userrole && response.data.data.userrole.length > 0){

                      var dataUser = [];

                      response.data.data.userrole.forEach(function(user,index){

                        var id = user.id;
                          const newDiv = document.createElement("div");

                          // and give it some content
                          const newContent = document.createTextNode("Hi there and greetings!");

                          // add the text node to the newly created div
                          newDiv.appendChild(newContent);

                          dataUser.push({ "userId": user.id, "name": "@"+user.name,  id: "@"+user.id, "text": "@"+user.name});

                      })
                      this.mentionItems = dataUser;
                   }


              }).catch(error => {});
             
          },
          async getFeedItems( queryText ) {
              // As an example of an asynchronous action, return a promise
              // that resolves after a 100ms timeout.
              // This can be a server request or any sort of delayed action.
              return new Promise( resolve => {
                  setTimeout( () => {
                      const itemsToDisplay = this.mentionItems
                          // Filter out the full list of all items to only those matching the query text.
                          .filter( isItemMatching )
                          // Return 10 items max - needed for generic queries when the list may contain hundreds of elements.
                          .slice( 0, 10 );

                      resolve( itemsToDisplay );
                  }, 100 );
              } );

              // Filtering function - it uses `name` and `username` properties of an item to find a match.
              function isItemMatching( item ) {
                  // Make the search case-insensitive.
                  const searchString = queryText.toLowerCase();

                  // Include an item in the search results if name or username includes the current user input.
                  return (
                      item.name.toLowerCase().includes( searchString ) ||
                      item.id.toLowerCase().includes( searchString )
                  );
              }
          },
          async customItemRenderer( item ) {

              const itemElement = document.createElement( 'span' );

              itemElement.classList.add( 'custom-item' );
              itemElement.id = `mention-list-item-id-${ item.id }`;
              itemElement.textContent = `${ item.name } `;

              const usernameElement = document.createElement( 'span' );

              usernameElement.classList.add( 'custom-item-username' );
              usernameElement.textContent = item.id;

              itemElement.appendChild( usernameElement );

              debugger;


              return itemElement;
          }
      }
  }
</script>