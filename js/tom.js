var tomImage = new Image();
tomImage.src = "images/tomas.jpg";

function Tom(){
    this.x = 100;
    this.y = 500;
    this.width = 50;
    this.height = 50;
    this.name = "Tom";
    this.tomCounter = 0;
    this.tomArray = [];
    this.tomRandomArray = [
        [Math.floor(Math.random() * canvas1.width), 0],
        [Math.floor(Math.random() * canvas1.width), canvas1.height],
        [0 ,Math.floor(Math.random() * canvas1.width)],
        [canvas1.height ,Math.floor(Math.random() * canvas1.width)]
    ];
}

Tom.prototype.displayRandomTom = function(){
    var index = Math.floor(Math.random() * this.tomRandomArray.length);
    return this.tomRandomArray[index];
}

Tom.prototype.createTom = function(valX, valY){
    if(flag === 1){
        this.tomArray.push({
            x: valX,
            y: valY,
            w: 30,
            h: 30,
            vx: 2,
            vy: 2
        });
    }
    if(flag === 2){
        this.tomArray.push({
            x: valX,
            y: valY,
            w: 40,
            h: 40,
            vx: 6,
            vy: 6
        });
    }
    if(flag === 3){
        this.tomArray.push({
            x: valX,
            y: valY,
            w: 50,
            h: 50,
            vx: 10,
            vy: 6
        });
    }
    this.tomCounter +=1;
};

Tom.prototype.drawImage = function(cheese){
    ctx.drawImage(tomImage, cheese.x, cheese.y, 50, 50);
}

Tom.prototype.draw = function(){
    this.tomArray.forEach(this.drawImage.bind(this));
}

Tom.prototype.move = function(){
    this.tomArray.forEach(function(tomTab){
        tomTab.x += tomTab.vx;
        tomTab.y += tomTab.vy;

        if(tomTab.y + tomTab.vy > canvas1.height || tomTab.y + tomTab.vy < 0){  
            tomTab.vy *= -1;
        }
        if(tomTab.x + tomTab.vx > canvas1.width || tomTab.x + tomTab.vx < 0){
            tomTab.vx *= -1;
        }
    })
}
