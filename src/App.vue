<template>
    <v-app class="overflow-hidden" style="background-color: #c9c9c9">
        <v-container grid-list>
            <v-layout>
                <v-flex xs12 md12 sm12 class="text-xs-center">
                    <h1 class="display-3">MONACO EDITOR</h1>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex md5 xs12 sm12 offset-xs5 offset-md0>
                    <v-btn @click="changeLanguage()" color="primary">{{currentLanguage}}</v-btn>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex md5 xs12 mb-5 pb-5 >
                    <code-editor :code=code :language=language class="mb-4"></code-editor>
                </v-flex>
                <v-flex md5 xs12 sm12 offset-xl2 offset-md2 >
                    <v-tabs color="primary" dark slider-color="white">
                        <v-tab>
                            JsonTree
                        </v-tab>
                        <v-tab-item style="overflow-y: scroll;max-height: 650px;">
                            <v-card flat>
                                <json-viewer :data=code></json-viewer>
                            </v-card>
                        </v-tab-item>
                        <v-tab>
                            FORM
                        </v-tab>
                        <v-tab-item style="overflow-y: scroll;max-height: 650px;">
                            <v-card flat>
                                <template>
                                    <form-builder :schema=code v-model="code"></form-builder>
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
import rules from "./components/FormBuilder/validation/rules";


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
        currentLanguage:"ro",
        jsonPath:[],
        code: {},
    };    
},
created(){
    this.code = {
    "type": "object",
    "title": "MSign",
    "properties": {
        "email": {
            "type": "string",
            "format": "email",
            "title": "Your email adress",
            "validation": "required|email",
            "dataJsonPath": "$.properties.email"
        },
        "idnp": {
            "type": "string",
            "format": "idnp",
            "title": "Your identification number",
            "minLength": 13,
            "maxLength": 13,
            "validation": "required|numeric|idnp:13|idnpValidate",
            "dataJsonPath": "$.properties.idnp"
        },
        "person": {
            "type": "object",
            "title": "Personal data",
            "properties": {
                "first_name": {
                    "type": "string",
                    "title": "First name",
                    "dataJsonPath": "$.properties.person.properties.first_name"
                },
                "last_name": {
                    "type": "string",
                    "title": "Last Name",
                    "dataJsonPath": "$.properties.person.properties.last_name"
                }
            }
        }
    }
}
},
  methods:{
    changeLanguage() {
        this.currentLanguage = rules.methods.getCurrentLanguage();
    },
  },
  mounted(){
    var $this = this;
      window.addEventListener('keyup', function(ev) {
        var jsonSchema = CodeEditor.methods.getEditorValue();
        if(!(jsonSchema instanceof Error)){
            $this.code = jsonSchema
        }
    });
  }
}
</script>
<style>
    html {
      overflow-y: auto;
    }
</style>
