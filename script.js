    let Ball = function (xBall, yBall, widthBall, heightBall, speed, corner) {
        this.xBall = xBall;
        this.yBall = yBall;
        this.widthBall = widthBall;
        this.heightBall = heightBall;
        this.imageBall = document.getElementById("ballImage");
        this.ctx = document.getElementById("boardCanvas").getContext("2d")
        this.speed = speed;
        this.corner = corner;

        this.getWidthBall = function () {
            return this.widthBall;
        }
        this.getHeightBall = function () {
            return this.heightBall;
        }
        this.getXBall = function () {
            return this.xBall;
        }
        this.getYBall = function () {
            return this.yBall;
        }
        this.getImageBall = function () {
            return this.imageBall;
        }
        this.getSpeedBall = function () {
            return this.speed;
        }
        this.getCornerBall = function () {
            return this.corner;
        }
        this.startGame = function () {
            this.ctx.drawImage(this.imageBall,this.xBall,this.yBall,this.widthBall,this.heightBall);
        }
    }

    let Bar = function (xBar, yBar, widthBar, heightBar) {
        this.xBar = xBar;
        this.yBar = yBar;
        this.widthBar = widthBar;
        this.heightBar = heightBar;

        this.getWidthBar = function () {
            return this.widthBar;
        }
        this.getHeightBar = function () {
            return this.heightBar;
        }
        this.getXBar = function () {
            return this.xBar;
        }
        this.getYBar = function () {
            return this.yBar;
        }

        this.moveBarRight = function () {
            this.xBar += 10;
            ctx.clearRect(this.xBar - this.widthBar/2 - 10,this.yBar - this.heightBar/2,this.widthBar,this.heightBar);
            ctx.fillRect(this.xBar - this.widthBar/2,this.yBar - this.heightBar/2,this.widthBar,this.heightBar);
        }
        this.moveBarLeft = function (){
            this.xBar -= 10;
            ctx.clearRect(this.xBar - this.widthBar/2 + 10,this.yBar - this.heightBar/2,this.widthBar,this.heightBar);
            ctx.fillRect(this.xBar - this.widthBar/2,this.yBar - this.heightBar/2,this.widthBar,this.heightBar);
        }
        this.drawBar = function (ctx) {
            ctx.fillStyle = "#000099";
            ctx.fillRect(this.xBar - this.widthBar/2,this.yBar - this.heightBar/2,this.widthBar,this.heightBar);
        }

    }

    let Box = function (xBox,yBox,widthBox,heightBox) {
        this.xBox = xBox;
        this.yBox = yBox;
        this.widthBox = widthBox;
        this.heightBox = heightBox;

        this.getWidthBox = function () {
            return this.widthBox;
        }
        this.getHeightBox = function () {
            return this.heightBox;
        }
        this.getXBox = function () {
            return this.xBox;
        }
        this.getYBox = function () {
            return this.yBox;
        }

        this.drawBox = function (ctx) {
            ctx.fillStyle = "#000099";
            ctx.fillRect(this.xBox - this.widthBox/2,this.yBox - this.heightBox/2,this.widthBox,this.heightBox);
        }
    }


    let ctx = document.getElementById("boardCanvas").getContext("2d");
    let imageBall = document.getElementById("ballImage");
    let xBall = 150;
    let yBall = 250;
    let score = 0;

    let ball = new Ball(xBall,yBall,20,20,3,45);
    let bar = new Bar(250,400,100,10);

    let heightBall = ball.getHeightBall();
    let corner = ball.getCornerBall();
    let connerY = (Math.sin(corner)/Math.sin(90 - corner));
    let speedX = ball.getSpeedBall();
    let speedY = speedX*connerY;

    let xBar = bar.getXBar();
    let yBar = bar.getYBar();
    let widthBar = bar.getWidthBar();
    let heightBar = bar.getHeightBar();

    bar.drawBar(ctx);
    let setIntervalBall = null

    function ballMove(){
        xBall += speedX;
        yBall += speedY;
        ctx.clearRect(xBall-speedX,yBall-speedY,20,20);
        ctx.drawImage(imageBall,xBall,yBall,20,20);
        checkImpactBallBorder();
        checkImpactBallBar();
        checkImpactBallBox();
    }

    function checkImpactBallBorder() {
        if ( xBall <= 0 || xBall >= 480){
            speedX = -speedX;
        }else if ( yBall <= 0){
            speedY = -speedY;
        }else if (yBall >= 480){
            checkGameOver();
        }
    }

    function checkImpactBallBar() {
        xBar = bar.getXBar();
        yBar = bar.getYBar();
        if ((yBall - heightBall/2) > (yBar - heightBar/2 - Math.abs(speedX))){
        }else if (xBall >= xBar - widthBar/2 && xBall <= xBar + widthBar/2){
            if ((yBall + heightBall) >= (yBar - heightBar/2 - Math.abs(speedX))){
                speedY = -speedY;
            }
        }
    }

    let multipleBox = [];
    drawMultipleBox();
    window.onload = createMultipleBox();
    function createMultipleBox() {
        let yBox = 15;
        for (let i = 0; i < 3; i++){
            for (let count = 1; count <= 11; count += 2){
                let xBox = 41*count;
                let box = new Box(xBox, yBox, 70, 20);
                multipleBox.push(box);
                box.drawBox(ctx);
            }
            yBox += 30;
        }
    }
    function drawMultipleBox() {
        for (let count = 0; count < multipleBox.length;count++){
            multipleBox[count].drawBox(ctx);
        }
    }
    function checkImpactBallBox(){
        for (let i = 0; i < multipleBox.length;i++){
            let xBox = multipleBox[i].getXBox();
            let yBox = multipleBox[i].getYBox();
            let widthBox = multipleBox[i].getWidthBox();
            let heightBox = multipleBox[i].getHeightBox();
            if (xBall >= xBox - widthBox/2 && xBall <= xBox + widthBox/2){
                if (yBall < (yBox + heightBox/2 + 1)){
                    multipleBox.splice(i,1);
                    speedY = -speedY;
                    ctx.clearRect(0,0,500,300);
                    drawMultipleBox();
                    score++;
                    document.getElementById("score").innerHTML = "Score : " + score;
                }
            }
        }
    }
    function keydownHandler(event) {
        switch (event.which) {
            case 37:
                if (xBar - widthBar/2 > 0){
                    bar.moveBarLeft();
                }
                break;
            case 39:
                if (xBar + widthBar/2 < 500){
                    bar.moveBarRight();
                }
                break;
        }
    }
    function checkGameOver() {
        clearInterval(setIntervalBall);
        alert("GAME OVER !!! Bạn đạt được : " + score + " điểm");
        if (confirm("Bạn có muốn chơi lại")){
            location.reload(true);
            document.getElementById("startgame").hidden = false;
        }
    }
    function startGame(){
        setIntervalBall = setInterval(ballMove,20);
        document.getElementById("startgame").hidden = true;
    }