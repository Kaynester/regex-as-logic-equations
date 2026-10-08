# The Logic of Regular Expressions

Regex → logic-gate equation + diagram. Hover '\*', '+', '?', '{n}' nodes to see their Thompson NFA substitutes.

The logic works on transforming the regex equation into a nfa state diagram and then representing that diagram as a logic gate equation, and then a logic gate diagram.

How to make it work:
Go to the command terminal and open this file directory, then type in the below commands.
npm install
npm run dev          
npm run build // or npm start


Structure: 
'src/lib' holds the pure logic (parser, equation, layout, nfa)
'src/components' holds the React UI.

Current Development flaws:
It can't handle specific frequency ranges for a particular set of inputs yet.

PS: Put a backslash before a specific symbol for it to be taken as Input. Example- /. , /{ or /}

Made by Kaynester for a college project :D

