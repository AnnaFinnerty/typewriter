class Typewriter{
    constructor(){
        this.input = new Input(this.type,this.nextLine,this.depressKey,this.tab,this.nextPage);
        this.audio = new Audio(); 
        this.typewriter = document.getElementById('typewriter').getSVGDocument();
        this.charWidth = 5;
        this.currentPos = 0;
        this.paperHeight = 1;
        this.movableOnType = this.typewriter.getElementById('layer18');
        this.paper = this.typewriter.getElementById('paper');
        this.ribbon = this.typewriter.getElementById('ribbon');
        this.handle = this.typewriter.getElementById('handle');
        this.currentText = "";
        this.currentLine = 0;
        this.currentChar = 0;
        this.maxChars = 14;
        this.currentPage = [];
        this.maxLinesOnPages = 15;
        this.keys = {}
        this.hammers = {}
        this.textLines = [];
        this.autoTypeInterval = null;
        this.isAutoTyping = false;
        this.awake();
    }
    awake(){
        this.handle.addEventListener('click',()=>this.nextPage())
        //find keysObjs and hammerObjs in svg and store ref and position calc in keys obj
        for(let i = 0; i < activeKeys.length; i++){
            const keyObj = this.typewriter.getElementById(activeKeys[i]+"-key");
            this.keys[activeKeys[i]] = {};
            this.keys[activeKeys[i]]['obj'] = keyObj;
            if(activeKeys[i].length === 1){
                const transform = keyObj.getAttribute("transform").split(",");
                const keyX = Number(transform[0].split("(")[1]);
                const keyY = Number(transform[1].split(")")[0]);
                this.keys[activeKeys[i]]['pos'] = {
                    x: keyX,
                    y: keyY
                }
            } 
            
            try{
                const hammerObj = this.typewriter.getElementById(activeKeys[i]+"-hammer");
                this.hammers[activeKeys[i]] = {};
                this.hammers[activeKeys[i]]['obj'] = hammerObj;
                const hTransform = hammerObj.getAttribute("transform").split(",");
                const hammerX = Number(hTransform[0].split("(")[1]);
                const hammerY = Number(hTransform[1].split(")")[0]);
                this.hammers[activeKeys[i]]['pos'] = {
                    x: hammerX,
                    y: hammerY
                }
            }catch(e){}
        }

        //store location text lines on paper, set text and color
        for(let i = 0; i < this.maxLinesOnPages; i++){
            const textObj = this.typewriter.getElementById('text'+i).firstChild;
            //remove filler content (not need for code but useful for SVG placement)
            textObj.textContent = "";
            textObj.style.fontFamily = "'Special Elite', 'Courier',serif";
            textObj.style.textSize = "12px";
            textObj.style.fill = "black";
            textObj.style.stroke = "black";
            this.textLines.push(textObj)
        }

        this.centerX = window.innerWidth/2;
        this.centerY = window.innerHeight/2 - 40;
       
        this.paperMin = 40;
        this.currentPos = this.paperMin;
        const width = Number(this.paper.getAttribute("width"));
        //temp fix until correct way of getting offset can be determined
        this.paperMax = this.paperMin + width * -1;
        this.movableOnType.style.transform = "translate("+this.currentPos+"px,0)";
        this.startRoutine();
    }
    startRoutine = () => {
        this.autoType("ttype to start");
    }
    autoType = (message) => {
        this.isAutoTyping = true;
        const messageLen = message.length;
        let counter = 0;
        this.autoTypeInterval = setInterval(()=>{
            if(counter < messageLen - 1){
                counter++;
                this.type(message[counter]);
            } else {
                this.clearAutoType();
            }
        },500)
    }
    type = (key,time) => {
        //MTC use time to play sound
        this.currentText += key;
        this.print(this.currentText);
        this.audio.type(time);
        if(this.currentChar - 1 <= this.maxChars){
            //print key if the end of line hasn't been reached
            this.currentChar += 1;
            this.currentPos -= this.charWidth;
            this.depressKey(key);
            this.print(this.currentText);
            //translate moveable type container to new position
            this.movableOnType.style.transform = "translate("+this.currentPos+"px,0)";
        } else {
            //reset line if end of line has been reached
            this.currentChar = 0;
            this.currentPos = this.paperMin;
            this.nextLine();
        }
        
    }
    depressKey = (key) => {
        key = key.toLowerCase();
        if(this.keys[key]){
            const keyObj = this.keys[key]['obj'];
            const keyPos = this.keys[key]['pos'];
            //offset height 
            const offsetY = keyPos.y+3
            let hammerObj = null;
            //check for the hammer
            if(this.hammers[key]){
                hammerObj = this.hammers[key]['obj'];
                if(hammerObj){
                    hammerObj.style.opacity = 0;
                }
                
            } 
            //offset key
            keyObj.style.transform = "translate("+keyPos.x+"px,"+offsetY+"px)";
            this.ribbon.style.opacity = 1;
            setTimeout(()=>{
                //after timeout, return key to default position
                keyObj.style.transform = "translate("+keyPos.x+"px,"+keyPos.y+"px)";
                this.ribbon.style.opacity = 0;
                if(hammerObj){
                    hammerObj.style.opacity = 1;
                }
            },100)
        } 
        
    }
    nextLine = () => {
        this.clearAutoType();
        this.audio.ding();
        const textOffset = this.currentPos * this.charWidth;
        this.currentPos = this.paperMin;
        this.movableOnType.style.transform = "translate("+this.currentPos+"px,0)";
        this.paperHeight += .1;
        this.currentPage.push(this.currentText);
        this.currentText = "";
        if(this.currentLine + 1 >= this.maxLinesOnPages){
            this.paper.style.transform = "translate(0px,"+-8*(this.currentLine)+"px)";
            this.currentLine = 0;
            this.nextPage();
        } else {
            this.currentLine += 1;
            this.paper.style.transform = "translate(0px,"+-8*(this.currentLine)+"px)";
        }
    }
    nextPage = () => {
        this.currentChar = 0;
        this.currentPos = this.paperMin;
        this.clearAutoType();
        this.audio.zip(); 
        for(let i = 0; i < this.textLines.length; i++){
            this.textLines[i].textContent = "";
        }
        this.nextLine();
    }
    tab = (timeSinceLastKeyStroke) => {
        this.clearAutoType();
        this.currentText += "   ";
        this.depressKey('tab');
        this.currentChar += 3;
        this.currentPos -= 3*this.charWidth;
        this.movableOnType.style.transform = "translate("+this.currentPos+"px,0)";
    }
    print = (text) => {
        //select active text container
        const textContainer = this.textLines[this.currentLine];
        textContainer.textContent = text;
    }
    clearAutoType = () => {
        if(this.isAutoTyping){
            clearInterval(this.autoTypeInterval)
            this.isAutoTyping = false;
            this.autoTypeInterval = null;
            this.nextPage();
        }
    }
}