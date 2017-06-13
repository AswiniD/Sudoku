 

window.onload = initSudoku;
var app = angular.module('myAPP',[]);

app.controller("tableController",function($scope){
    $scope.tableData=[["0_0","0_1","0_2","0_3","0_4","0_5","0_6","0_7","0_8"],["1_0","1_1","1_2","1_3","1_4","1_5","1_6","1_7","1_8"],
    ["2_0","2_1","2_2","2_3","2_4","2_5","2_6","2_7","2_8"],["3_0","3_1","3_2","3_3","3_4","3_5","3_6","3_7","3_8"],
    ["4_0","4_1","4_2","4_3","4_4","4_5","4_6","4_7","4_8"],["5_0","5_1","5_2","5_3","5_4","5_5","5_6","5_7","5_8"],
    ["6_0","6_1","6_2","6_3","6_4","6_5","6_6","6_7","6_8"],["7_0","7_1","7_2","7_3","7_4","7_5","7_6","7_7","7_8"],
    ["8_0","8_1","8_2","8_3","8_4","8_5","8_6","8_7","8_8"]];
    
    $scope.levels=["Easy","Medium","Hard"];
    $scope.dropdownText = $scope.levels[0];
	
   // $scope.menuCustomStyle = {"background-color":"#5A8572","height":"70%","padding":"3%","border":"0px","font-size":"100%","outline":"none","font-style":"bold","font-family":"Lucida Console","font-weight":"bold","border-radius":"15px","text-align":"center"};
    $scope.buttonCustomStyle = {"width":"100%","text-align":"center","background-color":"#5A8572","height":"70%","padding":"3%","border":"0px","font-size":"100%","outline":"none","font-style":"bold","font-family":"Lucida Console","font-weight":"bold","border-radius":"15px","margin-top":"7%"};
    $scope.textCustomStyle={"background-color":"#584F06","paddingLeft":"2%","border-radius":"15px","border":"0px","outline":"none","overflow":"hidden","font-weight":"bold","font-size":"15px","font-family":"Helvetica","font-style":"obilique","color":"#000000"};

    $scope.Undo = function () {
        /*$scope.inputValue = String.fromCharCode(clickEvent.keyCode||clickEvent.charCode);*/
        $scope.UndoValue = "Undoooooo";
        var element = angular.element(document.getElementByName("Undo"));
        element.value = $scope.UndoValue;
        $window.alert("Undo done!!!!!!" + $scope.UndoValue);
    }  
 
});//controller end
//closure end

    var matrix = new Array();
    var duplicateMatrix = new Array();
	var colorMatrix = new Array();
    var recentValue;
	var recentInputId;
 
    function initSudoku(){
        
		
		var diffLevel,selectedOption;
		var level;
		diffLevel = document.getElementById("dropDownMenu");
		selectedOption = diffLevel.options[diffLevel.selectedIndex].innerHTML;
		
		//Set level 
		if(selectedOption=="Easy")level=0;
		else if(selectedOption=="Medium")level=1;
		else if(selectedOption=="Hard")level=2;
		
		
		
		//alert(selectedOption+" "+level);
        //2D matrix to store board values
       
        for(var rowCounter=0;rowCounter<9;rowCounter++){
            matrix[rowCounter] = new Array();
            for(var colCounter=0;colCounter<9;colCounter++){
                var number = colCounter/1 + 1 + (rowCounter*3) + Math.floor(rowCounter/3)%3;
                if(number>9)number = number % 9;
                if(number==0)number=9;
                matrix[rowCounter][colCounter] = number;   					
			}          
        }
        
        // Switching rows
       
        for(var row=0;row<9;row+=3){
            
            for(var col=0;col<3;col++){
                //generate the random number between [0,3)
                row1 = Math.floor(Math.random()*3); 
                row2 = Math.floor(Math.random()*3); 
                while(row2==row1){
                    //if both the generated numbers are equal generate other number
                    row2 = Math.floor(Math.random()*3); 
                }
                row1 = row1 + row;
                row2 = row2 + row;           
                var tmpMatrix = new Array();
                tmpMatrix = matrix[row1];
                matrix[row1] = matrix[row2];
                matrix[row2] = tmpMatrix;               
            }           
        }
        
        // Switching columns
        
        for(var col=0;col<9;col+=3){
            for(var row=0;row<3;row++){
                col1 = Math.floor(Math.random()*3); 
                col2 = Math.floor(Math.random()*3); 
                while(col2==col1){
                    col2 = Math.floor(Math.random()*3); 
                }
                col1 = col1 + col;
                col2 = col2 + col;           

                var tmpMatrix = new Array();
                for(var rowNumber=0;rowNumber<matrix.length;rowNumber++){
                    var tmpMatrixValue = matrix[rowNumber][col1];
                    matrix[rowNumber][col1] = matrix[rowNumber][col2];              
                    matrix[rowNumber][col2] = tmpMatrixValue;             
                }
            }   
        }      
        
		//assign values from matrix to board
        for(var row=0;row<matrix.length;row++){
            for(var col=0;col<matrix[row].length;col++){ 
				
                //get the input field id
                var obj = document.getElementById(row+'_'+col); 
				
                obj.value = matrix[row][col];
				obj.disabled=true;				
				obj.style.backgroundColor="#5A8572";
				obj.style.color='#000000'				                 
            }           
        }

		cellColorCustomization();
		
       //Display board based on selected level
		for(var row=0;row<9;row+=1){ 
			count=0;		
            switch(level){
				case 0:while(count<3){
					    col1 = Math.floor(Math.random()*9)+0;                
					    obj = document.getElementById(row+'_'+col1);
						
                        if(obj.value!=''){
						obj.value = '';
						obj.disabled=false;
						//obj.style.backgroundColor="red";						
						count++;
						}              	
					}
					break;
				case 1:while(count<4){
					    col1 = Math.floor(Math.random()*9)+0;                
					    obj = document.getElementById(row+'_'+col1);						
                        if(obj.value!=''){
						obj.value = '';
						obj.disabled=false;
						//obj.style.backgroundColor="red";						
						count++;
						}              	
					}
					break;
				case 2:while(count<5){
					    col1 = Math.floor(Math.random()*9)+0;                
					    obj = document.getElementById(row+'_'+col1);						
                        if(obj.value!=''){
						obj.disabled=false;
						//obj.style.backgroundColor="red";						
						obj.value = '';
						count++;
						}              	
					}
					break;
				
			}                                
        }
		//When we refresh validate function ask to enter some input
		sessionStorage["recentValue"] = "null";
		sessionStorage["recentInputId"] = "null";
    }
	
	function cellColorCustomization(){
		
		for(var i=0;i<3;i++){
			for(var j=3;j<6;j++){
				document.getElementById(i+"_"+j).style.backgroundColor="#a8ddb5";	
			}
		}
		for(var i=3;i<6;i++){
			for(var j=0;j<3;j++){
				document.getElementById(i+"_"+j).style.backgroundColor="#a8ddb5";	
			}
		}
		for(var i=3;i<6;i++){
			for(var j=6;j<9;j++){
				document.getElementById(i+"_"+j).style.backgroundColor="#a8ddb5";	
			}
		}
		for(var i=6;i<9;i++){
			for(var j=3;j<6;j++){
				document.getElementById(i+"_"+j).style.backgroundColor="#a8ddb5";	
			}
		}
	}
	
	//Restart the game
	function newGame(){    
		initSudoku();
	}
	
	//Save the current board values on click of save in localstorage
	function save(){	
        var errorCell;	
        for(var rowCounter=0;rowCounter<9;rowCounter++){
            duplicateMatrix[rowCounter] = new Array();
			colorMatrix[rowCounter] = new Array();
            for(var colCounter=0;colCounter<9;colCounter++){
				//store values
                duplicateMatrix[rowCounter][colCounter] = document.getElementById(rowCounter+'_'+colCounter).value;
				
				colorMatrix[rowCounter][colCounter] = document.getElementById(rowCounter+'_'+colCounter).style;
				
            }
        }
		localStorage["row0"] = JSON.stringify(duplicateMatrix[0]);
		localStorage["row1"] = JSON.stringify(duplicateMatrix[1]);
		localStorage["row2"] = JSON.stringify(duplicateMatrix[2]);
		localStorage["row3"] = JSON.stringify(duplicateMatrix[3]);
		localStorage["row4"] = JSON.stringify(duplicateMatrix[4]);
		localStorage["row5"] = JSON.stringify(duplicateMatrix[5]);
		localStorage["row6"] = JSON.stringify(duplicateMatrix[6]);
		localStorage["row7"] = JSON.stringify(duplicateMatrix[7]);
		localStorage["row8"] = JSON.stringify(duplicateMatrix[8]);
		
		localStorage["color0"] = JSON.stringify(colorMatrix[0]);
		localStorage["color1"] = JSON.stringify(colorMatrix[1]);
		localStorage["color2"] = JSON.stringify(colorMatrix[2]);
		localStorage["color3"] = JSON.stringify(colorMatrix[3]);
		localStorage["color4"] = JSON.stringify(colorMatrix[4]);
		localStorage["color5"] = JSON.stringify(colorMatrix[5]);
		localStorage["color6"] = JSON.stringify(colorMatrix[6]);
		localStorage["color7"] = JSON.stringify(colorMatrix[7]);
		localStorage["color8"] = JSON.stringify(colorMatrix[8]);
	}

	//Resume the saved board state 
	function resume(){		
		var parsedValues;var parsedColors;
		for(var row=0;row<matrix.length;row++){			
			parsedValues = JSON.parse(localStorage["row"+row]);
            parsedColors = JSON.parse(localStorage["color"+row]);	
            for(var col=0;col<matrix[row].length;col++){         
                //get the input field id				
                var CellID = document.getElementById(row+'_'+col);
				CellID.value = parsedValues[col];
				CellID.style.backgroundColor = parsedColors[col].backgroundColor;
				
                if(parsedValues[col] === '' || CellID.style.backgroundColor=="red"){						
					CellID.disabled = false;					
				}else{
					CellID.disabled = true;	
				}	
			}
		}			
	}	
	
	
	//on click of submit button validate the board for puzzle completion
	function isGameFinished()
    {		
	    var allOk = true;
		for(var row=0;row<matrix.length;row++){
            for(var col=0;col<matrix[row].length;col++){           
                //get the input field id
                var actualValue = document.getElementById(row+'_'+col);               
                  
                var expectedValue = matrix[row][col];
				
					if(expectedValue != actualValue.value){
						allOk = false;						
						break;
					} 									
            }           
        }		
		
		if(allOk){
			//Sweetalert For Success
			swal({
			title: "Congratualtions !!!",
			text: "You did it ...",
			type:"success"			
			});	
		}
		else{
			//Sweetalert For Error			
			swal({
			title: "Sorry !!!",
			text: "Try Again...",
			type:"error"			
			});		
		}
		
		
	}   
	
	//Save the most recently entered value upon onchange event on each cell
	function saveRecentValue(id){
        var Cellvalue =	document.getElementById(id).value;
		var cellColor = document.getElementById(id).style.backgroundColor;
		
		sessionStorage["recentValue"] = Cellvalue;
		sessionStorage["recentInputId"] = id;
		if(cellColor!= 'red'){
			sessionStorage["cellColor"] = cellColor;
		}
		cellColor = sessionStorage["cellColor"];
	}
	
	
	//contains function to validate the number
	function contains(value,colValues,rowValues){
		var count = 0;
		/*for(var i=0;i<9;i++){			
			alert(colValues[i]+" "+rowValues[i]);
		}*/		
		for(var i=0;i<9;i++){
			if(value == colValues[i] || value == rowValues[i])
			{				
				count++;				
			}else{
				continue;
			}
		}
		return count;		
	}	
	
	
	function validate(){
		
		var value = sessionStorage["recentValue"];		
		if(value == "null"){
			swal({
			title: "Oops!!!",
			text: "Enter number to validate",			
			});
		}else
		{
		var id = sessionStorage["recentInputId"];
		var color = sessionStorage["cellColor"];
		//Get rowid and column id and stor eit in values
		var values = id.split("_");		
		var actualValue = matrix[values[0]][values[1]];
		var colValues = new Array();
		var rowValues = new Array();
		
		for(var i=0;i<9;i++){
			colValues.push(document.getElementById(i+'_'+values[1]).value);
			rowValues.push(document.getElementById(values[0]+'_'+i).value);
		}		
		
		var duplicateValueCount = contains(value, colValues,rowValues);
		
		 if(duplicateValueCount > 2 ){
			swal({
			title: "Your input " + " " + value,
			text: "Entered value is already present in Corresponding Row or Column",			
			});		
			document.getElementById(id).style.backgroundColor = "red";
		}else if(value > actualValue){
			swal({
			title: "Your input" + " " + value,
			text: "Enter value less than " + " " +value,			
			});	
			document.getElementById(id).style.backgroundColor = "red";
		}
		else if(value < actualValue) {
			swal({
			title: "Your input" + " " + value,
			text: "Enter value greater than " + " " + value,			
			});	

		document.getElementById(id).style.backgroundColor = "red";			
		}else if (value == actualValue){
			swal({
			title: "Your input " + " " + value,
			text: "Congratulations!!Your right",
			type:"success"			
			});							
		}else {
			swal({
			title: "Oops!!!",
			text: "Enter number to validate",			
			});
		}		
		
	  }
	 
	  
	}
	
	