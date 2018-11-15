/* 

Name : Bouzouita David 
Date : 14/11/2018
Contact information : bouzouitadavid github

becode challenge

*/

// déclaration des variables du tableau sur base du tableau 1
let tabNumRow = d3.selectAll("#table1>tbody")._groups[0][0].rows.length
let tab = d3.selectAll("#table1>tbody").selectAll("td")
let tabNum = d3.selectAll("#table1>tbody").selectAll("th")
let parent = d3.selectAll("#table1>tbody").selectAll("tr")
let tabNumCell = d3.selectAll("#table1>tbody").selectAll("tr")._groups[0][1].cells.length
let tabCell = d3.selectAll("#table1>tbody").selectAll("tr")._groups[0][0].cells
console.log("")
console.log(tab._groups[0][2].innerHTML)
console.log(tab._groups[0][0].innerHTML)
console.log(tab._groups[0])
tabNew = [];
tabFina = [];
for (let x = 1; x < tabNumRow; x++) {
    tabNew = [];
    for (let i = 0; i < tabNumCell; i++) {
        dateYear = d3.selectAll("#table1>tbody").selectAll("tr")._groups[0][x].cells[i].innerHTML;
        tabNew.push(dateYear);
    }
    tabFina.push(tabNew)
}
console.log(tabNew)
console.log(tabFina)


// creation de l'élément svg
svg = document.createElement("svg")
document.body.appendChild(svg)



