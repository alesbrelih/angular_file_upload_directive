var angular = require("angular");

var app = angular.module("fileUploadApp",[]);

//directive for input[type="file"]

app.directive("abFileInput",function(){
    function linkFunction(scope,el,attr,ngCtrl){

        //when validators are done and viewValue is changed
        ngCtrl.$viewChangeListeners.push(function(){
            //if form is valid render img preview
            if(ngCtrl.$valid){

                var file = ngCtrl.$modelValue;

                var fileRenderer = new FileReader();
                fileRenderer.addEventListener("load",function(ev){
                    scope.$apply(function(){
                        scope.abPicPreview = ev.target.result;
                        
                    });
                    
                });

                fileRenderer.readAsDataURL(file);

                

            }
        });


        //validator for type
        ngCtrl.$validators.validType = function(modelValue,viewValue){
            var value = modelValue || viewValue;

            if(!value){
                return true;
            }
            else{
                if(value.type.startsWith("image")){
                    return true;
                }
                else{
                    return false;
                }
            }
        };

        //validator for size
        ngCtrl.$validators.validSize = function(modelValue,viewValue){
            var value = modelValue || viewValue;

            if(!value){
                return true;
            }
            else{
                if(value.size<2000000){
                    return true;
                }
                else{
                    return false;
                }
            }
        };

        //event listeners for element with abFileInput
        el.on("change",fileChange);
        el.on("$destroy",function(){
            el.off("change",fileChange);
        })

        //function that executes on file change
        function fileChange(){

            var file = el[0].files[0];

            ngCtrl.$setViewValue(file);
        }
    };
    return{
        restrict:"A",
        require:"ngModel",
        scope:{

            abPicPreview:"=" //location for pic preview (src)

        },
        link:linkFunction
    }
})


app.controller("FileCtrl",function(){
    const vm = this;
    vm.title="File upload with angular";
    vm.picPreview = "";
    vm.submitFile = ()=>{
        console.log(vm.file);
        alert(`File submited!
                File data: 
                ${vm.file.toString()}`)
    };
});