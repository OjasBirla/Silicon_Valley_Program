class Treatment{
    constructor(){
        this.image = loadImage("Image/Antidote.png");

        this.Status = "";
    }
    display(){
        imageMode(CENTER);
        image(this.image, this.x, this.y, 100, 100);
    }
    spawntreatment(){
        if(treatment.Status === "spawntreatment"){
            this.x = -Width/2.1 + Width/2;
            this.y = Height/2;

            this.Status = "spawnedtreatment";
        }
    }
}