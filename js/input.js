class Input{
    constructor(addToTextString,nextLine,depressKey,tab){
        //index of keyboard keys that create an action -- everything else gets passed to text
        this.addToTextString = addToTextString;
        this.nextLine = nextLine;
        this.depressKey = depressKey;
        this.tab = tab;
        this.timeSinceLastKeyStroke = 1000;
        this.specialKeys = {
            'Enter' : this.enter,
            'Shift' : this.shift,
            'Space' : this.space,
            'Tab': this.tab,
            'Control': this.rerouteKeyVal,
            'Alt': this.rerouteKeyVal,
            'Backspace': this.rerouteKeyVal,
            'ArrowRight': this.rerouteKeyVal,
            'ArrowLeft': this.rerouteKeyVal,
            'ArrowUp': this.rerouteKeyVal,
            'ArrowDown': this.rerouteKeyVal,
            'Meta': this.rerouteKeyVal
        }
        this.shift = false;
        this.awake();
    }
    awake(){
        console.log('app awake');
        this.typewriter = document.getElementById('typewriter').getSVGDocument();
        //add keydown clickhandler
        window.addEventListener('keydown',(e)=>{
            this.userInput(e.key)
        })
        for(let i = 0; i < activeKeys.length; i++){
            const key = this.typewriter.getElementById(activeKeys[i]+"-key");
            console.log(activeKeys[i]);
            console.log(key);
            
            key.addEventListener('click',(e)=>{
                this.clickInput(e.target.id)
            })
        }
    }
    startTimer = () => {
        this.interval = setInterval(()=>{
            this.timeSinceLastKeyStroke += 1;
        },100)
    }
    clickInput = (id) => {
        const key = id.split('-')[0];
        this.userInput(key);
    }
    userInput = (key) => {
        this.timeSinceLastKeyStroke = 0;
        if(this.specialKeys[key]){
            console.log('this is a special key!');
            const f = this.specialKeys[key];
            f(key)
        } else {
            if(this.shift){
                this.addToTextString(key.toUpperCase(),this.timeSinceLastKeyStroke);
                this.shift = false;
            } else {
                this.addToTextString(key,this.timeSinceLastKeyStroke);
            }
        }
    }
    enter = () => {
        this.nextLine();
        this.depressKey('enter');
    }
    space = () => {
        console.log('space')
        this.addToTextString(" ",this.timeSinceLastKeyStroke);
        this.depressKey('space');
    }
    tab = () => {
        this.tab(this.timeSinceLastKeyStroke);
    }
    shift = () => {
       this.shift = true;
    }
    rerouteKeyVal = (key) => {
        console.log('rerouting key val!' + key);
    }
}