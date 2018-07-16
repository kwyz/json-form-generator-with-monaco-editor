<template>
    <div style="background-color: #c9c9c9">
        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-12">
                    <h1 class="text-center">MONACO EDITOR</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-md-1 offset-xs-2 offset-md-1 pl-0">
                    <button type="button" class="btn btn-primary btn-sm btn-block mb-2" @click="changeLanguage()">{{currentLanguage.toUpperCase()}}</button>
                </div>
            </div>
            <div class="row">
                <div class="col-md-5 col-xs col-sm offset-md-1 pb-2 pr-1">
                    <code-editor :code=code :language=language></code-editor>
                </div>
                <div class="col-md-5 col-xs col-sm ml-2 ml-5 justify-content-center bg-white mb-2 pb-4" style="overflow-y: scroll; max-height: 690px;">
                    <nav>
                        <div class="nav justify-content-center nav-tabs bg-white" id="nav-tab" role="tablist">
                            <a class="nav-item nav-link active" id="nav-code-tab" data-toggle="tab" href="#nav-code" role="tab" aria-controls="nav-code" aria-selected="true">JsonTree</a>
                            <a class="nav-item nav-link" id="nav-form-tab" data-toggle="tab" href="#nav-form" role="tab" aria-controls="nav-form" aria-selected="false">Form</a>
                            <a class="nav-item nav-link" id="nav-output-tab" data-toggle="tab" href="#nav-output" role="tab" aria-controls="nav-output" aria-selected="false">Output</a>
                        </div>
                    </nav>
                    <div class="tab-content bg-white mt-2" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-code" role="tabpanel" aria-labelledby="nav-code-tab">
                            <json-viewer :data=code></json-viewer>
                        </div>
                        <div class="tab-pane fade text-center" id="nav-form" role="tabpanel" aria-labelledby="nav-form-tab">
                            <form-builder :schema=code :model=fieldsModels></form-builder>
                            <button type="button" class="btn btn-success mt-2">Submit</button>
                        </div>
                        <div class="tab-pane fade" id="nav-output" role="tabpanel" aria-labelledby="nav-output-tab">
                            <schema-output :schema=code></schema-output>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CodeEditor from './components/CodeEditor' // Import monaco editor component
import JsonViewer from './components/JsonViewer' // Import Json View component
import FormBuilder from './components/FormBuilder' // Import Form Buider component
import SchemaOutput from './components/JsonSchemaOutput' // Import SchemaOutput component
import rules from "./components/FormBuilder/validation/rules"; // Import validation rules
import jsonSchema from './resources/jsonSchema.js' // Import file that contains json schema
import JsonPathGenerator from './components/JsonPathGenerator/index.js'


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
        language: "json",
        currentLanguage:"ro",
        jsonPath:[],
        code: {},
        fieldsModels: []
    };    
},

created(){
    this.code =  jsonSchema;
    JsonPathGenerator.methods.generateJsonPath(this.code)
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
        if(JSON.stringify(jsonSchema) !=JSON.stringify($this.code)){
            $this.code = {}
            Vue.nextTick(function () {
                if(!(jsonSchema instanceof Error)){
                    $this.code = jsonSchema;
                    JsonPathGenerator.methods.disposeAll();
                    JsonPathGenerator.methods.generateJsonPath(jsonSchema);
                }   
            });
        }
    });
  }
}
</script>
