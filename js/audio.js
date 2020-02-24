class Audio{
    constructor(){
        this.muted = true;
        this.audio = {
            bell: document.querySelector('#bell'),
            singlekey: document.querySelector('#single-key'),
            multikey: document.querySelector('#multi-key'),
            zip: document.querySelector('#zip')
        }
        this.volumeButton = document.querySelector('#volume-button');
        this.volumeButton.addEventListener('click',this.toggleMute)
    }
    toggleMute = () => {
        console.log('toggling mute!');
        this.muted = ! this.muted;
        this.volumeButton.style.color = this.muted ? "gray": "white";
    }
    ding = () => {
        if(!this.muted){
            this.audio.bell.play();
        }
    }
    zip = () => {
        if(!this.muted){
            this.audio.zip.play();
        }
    }
    type = (timeSinceLastKeyStroke) => {
        if(!this.muted){
            this.audio.singlekey.play();
            // if(this.timeSinceLastKeyStroke < 100){
            //     this.audio.multikey.play();
            // } else {
            //     this.audio.singlekey.play();
            // }
        }
    }
}