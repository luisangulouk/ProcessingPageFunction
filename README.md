# Technical challenge

## Run the test

open index.html on google Chrome, browser must support Async and error functions 

## Results

1. `getProcessingPage(data)` returns a promise, since data contain asynchronous tasks(pages), the final value will be produced after a set of task(some might take 2 sec) are excecuted. For that reason we need to listen for the result 
on `.then` 

`getProcessingPage(data).then(response => console.log(response))`




