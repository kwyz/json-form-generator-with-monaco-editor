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
                <v-flex md5 xs12 mb-4 pb-2 pr-1>
                    <code-editor :code=code :language=language></code-editor>
                </v-flex>
                <v-flex md5 xs12 sm12 offset-xl2 offset-md2>
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
                                    <form-builder :schema=code v-model="formContent"></form-builder>
                                </template>
                            </v-card>
                        </v-tab-item>
                        <v-tab>
                            Output
                        </v-tab>
                        <v-tab-item style="overflow-y: scroll;max-height: 650px;">
                            <v-card flat>
                                <template>
                                    <schema-output :schema=code :model="formContent"></schema-output>
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
import CodeEditor from './components/CodeEditor' // Import monaco editor component
import JsonViewer from './components/JsonViewer' // Import Json View component
import FormBuilder from './components/FormBuilder' // Import Form Buider component
import SchemaOutput from './components/JsonSchemaOutput' // Import SchemaOutput component
import rules from "./components/FormBuilder/validation/rules"; // Import validation rules


export default {
  name: 'App',
    props: {
      source: String
    },
    components:{
		"code-editor": CodeEditor,
        "json-viewer": JsonViewer,
        "form-builder": FormBuilder ,
        "schema-output": SchemaOutput,
    },

  data(){
      return {
        hide: false,
        language: "json",
        currentLanguage:"ro",
        jsonPath:[],
        code: {},
        formContent:[],
    };    
},
created(){
    this.code = {
    "type": "object",
    "title": "PhysicalPersonList",
    "properties": {
        "PhysicalPerson": {
            "type": "array",
            "properties": {
                "items": [{
                        "idnp": {
                            "type": "string",
                            "format": "idnp",
                            "title": "Your identification number",
                            "minLength": 13,
                            "maxLength": 13,
                            "validation": "required",
                            "dataJsonPath": "$.properties.idnp"
                        }
                    },
                    {
                        "last_name": {
                            "type": "string",
                            "title": "Nume",
                            "maxLength": 255,
                            "validation": "required|alpha",
                            "dataJsonPath": "$.properties.last_name"
                        }
                    },
                    {
                        "first_name": {
                            "type": "string",
                            "title": "Prenume",
                            "maxLength": 255,
                            "validation": "required|alpha",
                            "dataJsonPath": "$.properties.first_name"
                        }
                    },
                    {
                        "patronymic": {
                            "type": "string",
                            "title": "Patronimic",
                            "maxLength": 255,
                            "validation": "required|alpha",
                            "dataJsonPath": "$.properties.patronymic"
                        }
                    },
                    {
                        "debt_sum": {
                            "type": "number",
                            "title": "Suma datoriilor (MDL)",
                            "maxLength": 255,
                            "validation": "required|alpha",
                            "dataJsonPath": "$.properties.relative"
                        }
                    }
                ]
            }
        }
    }
}
},
  methods:{
      // Function to change curent language, on button click
    changeLanguage() {
        this.currentLanguage = rules.methods.getCurrentLanguage();
    },
  },
  mounted(){
      // Function that listen to any pressed key and update form builder view
    var $this = this;
      window.addEventListener('keyup', function(ev) {
        var jsonSchema = CodeEditor.methods.getEditorValue();
        $this.formContent= FormBuilder.methods.getFormModel();
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
