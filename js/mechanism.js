var canvas1 = document.getElementById('canvas1');
var ctx = canvas1.getContext('2d');
var stop = false;
var trigger;
var backgroundImg = new Image();
backgroundImg.src = "images/background.jpg";


var button1, button2, button3;
var flag = 0;
button1 = document.querySelector('.button1');
button2 = document.querySelector('.button2');
button3 = document.querySelector('.button3');
    button1.addEventListener('click' , function(){
        button1.style.backgroundColor = 'red';
        button2.style.backgroundColor = 'gray';
        button3.style.backgroundColor = 'gray';
        flag = 1;

    });
    button2.addEventListener('click' , function(){
        button1.style.backgroundColor = 'gray';
        button2.style.backgroundColor = 'red';
        button3.style.backgroundColor = 'gray';
        flag = 2;
    });
    button3.addEventListener('click' , function(){
        button1.style.backgroundColor = 'gray';
        button2.style.backgroundColor = 'gray';
        button3.style.backgroundColor = 'red';
        flag = 3;
    });



window.onload = function(){
    document.getElementById('play-game').onclick = function(){
        if(flag !== 0){playGame();
        var audio = new Audio(); // Создаём новый элемент Audio
        audio.src = './tom_and_jerry_theme.mp3'; // Указываем путь к звуку
        audio.autoplay = true;} // Автоматически запускаем
        else {alert('выберите сложность игры')};
    };
var setCheeseTime = 2500;
var setTomTime = 6000;
var hammer = 0;
var pause = document.querySelector('.pause');
pause.addEventListener('click', function(){
    trigger = 1;
});
   

    function playGame(){
        updateCanvas1();

        setInterval(
            function(){
                cheese.newProduct();
                cheese.createCheese();
            }, setCheeseTime);      
        
        setInterval( function(){
            var random = tom.displayRandomTom();
            tom.createTom(random[0], random[1]);
        }, setTomTime);
    }
};

var keysPressed = {
    top: false,
    bottom: false,
    right: false, 
    left: false
};
var keysPressed2 = {
    top2: false,
    bottom2: false,
    right2: false, 
    left2: false
};

var TOP_KEY = 38;
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var BOTTOM_KEY = 40;
var TOP2_KEY = 87;
var LEFT2_KEY = 65;
var RIGHT2_KEY = 68;
var BOTTOM2_KEY = 83;
document.onkeydown = function(event){
    event.preventDefault();
    switch (event.keyCode){
        case TOP_KEY:
        keysPressed.top = true;
        break;
        case BOTTOM_KEY:
        keysPressed.bottom = true;
        break;
        case RIGHT_KEY:
        keysPressed.right = true;
        break;
        case LEFT_KEY:
        keysPressed.left = true;
        break;
        case TOP2_KEY:
        keysPressed2.top2 = true;
        break;
        case BOTTOM2_KEY:
        keysPressed2.bottom2 = true;  
        break;
        case RIGHT2_KEY:
        keysPressed2.right2 = true;
        break;
        case LEFT2_KEY:
        keysPressed2.left2 = true;
        break;
    }
};

document.onkeyup = function(event){
    switch (event.keyCode){
        case TOP_KEY:
        keysPressed.top = false;
        break;
        case BOTTOM_KEY:
        keysPressed.bottom = false;
        break;
        case RIGHT_KEY:
        keysPressed.right = false;
        break;
        case LEFT_KEY:
        keysPressed.left = false;
        break;
        case TOP2_KEY:
        keysPressed2.top2 = false;
        break;
        case BOTTOM2_KEY:
        keysPressed2.bottom2 = false;
        break;
        case RIGHT2_KEY:
        keysPressed2.right2 = false;
        break;
        case LEFT2_KEY:
        keysPressed2.left2 = false;
        break;
    }
};


function updateCanvas1(){
    Object.keys(keysPressed).forEach(function(edit){
        if(keysPressed[edit]){
            jerry.move(edit);
        }
    });
    if (trigger = 1){
    Object.keys(keysPressed2).forEach(function(edit){
        if(keysPressed2[edit]){
            jerry2.move(edit);
        }
    });
    }
    if (stop) {
        return;
        }   
ctx.drawImage(backgroundImg, 0, 0);

ctx.fillText("Текущие баллы : " + jerry.pointCounter + 'очков', 650 , 20);
if (trigger = 1){
    ctx.fillText("Текущие баллы 2: " + jerry2.pointCounter + 'очков', 650 , 35);
}

var myRecord = localStorage.getItem('max'); 
    if (jerry.pointCounter > myRecord){   
        localStorage.setItem('max', jerry.pointCounter);
        ctx.fillText('Рекорд: ' + jerry.pointCounter, 650, 50);
    
    } 
    else {
        ctx.fillText('Рекорд: ' + myRecord, 650, 50);
    }

jerry.draw();
jerry2.draw();
tom.draw();
tom.move(tom.tomArray);

cheese.draw();

if(jerry.isDead(tom.tomArray) || jerry2.isDead(tom.tomArray)){
    gameOver();
    return;
}

for(var i = 0; i < cheese.cheeseArr.length; i++){
    if(cheese.cheeseArr.length !== 0){
        if(jerry.eatCheese(cheese.cheeseArr) === true){
            if(cheese.cheeseArr[i].name === 'normal'){   
                jerry.pointCounter += 50;
            } else if (cheese.cheeseArr[i].name === 'bad'){ 
                jerry.pointCounter += 100;
                jerry.speedX = 5;
                jerry.speedY = 5;
                setTimeout(function(){
                    jerry.speedX = 15;  
                    jerry.speedY = 15;
                }, 2500);
            }
            cheese.cheeseArr.splice(
                cheese.cheeseArr.indexOf(cheese.cheeseArr[i]), 1);
        }
    }
}
for(var i = 0; i < cheese.cheeseArr.length; i++){
    if(cheese.cheeseArr.length !== 0){
        if(jerry2.eatCheese(cheese.cheeseArr) === true){
            if(cheese.cheeseArr[i].name === 'normal'){   
                jerry2.pointCounter += 50;
            } else if (cheese.cheeseArr[i].name === 'bad'){ 
                jerry2.pointCounter += 100;
                jerry2.speedX = 5;
                jerry2.speedY = 5;
                setTimeout(function(){
                    jerry2.speedX = 15;  
                    jerry2.speedY = 15;
                }, 2500);
            }
            cheese.cheeseArr.splice(
                cheese.cheeseArr.indexOf(cheese.cheeseArr[i]), 1);
        }
    }
}

requestAnimationFrame(updateCanvas1);


};
document.addEventListener("keydown", function(e) {
    if (e.keyCode === 27) {
        stop = !stop;
         if (!stop) {
            updateCanvas1();
        }
    }
});

// Создание экзмепляров класса
var cheese = new ProductCheese();
var jerry = new Jerry();
var tom = new Tom();
var jerry2 = new Jerry();

function gameOver(){

    ctx.fillText('Конец игры', canvas1.width / 2 - 200, canvas1.height / 2);
    ctx.fillText('Игрок Jerry набрал' + jerry.pointCounter, canvas1.width / 2 - 200, canvas1.height / 2 + 100);
    ctx.fillText('Рекорд: ' + localStorage.getItem('max'), canvas1.width / 2 - 200, canvas1.height / 2 + 50);
    trigger = 0;
    setInterval(function(){
        document.location.reload();
    }, 5000);
}

