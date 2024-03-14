Quiz!

1. What is a React component?
   A function that returns React elements. (UI) It may appear to be HTML in the function in the previous components, but it's actually JSX, a format used by react
   that makes ordinary JS objects that are eventually translated into the DOM.

2. What's wrong with this code?
   Component names have to use pascal case (starting with a capital letter)

```
function myComponent() {
    return (
        <small>I'm tiny text!</small>
    )
}
```

function MyComponent() {
return (
<small>I'm tiny text!</small>
)
}

3. What's wrong with this code?

```
function Header() {
    return (
        <header>
            <nav>
                <img src="./react-logo.png" width="40px" />
            </nav>
        </header>
    )
}

ReactDOM.render(Header(), document.getElementById("root"))
```

Line 34: ReactDOM.render(<Header />, document.getElementById("root"))
You need to call a component (the function) using angle brackets. Kinda looks like a closing tag in HTML.
