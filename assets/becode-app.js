/* 

Name : Bouzouita David 
Date : 14/11/2018
Contact information : bouzouitadavid github

becode challenge

*/

// javascript

/* **************************** */ 
// déclaration des variables du tableau sur base du tableau 1
let tabNumRow = d3.selectAll("#table1>tbody")._groups[0][0].rows.length
let tab = d3.selectAll("#table1>tbody").selectAll("td")
let tabNum = d3.selectAll("#table1>tbody").selectAll("th")
let parent = d3.selectAll("#table1>tbody").selectAll("tr")
let tabNumCell = d3.selectAll("#table1>tbody").selectAll("tr")._groups[0][1].cells.length
let tabCell = d3.selectAll("#table1>tbody").selectAll("tr")._groups[0][0].cells


/* **************************** */
// création de l'object pour le tab1
function graphiqueTab1(name, date, price){
   this.name = name,
   this.values = [{date:date, price:price}]
}


/* **************************** */
// creation de l'object avec les élement tab1
function createObject() {
// déclaration tab vide
let tabNew = [];
let tabFina = [];
// boucle pour le tour de mon tab1
for (let x = 1; x < tabNumRow; x++) {
	tabNew = [];
	time = 2; // let pour incrémantation de mon année
	name = dateYear = d3.selectAll("#table1>tbody").selectAll("tr")._groups[0][x].cells[1].innerHTML;
	dateYear = d3.selectAll("#table1>tbody").selectAll("tr")._groups[0][2].cells[3].innerHTML;
	date = d3.selectAll("#table1>tbody").selectAll("tr")._groups[0][0].cells[time++].innerHTML;
	dateYear = parseInt(dateYear)
	tabNew.push(new graphiqueTab1(name, date, dateYear))
	// boucle pour remplir mes valeurs date et price
	for (let i = 2; i < tabNumCell; i++) {
		dateYear = d3.selectAll("#table1>tbody").selectAll("tr")._groups[0][x].cells[i].innerHTML;
		dateYear = parseInt(dateYear);
		if (isNaN(dateYear) == true){
		  dateYear = 0;
		}
		date = d3.selectAll("#table1>tbody").selectAll("tr")._groups[0][0].cells[i].innerHTML;
		obj = {date : date, price : dateYear};
		val = 0;
		tabNew[val++].values.push(obj)
	}
	tabFina.push(tabNew[0])
}
console.log(tabNew)
console.log(tabFina)
}
createObject()


/* **************************** */
// AJAX appel des données et creation du tableau
function ajax() {
	tab = []
fetch('https://inside.becode.org/api/v1/data/random.json').then(response => {
  return response.json();
}).then(data => {
  // Work with JSON data here
  console.log(data);
  tab = []
	for (let i = 0; i < data.length; i++) {
		tab.push(data[i].splice(",")[1])
	}
tabAjax(tab)
}).catch(err => {
  // Do something for an error here
});
}
ajax()


/* **************************** */
// graphique pour le tableau AJAX 
function tabAjax(dataset) {
	// var dataset = [4,2,-6,13,4,8,-23,19,10,-12,2,15];
	var maxHeight=d3.max(dataset,function(d){return d});
	var w = 500;
	var h = maxHeight*10*2+100;
	var svg = d3.select(".container").append("svg").attr("width",w).attr("height",h);
	
	var barpadding = 2;
	var bars = svg.selectAll("rect").data(dataset).enter().append("rect");
	bars.attr("x",function(d,i){
			  return i*(w/dataset.length);
			  })
	.attr("y",function(d){
		if(d>0){
			return h/2-10*d;
		}
		else{
			return h/2
		}
	})//for bottom to top
	.attr("width", w/dataset.length-barpadding)
	.attr("height", function(d){
		return Math.abs(10*d);
	});
	bars.attr("fill",function(d){
		if(d<0){
			return "orange";
		}
		else{
			return "green";
		}
		//return "rgb(0,"+Math.abs(d*10)+",0)"
	});
	
	//add tag to every bar chart
	var tags = svg.selectAll("text").data(dataset).enter().append("text").text(function(d){
		return d;
	});
	tags.attr("x",function(d,i){
			  return i*(w/dataset.length)+13;
			  })
	.attr("y",function(d){
		if(d>0){
			return h/2-10*d+15;
		}
		else{
			return h/2+10*Math.abs(d)-5;
		}
	})//for bottom to top
	.attr("fill","white");	
}



/* **************************** */ 
// recupérer le numéro en fonction du nom de pays
function getPays(name) {
  let element = document.querySelector("#table1>tbody")
  element.addEventListener("click", function(){
	console.log(event.target)
  });
}


/* **************************** */
// creation du graphique pour la tableau 1

// en préparation d'un rajout de graphique
makeDraw()
drawChart(makeTab(2))
drawChart(makeTab(4))

