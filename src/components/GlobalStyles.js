import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

*{
    @import url('https://fonts.googleapis.com/css2?family=Audiowide&display=swap');
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html{
    &::-webkit-scrollbar{
        width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb{
        background-color: darkgrey;
    }
    &::-webkit-scrollbar-track {
    background: white;
  }
}
body{
    font-family: 'Audiowide', cursive;
    width: 100%;
}
h2{
    font-size: 3rem;
    font-family: Orbitron,cursive;
    font-weight: 700;
    display: flex;
    justify-content: center;
    color: darkblue;
}
h3{
    font-size: 1.3rem;
    color: #333;
    padding: 1.1rem 0rem;
}
p{
    font-size: 1.2rem;
    line-height: 200%;
    color: grey;
}
a{
    text-decoration: none;
    color: #333;
}
img {
    display: block;
}
input {
    font-weight: bold;
    font-family: 'montserrate', sans-serif;
}
/* button {
    font-size: 1.5rem;
    border: none;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background: lightblue;
    color: white;
} */
`;

export default GlobalStyles;
