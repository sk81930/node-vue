<template>
    <div class="main-drop-upload border border-gray-100 bg-white	  shadow-xl overflow-hidden sm:rounded-md">

        <items :files="files" :items="temporaryFiles" ></items>

        <div for="file-upload">

            <div @drop.prevent="drop($event)" @click.self="clickOnInput()" @dragover.prevent="dragover($event)" class="cursor-pointer hover:bg-gray-50 mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div @click.self="clickOnInput()" class="space-y-1 text-center">
                    <svg  @click.self="clickOnInput()" class="mx-auto h-12 svg-img-upload text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div class="flex text-sm text-gray-600">
                        <label  class="relative cursor-pointer bg-white rounded-md font-medium text-blue-500  hover:text-blue-600 transition-color duration-300">
                            <span>Upload a attachment</span>
                            <input  multiple @change="clickedInput($event)" id="file-upload" name="file-upload" type="file" class="sr-only d-none" />
                        </label>
                        <p class="pl-1" @click.self="clickOnInput()">or drag and drop</p>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>

import { ref, watchEffect } from 'vue'

import ToolBar from "./ToolBar.vue";
import Items from "./Items.vue";

import "./uploader.scss";


export default {
    name: 'FileUpload',
    props: {
          url:{
              type: String,
              default: '/',
          },
          id:{
              type: Number,
              default: null,
          },
          label: {
              type: String,
              default: 'PNG, JPG, GIF up to 10MB'
          }

    },
    props: ["emptyfiles"],
    data: function(){
      return {
          temporaryFiles : [],
          request: new FormData(),
          files: [],
          dataParent:null,
          uploading: false,

      }

    },
    components:{
      'tool-bar': ToolBar,
      'items': Items,
    },
    methods:{
        dragover: function(e){
            e.stopPropagation();
            e.dataTransfer.dropEffect = 'copy';
        },
        drop: function(e){
            e.stopPropagation();
            this.createFile(e);

        },


        createCancelToken: function(){
            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();

            return source;
        },
        clickOnInput:function(){
            const uploadInput = document.getElementById('file-upload');
            uploadInput.click();
        },
        clickedInput: function(e){
            this.createFile(e);
        },
        createUrl : function(cur) {

            if(cur.type.match(/video.*/)){
                this.temporaryFiles.push({type:'video', url : URL.createObjectURL(cur), status: 'pending', percent: 0});
            }else if(cur.type.match(/image.*/))
            {
                this.temporaryFiles.push({type:'image', url : URL.createObjectURL(cur), status: 'pending', percent: 0});
            }else{

                this.temporaryFiles.push({type:'file', url : URL.createObjectURL(cur), status: 'pending', percent: 0});
            }

        },
        createFile: function(e){

            var files = [...e.target.files || e.dataTransfer.files]; // Array of all files
            this.files.push(...files);

            files.forEach(cur => {
                this.createUrl(cur);
            });

            this.$emit('filesdata', this.files);


        },
        isAllUploading(){
            let uploading = false;
            let uploadingList = [];

            this.temporaryFiles.forEach(cur => uploadingList.push(cur.status));

            if(uploadingList.includes('uploading')) return true;

            return uploading;

        }

    },
    mounted(){
        watchEffect(() => {
          if(this.emptyfiles && this.emptyfiles != ""){
            this.items = [];
            this.files = [];
            this.temporaryFiles = [];
            this.$emit('filesdata', []);
          }
        });
        if(this.id)this.request.append('id', this.id);
    },
    setup() {
        // Make a local copy of the received prop
       // const data = ref([...props.initialData]);
        
        
    }
}
</script>

<style scoped>
.upload-images{
    width: 100px !important;
    height: 100px !important;
}
.tool-bar-img{
    font-size: 12px;
}

</style>
