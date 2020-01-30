class App{
    constructor(){
        console.log('app running')
        this.book = [];
        this.start();
    }
    start(){
        console.log('start');
        //wait for typewriter to load
        document.querySelector('#typewriter').addEventListener('load', ()=>{
            console.log('typewriter loaded');
            this.typewriter = new Typewriter(this.addToBook);
        })
    }
    addToBook = (page) => {
        console.log('adding a new page to the book!')
        this.book.push(page);
    }
}
new App()