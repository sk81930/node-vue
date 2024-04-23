<template>
  <div>
    <BCard
      style="max-width: 90%;"
      class="mx-20"
    >
    <template #header>

      <div class="d-flex justify-content-between">
        <h2 class="mb-0">{{(this.form.id)?'Edit Task(ID:'+this.form.id+')':'Add Task'}}</h2>
        <router-link to="/manager/tasks"> <b-button type="button" variant="secondary">Back</b-button></router-link>
      </div>
      
    </template>
    <BAlert :model-value="true" variant="danger" v-if="errors">
        <ul>
          <li v-for="(error) in errors">
            <span>{{error}}</span>
          </li>  
        </ul>
    </BAlert>

    <BAlert :model-value="true" variant="success" v-if="successprofile">
         <span>{{successprofile}}</span>
    </BAlert>

        <b-form @submit="onSubmit" @reset="onReset" v-if="show">

          <b-form-group id="input-group-1" label="Title:" label-for="input-1" class="mb-4">
            <b-form-input
              id="input-1"
              v-model="form.title"
              placeholder="Enter task title"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-1" label="Description:" label-for="input-1" class="mb-4">
            <editor
               :api-key="apikey"
               v-model="form.description"
               :init="{
                 height: 200,
                 menubar: false,
                 plugins: [
                   'advlist autolink lists link image charmap print preview anchor',
                   'searchreplace visualblocks code fullscreen',
                   'insertdatetime media table paste code help wordcount'
                 ],
                 toolbar:
                   'undo redo | formatselect | bold italic backcolor | \
                   alignleft aligncenter alignright alignjustify | \
                   bullist numlist outdent indent | removeformat | code | help'
               }"
             />
          </b-form-group>

          <b-form-group id="project" label="Project:" label-for="select-project" class="mb-4">
             <multiselect id="select-project" v-model="form.project" :options="projectOptions" :searchable="true" :close-on-select="false"></multiselect>
          </b-form-group>

          <b-form-group id="assign_to" label="Assigned to:" label-for="select-assign_to" class="mb-4">
             <multiselect v-model="form.assign_to" :options="assignToOptions" :searchable="true" :close-on-select="false" required></multiselect>
          </b-form-group>

          <b-form-group id="observer" label="Observer:" label-for="select-observer" class="mb-4">
             <multiselect v-model="form.observer" :options="observerOptions" :searchable="true" :close-on-select="false" mode="tags" :object="true"></multiselect>
          </b-form-group>

          <b-form-group id="priority" label="Priority:" label-for="select-priority" class="mb-4">
             <multiselect v-model="form.priority" :options="priorityOptions" :searchable="true" :close-on-select="false"></multiselect>
          </b-form-group>


         
          <div class="d-flex justify-content-between">
            <b-button type="submit" variant="primary">Submit</b-button>
          </div>
        </b-form>
    </BCard>    
  </div>
</template>

<script>

  import axios from 'axios';
  import { mapMutations } from "vuex";
  import store from '../../Store';

  import Editor from '@tinymce/tinymce-vue'

  import Multiselect from '@vueform/multiselect'
  import "@vueform/multiselect/themes/default.css";



  export default {
      name: 'AddEditTask',
      components: {
       'editor': Editor,
       'multiselect': Multiselect
      },
      data() {
          return {
              apikey: "glo0bi24atqwyfnt8cwl9fubznvu9f6z8fsw29roxhix64r3",
              appload:false,
              errors:null,
              successprofile:null,
              form: {
                id:null,
                title: '',
                description: '',
                project: '',
                assign_to: '',
                observer: [],
                priority: '',
              },
              show: true,
              projectOptions: [],
              assignToOptions: [],
              observerOptions: [],
              priorityOptions: [{"label": "High",value : "high"},{"label": "Medium",value : "medium"},{"label": "Low",value : "low"}],
          }
      },
      async created() {
        await this.getUserRoleFunc();
        await this.getAllProjectFunc();
        if ('id' in this.$route.params) {
            var id = this.$route.params.id;

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
          async onSubmit(event) {
            event.preventDefault()
            var formData = JSON.stringify(this.form);
            this.errors = null;
            this.successprofile = null;


            await store.dispatch('task/AddEditTask', formData).then(async response => {


                    this.successprofile = response.data.message;

                    if(!this.form.id){
                      this.form.title = "";
                      this.form.description = "";
                      this.form.project = "";
                      this.form.assign_to = "";
                      this.form.observer = [];
                      this.form.priority = "";
                    }


            })
            .catch(error => {
                 
                    if(error.response.data.message && Array.isArray(error.response.data.message)){
                      this.errors = error.response.data.message;
                    }else{
                      this.errors = [error.response.data.message];
                    }
            });;

          //  console.log(returndata)

           // debugger;
          },
          async getTaskByIdFunc(id) {
              await store.dispatch('task/getTaskById', {id:id}).then(async response => {

                    let resultt = response.data.data;



                    if(resultt.task && resultt.task.id){

                        this.form.id = resultt.task.id;

                        this.form.title = resultt.task.title;
                        this.form.description = resultt.task.description;
                        this.form.project = resultt.task.project;
                        this.form.assign_to = resultt.task.assign_to;
                        if(resultt.task.observer && resultt.task.observer.length > 0){


                          let dataOptions = this.observerOptions;
                          if(dataOptions && dataOptions.length > 0){
                            let dataOptionsSelected = [];
                            this.observerOptions.forEach(function(user,index){

                                if(resultt.task.observer && resultt.task.observer.includes(user.value)){

                                  dataOptionsSelected.push(user);

                                }
                            })
                            if(dataOptionsSelected && dataOptionsSelected.length > 0){
                                this.form.observer = dataOptionsSelected
                            }
                          }
                        
                          

                        }

                        
                        this.form.priority = resultt.task.priority;

                    }
                      


              })
              .catch(error => {
                   
                    if(error.response.data.message && Array.isArray(error.response.data.message)){
                      this.errors = error.response.data.message;
                    }else{
                      this.errors = [error.response.data.message];
                    }
              });
          },
          async getUserRoleFunc() {
              await store.dispatch('auth/getUserRole').then(async response => {

                   if(response.data && response.data.data && response.data.data.userrole && response.data.data.userrole.length > 0){

                      var dataUser = [];

                      response.data.data.userrole.forEach(function(user,index){

                          dataUser.push({value: user.id, label: user.name+" (Role: "+user.role+")"});
                      })

                      this.assignToOptions = dataUser;
                      this.observerOptions = dataUser;


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
          async getAllProjectFunc() {
               var returndata =  await store.dispatch('project/getAllProject').then(response => {

                    let projectss = response.data.data.projects;


                      if(projectss.length > 0){

                          let dataProject = [];

                          projectss.forEach(function(project,index){

                              dataProject.push({value: project.id, label: project.title});
                          })

                          this.projectOptions = dataProject;



                      }


                })
                .catch(error => {
                });;

          },
          onReset(event) {
            event.preventDefault()
            // Reset our form values
            this.form.email = ''
            this.form.name = ''
            this.form.food = null
            this.form.checked = []
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
              this.show = true
            })
          }
      }
  }
</script>