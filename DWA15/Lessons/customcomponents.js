/**
Challenge: 

Part 1: Create a page of your own using a custom Page component

It should return an ordered list with the reasons why you're
excited to be learning React :)

Render your list to the page

 */

import React from "react"
import ReactDOM from "react-dom"

function Page() {
    return (
        <ol>
            <li>It simplifies our use of JavaScript even further.</li>
            <li>It's the most used Framework as of date.</li>
            <li>It's likely what I'll need to be using where I work after this course.</li>
        </ol>
    )
}

ReactDOM.render(<Page />, document.getElementById("root"))