<template>
    <v-app class="overflow-hidden" style="background-color: #c9c9c9">
        <v-container grid-list-md>
            <v-layout>
                <v-flex offset-xs1 xs10 class="text-md-center">
                    <h1 class="display-3">MONACO EDITOR</h1>
                    <v-btn block @click="changeLanguage()" color="primary" large>{{currentLanguage}}</v-btn>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
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
                                    <form-builder :schema="code" :jsonPath="jsonPath"></form-builder>
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
        code: {
            "type": "object",
            "title": "MSign",
            "properties": {
                "email": {
                    "id": "email",
                    "type": "string",
                    "format": "email",
                    "title": "Your email adress",
                    "validation": "required|email"
                },
                "idnp": {
                    "id": "idnp",
                    "type": "string",
                    "format": "idnp",
                    "title": "Your identification number",
                    "minLength": 13,
                    "maxLength": 13,
                    "validation": "required|numeric|idnp:13|idnpValidate"
                },
                "dob": {
                    "id": "dob",
                    "type": "object",
                    "title": "Birth date",
                    "properties":{
                        "email": {
                            "id": "field1",
                            "type": "string",
                            "format": "email",
                            "title": "First field",

                            },
                        "idnp": {
                            "id": "idnp",
                            "type": "string",
                            "format": "idnp",
                            "title": "Seccond field",
                        },
                    }
                }
            }
        },
    };    
},
created(){
    this.generateJsonPaths(this.code);
},
  methods:{
    reloadForm(){
        FormBuilder.methods.manageElementCount("reset");
        var jsonSchema = CodeEditor.methods.getEditorValue();
        if(!(jsonSchema instanceof Error)){
            this.code = jsonSchema
            this.generateJsonPaths(jsonSchema)
        }
    },
    changeLanguage() {
        this.currentLanguage = rules.methods.getCurrentLanguage();
    },
    generateJsonPaths: function(jsonSchema){
        var jp = require('jsonpath');
        var paths = jp.nodes(jsonSchema,"$..id");
        var pathArray = []
        for(var index = 0; index < paths.length; index++){
            var elementPathArray = paths[index].path;
            var elementPath = ""
            for(var possition = 0; possition < elementPathArray.length; possition++){
                elementPath += elementPathArray[possition]+".";
            }
            elementPath = elementPath.substring(0,elementPath.lastIndexOf(".id"))
            if(elementPath!="$"){
                pathArray.push(elementPath);
            }
        }
        this.jsonPath = pathArray;
    }
  },
  mounted(){
    var $this = this;
      window.addEventListener('keyup', function(ev) {
        $this.reloadForm();
    });
  }
}
</script>
<style>
    html {
      overflow-y: auto;
    }
</style>
