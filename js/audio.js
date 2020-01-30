class Audio{
    constructor(){
        this.muted = false;
        this.audio = {
            bell: document.querySelector('#bell'),
            singlekey: document.querySelector('#single-key'),
            multikey: document.querySelector('#multi-key'),
        }
        this.volumeButton = document.querySelector('#volume-button');
        this.volumeButton.addEventListener('click',this.toggleMute)
    }
    toggleMute = () => {
        console.log('toggling mute!');
        this.muted = ! this.muted;
    }
    ding = () => {
        if(!this.muted){
            this.audio.bell.play();
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