function makeDraw(){
	var width = 500;
	var height = 300;
	var margin = 50;
 /* Add SVG */
 var svg = d3.select("#bodyContent").select("h3").append("svg")
   .attr("width", (width+margin)+"px")
   .attr("height", (height+margin)+"px")
   .attr("style", "overflow:visible")
   .append('g')
   .attr("transform", `translate(${margin}, ${margin})`);
	
}
function drawChart(data){
	var width = 500;
	var height = 300;
	var margin = 50;
 var duration = 250;
 
 var lineOpacity = "0.25";
 var lineOpacityHover = "0.85";
 var otherLinesOpacityHover = "0.1";
 var lineStroke = "1.5px";
 var lineStrokeHover = "2.5px";
 
 var circleOpacity = '0.85';
 var circleOpacityOnLineHover = "0.25"
 var circleRadius = 3;
 var circleRadiusHover = 6;
 
 
 /* Format Data */
 var parseDate = d3.timeParse("%Y");
 data.forEach(function(d) { 
   d.values.forEach(function(d) {
	 d.date = parseDate(d.date);
	 d.price = +d.price;    
   });
 });
 

 /* Scale */
 var xScale = d3.scaleTime()
   .domain(d3.extent(data[0].values, d => d.date))
   .range([0, width-margin]);
 var yScale = d3.scaleLinear()
   .domain([0, d3.max(data[0].values, d => d.price)])
   .range([height-margin, 0]);
 
 var color = d3.scaleOrdinal(d3.schemeCategory10);
 
 var svg = d3.select("#bodyContent").select("svg")
 /* Add line into SVG */
 var line = d3.line()
   .x(d => xScale(d.date))
   .y(d => yScale(d.price));
 
 let lines = svg.append('g')
   .attr('class', 'lines');
 
 lines.selectAll('.line-group')
   .data(data).enter()
   .append('g')
   .attr('class', 'line-group')  
   .on("mouseover", function(d, i) {
	   svg.append("text")
		 .attr("class", "title-text")
		 .style("fill", color(i))        
		 .text(d.name)
		 .attr("text-anchor", "middle")
		 .attr("x", (width-margin)/2)
		 .attr("y", 5);
	 })
   .on("mouseout", function(d) {
	   svg.select(".title-text").remove();
	 })
   .append('path')
   .attr('class', 'line')  
   .attr('d', d => line(d.values))
   .style('stroke', (d, i) => color(i))
   .style('opacity', lineOpacity)
   .on("mouseover", function(d) {
	   d3.selectAll('.line')
				.style('opacity', otherLinesOpacityHover);
	   d3.selectAll('.circle')
				.style('opacity', circleOpacityOnLineHover);
	   d3.select(this)
		 .style('opacity', lineOpacityHover)
		 .style("stroke-width", lineStrokeHover)
		 .style("cursor", "pointer");
	 })
   .on("mouseout", function(d) {
	   d3.selectAll(".line")
				.style('opacity', lineOpacity);
	   d3.selectAll('.circle')
				.style('opacity', circleOpacity);
	   d3.select(this)
		 .style("stroke-width", lineStroke)
		 .style("cursor", "none");
	 });
 
 
 /* Add circles in the line */
 lines.selectAll("circle-group")
   .data(data).enter()
   .append("g")
   .style("fill", (d, i) => color(i))
   .selectAll("circle")
   .data(d => d.values).enter()
   .append("g")
   .attr("class", "circle")  
   .on("mouseover", function(d) {
	   d3.select(this)     
		 .style("cursor", "pointer")
		 .append("text")
		 .attr("class", "text")
		 .text(`${d.price}`)
		 .attr("x", d => xScale(d.date) + 5)
		 .attr("y", d => yScale(d.price) - 10);
	 })
   .on("mouseout", function(d) {
	   d3.select(this)
		 .style("cursor", "none")  
		 .transition()
		 .duration(duration)
		 .selectAll(".text").remove();
	 })
   .append("circle")
   .attr("cx", d => xScale(d.date))
   .attr("cy", d => yScale(d.price))
   .attr("r", circleRadius)
   .style('opacity', circleOpacity)
   .on("mouseover", function(d) {
		 d3.select(this)
		   .transition()
		   .duration(duration)
		   .attr("r", circleRadiusHover);
	   })
	 .on("mouseout", function(d) {
		 d3.select(this) 
		   .transition()
		   .duration(duration)
		   .attr("r", circleRadius);  
	   });
 
 
 /* Add Axis into SVG */
 var xAxis = d3.axisBottom(xScale).ticks(5);
 var yAxis = d3.axisLeft(yScale).ticks(5);
 
 svg.append("g")
   .attr("class", "x axis")
   .attr("transform", `translate(0, ${height-margin})`)
   .call(xAxis);
 
 svg.append("g")
   .attr("class", "y axis")
   .call(yAxis)
   .append('text')
   .attr("y", 15)
   .attr("transform", "rotate(-90)")
   .attr("fill", "#000")
   .text("Total values");
	  }


/* **************************** */ 
// function qui crée le tableau qui prend en argument le numéro du pays a afficher sinon tous
function makeTab(pays) {
	// déclaration tab vide
  let tabNew = [];
  // boucle pour le tour de mon tab1
	  time = 0
	  name = dateYear = d3.selectAll("#table1>tbody").selectAll("tr")._groups[0][pays].cells[1].innerHTML;
	  dateYear = d3.selectAll("#table1>tbody").selectAll("tr")._groups[0][2].cells[3].innerHTML;
	  date = d3.selectAll("#table1>tbody").selectAll("tr")._groups[0][0].cells[2].innerHTML;
	  console.log(date)
	  dateYear = parseInt(dateYear)
	  tabNew.push(new graphiqueTab1(name, date, dateYear))
	  
	  // boucle pour remplir mes valeurs date et price
	  for (let i = 2; i < tabNumCell; i++) {
		  dateYear = d3.selectAll("#table1>tbody").selectAll("tr")._groups[0][pays].cells[i].innerHTML;
		  //console.log(dateYear)
		  dateYear = parseInt(dateYear)
		  if (isNaN(dateYear) == true){
			dateYear = 0
		  }
		  //console.log(dateYear)
		  date = d3.selectAll("#table1>tbody").selectAll("tr")._groups[0][0].cells[i].innerHTML;
		  obj = {date : date, price : dateYear}
		  val = 0
		  tabNew[val++].values.push(obj)
	  }
	  return tabNew
  }