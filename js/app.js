document.querySelector('#typewriter').addEventListener('load', ()=>{
    new App()
})

class App{
    constructor(){
        this.start();
    }
    start(){
        this.typewriter = new Typewriter();
    }
}
