function hammersort(){
    const hammerkeys = activeKeys.filter((key)=>key.length===1);
    console.log(hammerkeys);
    const arr = new Array(hammerkeys.length).fill(0);
    console.log(arr);
    for(let i = 0; i < hammerkeys.length; i++){
        const row = Math.floor(hammerkeys.length/(hammerkeys.length/4))
        console.log('letter:',hammerkeys[i]);
        console.log('row',row);
    }
}

hammersort();