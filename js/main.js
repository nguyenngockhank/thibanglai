window.onload = function(){
	rightAns = [2,1,1,2,1,1,3,2,2,2,4,4,1,3,4,2,3,1,2,1,3,3,3,3,2,1,2,1,4,1,2,2,1,2,2,4,1,4,4,1,3,2,3,3,3,1,3,1,3,3,4,3,1,4,2,4,2,3,1,3,3,1,3,4,1,3,4,2,1,2,1,2,2,1,2,1,2,3,2,1,3,2,2,1,3,1,2,2,1,3,2,1,3,2,1,2,1,1,3,1,2,1,1,3,2,2,4,1,3,3,4,3,1,3,3,1,2,3,2,2];
	arrQues = []; // list cau hoi
	arrAns = []; // list cau tra loi
	
	number = 10; // so cau hoi
	reset();
	showTime();	
	initNumber();
	initName();
	initControls();
	initSelects();
	initEnter();
	
	minutes = 5; seconds = 0;  // thoi gian 5 phut
	setClock();
	initTime();
}

function reset(){
	curQues = 1; 
	initAnswer();
	getQuestions();
	setTask();
	showQuestion(1);
}

function initEnter(){
	id('enter').onclick = function(){
		showResult();
	}
}

function showResult(){
	var yes = 0;
	for(var i=0; i<number; i++){
		if(arrAns[i] == rightAns[arrQues[i]-1]){
			yes++;
		}
	}
	
	alert('So cau dung ' + yes + '/' + number);
}

function randomQuestion(){
	return Math.floor(Math.random() * 120) + 1; // random 1 - > 120
}

function isExist(num){
	if(arrQues.length==0) 
		return false;
	
	for(var i=0; i<arrQues.length; i++){
		if(arrQues[i] == num)
			return true;
	}
	
	return false;
}

/*** GET LIST OF QUESTIONS ***/
function getQuestions(){
	for(var i=0 ; i<number ; ){
		var t = randomQuestion();
		if(!isExist(t)){
			arrQues[i] = t;
			++i;
		}
	}
}

/*** INIT RIGHT & SET CHANGE  **/
function setTask(){
	var task = '';
	for(var i=1; i<= number; i++){
		task += '<tr>';
		task += '<td><a href="#'+ i +'">' + i + '</a></td>';
		task += '<td id="z'+i+'"></td>';
		task += '</tr>';
	}
	var table = id('answers').getElementsByTagName('table')[0];
	var head = table.getElementsByTagName('tr')[0];
	table.innerHTML = head.innerHTML + task;
	setChange();
}

function initControls(){
	var next = id('next');
	next.onclick = function(){
		if(curQues < number){
			showQuestion(++curQues);
		}
	}
	
	var prev = id('prev');
	prev.onclick = function(){
		if(curQues > 1){
			showQuestion(--curQues);
		}	
	}
}

function showAnswer(){
	var table = id('answers').getElementsByTagName('table')[0];
	var row = table.getElementsByTagName('tr')[curQues];
	row.lastChild.innerHTML = arrAns[curQues-1];
}

function initSelects(){
	var arrB = id('selects').getElementsByTagName('button');
	
	for(var i=0; i<arrB.length; i++){
		arrB[i].onclick = function(){
			arrAns[curQues-1] = this.innerHTML;
			showAnswer();
		}
	}
}

/** SHOW CAU HOI **/
function showQuestion(t){
	curQues = t;
	id('title').innerHTML = ' Câu ' + curQues + ':';
	changeQuestion(arrQues[curQues-1]);	
}

function setChange(){
	var arrLink = id('answers').getElementsByTagName('a');
	
	for(var i=0;i<arrLink.length;i++){
		arrLink[i].onclick = function(){
			showQuestion(this.innerHTML);	
		};
	}
}

function changeQuestion(num){
	var img = '';
	if(num<10){
		img = '00' + num + '.JPG';
	}else if(num<100){
		img = '0' + num + '.JPG';
	}else{
		img =  num + '.JPG';
	}
	id('question').innerHTML = '<img src="image/'+img+'" />';
}

/**** SET LINH TINH & LUNG TUNG ****/ 

function initNumber(){
	var temp = id('number');
	var str = '';
	for(var i=10;i<=120;i+=10){
		str += '<option value="'+i+'">'+i+'</option>';
	}
	temp.innerHTML = str;
	temp.onchange = function (){
		number = this.value;
		reset();
	}
}

function initAnswer(){
	for(var i=0;i<number;i++){
		arrAns[i] = 0;
	}
}

function initName(){
	var name = prompt("Please enter your name","No name");
	id('name').innerHTML = name;
}

function showTime(){
	var d = new Date();
	var time = '';
	time += ((d.getDate() > 9) ? d.getDate() : '0' + d.getDate()) + '/';
	time += ((d.getMonth()> 9) ? d.getDate() : '0' + d.getMonth()) + '/' + d.getFullYear();
	id('date').innerHTML = time;
}

function setClock(){
	if (seconds<=0){ 
		seconds=60;
		minutes-=1 ;
	} else 
		seconds-=1 ;
		
	if( (minutes<0) ||(minutes==0 && seconds==0)  ){
		showResult();
		reset();
		minutes = 5;
	}
					
	var time ="";
	time += (minutes<10) ? "0"+minutes : minutes;
	time += ":";
	time += (seconds<10) ? "0"+seconds : seconds;
	id('clock').innerHTML = time;
	setTimeout("setClock()",1000);
}

function initTime(){
	var temp = id('time');
	var str = '';
	for(var i=5;i<=20;i+=5){
		str += '<option value="'+i+'">'+i+'</option>';
	}
	temp.innerHTML = str;
	temp.onchange = function (){
		minutes = this.value;
	}
}

function id(name){
	return document.getElementById(name);
}