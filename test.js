for (let i = 1; i <= 5; i++) {
    setTimeout(function timer() {
        console.log(i); // => 1 2 3 4 5
    }, 1000 * i)
}
