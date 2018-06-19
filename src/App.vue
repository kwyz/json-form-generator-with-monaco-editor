<template>
  <v-app class="overflow-hidden">
    <v-container grid-list-md>
      <v-layout>
        <v-flex offset-xs5>
          <h1 display-3>MONACO EDITOR</h1>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs1 mt-5>
          <v-btn color="success" mt-5 @click="displayEditor">Hide/Show</v-btn>
        </v-flex>
        <v-flex xs5 mt-5>
          <code-editor :code=code :language=language></code-editor>
        </v-flex>
        <v-flex xs5 offset-xs1 mt-5>
          <v-tabs v-model="active" color="white" dark slider-color="primary">
            <v-tab class="black--text">
              JsonTree
            </v-tab>
            <v-tab-item>
              <v-card flat>
                <json-viewer :data=code></json-viewer>
              </v-card>
            </v-tab-item>
            <v-tab class="black--text">
              FORM
            </v-tab>
            <v-tab-item>
              <v-card flat>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import CodeEditor from './components/CodeEditor/codeEditor'
import JsonViewer from './components/JsonViewer/json-tree'

export default {
  name: 'App',
    props: {
      source: String
    },
    components:{
		"code-editor": CodeEditor,
		"json-viewer": JsonViewer
    },

  data(){
      return {
        show: true,
		language: "json",
        code: {
	"type": "team",
	"test": {
		"testPage": "tools/testing/run-tests.htm",
		"enabled": true
	},
    "search": {
        "excludeFolders": [
			".git",
			"node_modules",
			"tools/bin",
			"tools/counts",
			"tools/policheck",
			"tools/tfs_build_extensions",
			"tools/testing/jscoverage",
			"tools/testing/qunit",
			"tools/testing/chutzpah",
			"server.net"
        ]
    },
	"languages": {
		"vs.languages.typescript": {
			"validationSettings": [{
				"scope":"/",
				"noImplicitAny":true,
				"noLib":false,
				"extraLibs":[],
				"semanticValidation":true,
				"syntaxValidation":true,
				"codeGenTarget":"ES5",
				"moduleGenTarget":"",
				"lint": {
                    "emptyBlocksWithoutComment": "warning",
                    "curlyBracketsMustNotBeOmitted": "warning",
                    "comparisonOperatorsNotStrict": "warning",
                    "missingSemicolon": "warning",
                    "unknownTypeOfResults": "warning",
                    "semicolonsInsteadOfBlocks": "warning",
                    "functionsInsideLoops": "warning",
                    "functionsWithoutReturnType": "warning",
                    "tripleSlashReferenceAlike": "warning",
                    "unusedImports": "warning",
                    "unusedVariables": "warning",
                    "unusedFunctions": "warning",
                    "unusedMembers": "warning"
                }
			}, 
			{
				"scope":"/client",
				"baseUrl":"/client",
				"moduleGenTarget":"amd"
			},
			{
				"scope":"/server",
				"moduleGenTarget":"commonjs"
			},
			{
				"scope":"/build",
				"moduleGenTarget":"commonjs"
			},
			{
				"scope":"/node_modules/nake",
				"moduleGenTarget":"commonjs"
			}],
			"allowMultipleWorkers": true
		}
	}
}
      };    
  },
    methods:{
        displayEditor: function(){
            this.show = !this.show;
            CodeEditor.methods.hideEditor(this.show)
        }
    }
}
</script>
<style>
  html {
    overflow-y: auto;
  }
</style>
