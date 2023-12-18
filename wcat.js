// 1) node wcat.js filepath => displays the contents of a file in terminal
//2) node wcat.js filepath1 filepath2 filepath3 => displays the content of all the files in terminal in concatinated form in given order

//node wcat.js f1.txt
//node wcat.js f1.txt f2.txt f3.txt

const fs = require('fs');
let inputArr = process.argv.slice(2);
console.log(inputArr);

let fileArr =[];
//placed files path in fileArr
for(let i=0;i<inputArr.length;i++)
{
    fileArr.push(inputArr[i]);
}

//console.log("files to be read are "+ fileArr);


//check if all the files are present

for(let i=0; i<fileArr.length;i++){

    let doesExist = fs.existsSync(fileArr[i]);
    if(!doesExist){
        console.log("files does not exist");
        return;
    }

    //content read and appending starts
    let content="";
    for(let i=0;i<fileArr.length;i++){
        let fileContent = fs.readFileSync(fileArr[i]);
        content+=fileContent+"\n"
    }

    console.log(content);
}

