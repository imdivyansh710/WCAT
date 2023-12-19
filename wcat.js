// 1) node wcat.js filepath => displays the contents of a file in terminal
//2) node wcat.js filepath1 filepath2 filepath3 => displays the content of all the files in terminal in concatinated form in given order
//3) node wcat.js -n  file1 file2 file3 OR node wcat.js -n file1
//node wcat.js f1.txt
//node wcat.js f1.txt f2.txt f3.txt

const fs = require('fs');
let inputArr = process.argv.slice(2);
//console.log(inputArr);

let fileArr = [];
let optionsArr = [];
//==============placed files path in fileArr=======================
for (let i = 0; i < inputArr.length; i++) {
    let firstChar = inputArr[i].charAt(0);
    //console.log(firstChar);
    if (firstChar == '-') {
        optionsArr.push(inputArr[i]);
    }
    else {
        fileArr.push(inputArr[i]);
    }
}

//console.log("files to be read are "+ fileArr);
//console.log(optionsArr);


//=========check if all the files are present=======================

for (let i = 0; i < fileArr.length; i++) {

    let doesExist = fs.existsSync(fileArr[i]);
    if (!doesExist) {
        console.log("one or more files does not exist");
        return;
        //process.exit  //--> alternative for return
    }

}

//==========content read and appending starts===================
let content = "";
for (let i = 0; i < fileArr.length; i++) {
    let fileContent = fs.readFileSync(fileArr[i]);
    content += fileContent + "\r\n"
}

//console.log(content);
let contentArr = content.split('\r\n');
//console.table(contentArr);

//check if -s is present or not

let isSPresent = optionsArr.includes('-s');
//console.log(isSPresent);
if (isSPresent) {
    for (let i = 1; i < contentArr.length; i++) {
        if (contentArr[i] == "" && contentArr[i - 1] == "") {
            contentArr[i] = null;
        }
        else if (contentArr[i] == "" && contentArr[i - 1] == null) {
            contentArr[i] = null;
        }
    }
    let tempArr = [];
    for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] != null) {
            tempArr.push(contentArr[i]);
        }
    }
   // console.log("data after removing extra lines\n", tempArr);
    contentArr = tempArr;
}

let indexOfN = optionsArr.indexOf('-n');
let indexOfB = optionsArr.indexOf('-b');

let finalOption = "";
//if both -n and -b are present
if(indexOfN !=-1 && indexOfB!=-1){
    if(indexOfN< indexOfB){
        finalOption = '-n'
    }
    
    else{
        finalOption='-b';
    } 
}

else{
    // if either -n is present or -b is present
    if(indexOfN!=-1){
        finalOption='-n';
    }
    else if(indexOfB!=-1){
        finalOption='-b'
    }
}

// callinf gor functions by evaluating final options
if(finalOption=='-n'){
    modifyContentByN();
}

else if(finalOption=='-b'){
    modifyContentByB();
}


function modifyContentByN(){
    for(let i=0;i<contentArr.length;i++){
        contentArr[i]=i+1+ ") " + contentArr[i];
    }
}

function modifyContentByB(){
    let count =0;
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=''){
            count++;
            contentArr[i]=count+ ") " + contentArr[i];
        }
    }
}

//console.log(contentArr);
let ans="";
for(let i=0;i<contentArr.length;i++){
    ans=ans+contentArr[i]+'\n';
}

console.log(ans);