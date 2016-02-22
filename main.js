/**
 * Created by ozan on 2/21/16.
 */
var myImage = document.querySelector('img');

myImage.onclick = function() {
    var mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/mikey.jpg') {
        myImage.setAttribute ('src','images/bernie.jpg');
    } else {
        myImage.setAttribute ('src','images/mikey.jpg');
    }
}

/*
var myButton = document.querySelector('button');
var myHeading = document.querySelector('h1');

function setUserName(){
    var myName = prompt('Please enter your name');
    localStorage.setItem('name', myName);
    myHeading.textContent = 'Mozilla is cool, ' + myName;
}

if(!localStorage.getItem('name')){
    setUserName();
}else {
    var storedName = localStorage.getItem('name');
    myHeading.textContent='Mozilla is cool, ' + storedName;
}

myButton.onclick = function(){
    setUserName();

}
*/