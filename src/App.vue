<template>
  <v-app class="overflow-hidden" style="background-color: #c9c9c9">
    <v-container grid-list-md @click="realoadForm">
      <v-layout>
        <v-flex class="text-md-center">
          <h1 class="display-3">MONACO EDITOR</h1>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs10 mr-5 offset-xs1>
          <v-btn large block color="primary" @click="realoadForm"> Reload Form</v-btn>
        </v-flex>
        <v-flex xs5 offset-xs1>
          <code-editor :code=code :language=language></code-editor>
        </v-flex>
        <v-flex xs5>
          <v-tabs color="primary" dark slider-color="white">
            <v-tab>
              JsonTree
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <json-viewer :data=code></json-viewer>
              </v-card>
            </v-tab-item>
            <v-tab>
              FORM
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <template>
                  <form-builder :schema="code"></form-builder>
                </template>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import CodeEditor from './components/CodeEditor'
import JsonViewer from './components/JsonViewer'
import FormBuilder from './components/FormBuilder'




export default {
  name: 'App',
    props: {
      source: String
    },
    components:{
		"code-editor": CodeEditor,
    "json-viewer": JsonViewer,
    "form-builder": FormBuilder
    },

  data(){
      return {
        hide: false,
		language: "json",
        code: {
  "type": "object",
  "title": "MSign",
  "properties": {
    "email": {
      "type": "string",
      "format": "email",
      "title": "Your email adress",
      "validation": "required|email"

    },
    "idnp": {
      "type": "string",
      "format": "idnp",
      "title": "Your identification number",
      "minLength": 13,
      "maxLength": 13,
      "validation": "required|numeric|idnp:13|idnpValidate"
    },
    "dob": {
      "type": "string",
      "format": "date",
      "title": "Birth date"
    }
  }
},

      };    
  },
  methods:{
    realoadForm(){
      var x = CodeEditor.methods.getEditorValue();
      if(!(x instanceof Error)){
      this.code = x
      }
    }
  },
  mounted(){
    var $this = this;
      window.addEventListener('keyup', function(ev) {
        $this.realoadForm();
    });
  }
    }
</script>
<style>
  html {
    overflow-y: auto;
  }
</style>
