class SpawnButton{
    constructor(){
        this.button1 = createButton("Treatment");
        this.button2 = createButton("Soilder");     
        this.button3 = createButton("How To Play???")  ;
        this.button4 = createButton("Reset");
        this.button5 = createButton("Up");
        this.button6 = createButton("Right");
        this.button7 = createButton("Down");
        this.button8 = createButton("Left");
        this.button9 = createButton("Shoot");
    }
    display(){
        this.button1.position(50, 20);
        this.button2.position(135, 20); 
        this.button3.position(Width/2, 20);
        this.button4.position(Width - 70, Height - 40);
        this.button5.position(Width - Width/5 + 8, Height - 100);
        this.button6.position(Width - Width/5 - 50, Height - 100 + 25);
        this.button7.position(Width - Width/5, Height - 100 + 50);
        this.button8.position(Width - Width/5 + 50, Height - 100 + 25);
        this.button9.position(Width - 70, Height - 100);
        
        this.button1.mousePressed(() => {
            treatment.Status = "spawntreatment";
        })

        this.button2.mousePressed(() => {
            if(treatment.x !== 0, treatment.y !== -100){
                soilder.Status = "spawnSoilder";
            }
        })   
        this.button3.mousePressed(() => {
            howToPlay = "show";
        }) 
        this.button4.mousePressed(() => {
            window.location.reload();
        })  

        this.button5.mousePressed(() => {
            soilder.MoveSoilderUp();
            soilder.tDierection = "up";
        })
        this.button6.mousePressed(() => {
            soilder.MoveSoilderLeft();
            soilder.tDierection = "left";
        })
        this.button7.mousePressed(() => {
            soilder.MoveSoilderDown();
            soilder.tDierection = "down";
        })
        this.button8.mousePressed(() => {
            soilder.MoveSoilderRight();
            soilder.tDierection = "right";
        })

        this.button9.mousePressed(() => {
            bullet.Status = "shootSetup";
            if(gameState === "play"){
              bulletSound.play();
            }
        })
    }
}