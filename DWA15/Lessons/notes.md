ReactDOM.render(<h1>Hello, everyone!</h1>, document.getElementById("root"));


ReactDOM.render(<ul><li>Item 1</li><li>Item 2</li></ul>, getElementById("root"))


function MainContent() {
    return (
        <h1>I'm learning React!</h1>
    )
}
ReactDOM.render(
    <div>
        <Navbar />
        <MainContent />
    </div>,
    document.getElementById("root")
)


// ReactDOM.render(<h1>Hello, React!</h1>, document.getElementById("root"))

/* 
Challenge - recreate the above line of code in vanilla JS by creating and
appending an h1 to our div#root (without using innerHTML).

- Create a new h1 element
- Give it some textContent
- Give it a class name of "header"
- append it as a child of the div#root
    
*/
const h1 = document.createElement("h1")
h1.textContent = "This is an imperative way to program"
h1.className = "header"
document.getElementById("root").append(h1)

/*
What is JSX - JavaScriptXML, makes React imperative, but changes some of the HTML rules. 
React is using JSX and creating ordinary JS objects and those objects describe the DOM element that we want React to put onto the page for us. 
*/

// JSX Incorrect; there must be only one parent
ReactDOM.render(
    <h1 className="header">This is JSX</h1><p>This is a paragraph</p>, 
    document.getElementById("root")
)

//Corrected
ReactDOM.render(
    <div>
        <h1 className="header">This is JSX</h1>
        <p>This is a paragraph</p>
    </div>,
    document.getElementById("root")
)

// You can save a bunch of JSX into a variable and use that variable because what I'm getting back is just a JS object
const page = (
    <div>
        <h1 className="header">This is JSX</h1>
        <p>This is a paragraph</p>
    </div>
)

console.log(page)

ReactDOM.render(
    page,
    document.getElementById("root")
)

/* Challenge: 

Create a navbar in JSX:
    - Use the semantic `nav` element as the parent wrapper
    - Have an h1 element with the brand name of your "website"
    - Insert an unordered list for the other nav elements
        - Inside the `ul`, have three `li`s for "Pricing",
        "About", and "Contact"
    - Don't worry about styling yet - it'll just be plain-looking HTML for now
*/

const navbar = (
    <nav>
        <h1>Brand Name</h1>
        <ul>
            <li>Pricing</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
    </nav>
)

ReactDOM.render(navbar, document.getElementById("root"))

/* 
If we're using Babel standalone, which is the quick version of setting up Babel, we can use https://app.netlify.com/drop to generate a link for our website
to share with others.
*/

// We're now using React 18 which changes some formatting:

// Usually displayed like this as there are more methods to do on the root than just .render
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(navbar)

// ReactDOM.render(navbar, document.getElementById("root"))
ReactDOM.createRoot(document.getElementById("root")).render(navbar)

// Thought experiment: use .append() instead of ReactDOM.render()?
import React from "react"
import ReactDOM from "react-dom"

/**
Challenge: fix our code!

Don't forget, you're not using CDNs anymore, so there's no
global "ReactDOM" variable to use anymore.
 */

const page = (
    <div>
        <h1>My awesome website in React</h1>
        <h3>Reasons I love React</h3>
        <ol>
            <li>It's composable</li>
            <li>It's declarative</li>
            <li>It's a hireable skill</li>
            <li>It's actively maintained by skilled people</li>
        </ol>
    </div>
)

ReactDOM.render(page, document.getElementById("root"))
// document.getElementById("root").append(JSON.stringify(page))

