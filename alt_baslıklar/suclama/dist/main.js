  ////////////////////////////////////////////////////////////
  //////////////////////// Set-Up ////////////////////////////
  ////////////////////////////////////////////////////////////

  var margin = {left:90, top:90, right:90, bottom:90},
    width =  1900 - margin.left - margin.right, // more flexibility: Math.min(window.innerWidth, 1000)
    height =  1900 - margin.top - margin.bottom, // same: Math.min(window.innerWidth, 1000)
    innerRadius = Math.min(width, height) * .39,
    outerRadius = innerRadius * 1.1;

    var names = ["10 yaşındaki bireyler","11 yaşındaki bireyler","12 yaşındaki bireyler","13 yaşındaki bireyler","Cinsiyeti erkek olan bireyler","Cinsiyeti kız olan bireyler", "5.sınıfa giden bireyler","6.sınıfa giden bireyler","7.sınıfa giden bireyler","8.sınıfa giden bireyler","LOL oynayan bireyler","PUBG oynayan bireyler","Valorant oynayan bireyler","CS-GO oynayan bireyler","Not ortlaması 78'den düşük bireyler","Not ortlaması 78'den yüksek bireyler","Ankara'da yaşayan bireyler","İstanbul'da yaşayan bireyler","Konya'da yaşayan bireyler","kahramanmaraş'ta yaşayan bireyler","Gözlük kullanan bireyler","Gözlük kullanmayan bireyler","Ebeveynleri evli olan bireyler","Ebeveynleri ayrı olan bireyler"]
    colors = ["#301E1E", "#083E77", "#342350", "#567235", "#8B161C", "#DF7C00", "#00FAE1","#D609E5","#F21C1C","#FA01B0","#C712DB","#760FFC","#040CF5","#7DB5F5","#04F776","#05B658","#69B24A","#838376","#FFFF00","#FF9A00","#FFB1A8","#FF1B01","#7AAB70","#06979C","#7674B9","#B280EB","#64355A","#469A81","#239F40","#77EE92","#77EE92","#0D0321"]
    opacityDefault = 0.8;

  var matrix = [
    [0,0,0,0,8,0,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //"10 yaşındaki bireyler"
    [0,0,0,0,4,1,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //"11 yaşındaki bireyler"
    [0,0,0,0,1,3,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //"12 yaşındaki bireyler"
    [0,0,0,0,3,4,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //"13 yaşındaki bireyler"
    [8,5,1,0,0,0,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //"Cinsiyeti erkek olan bireyler"
    [0,1,2,0,16,8,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //"Cinsiyeti kız olan bireyler"
    [8,0,0,0,8,0,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //"5.sınıfa giden bireyler"
    [0,6,0,0,5,1,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //"6.sınıfa giden bireyler"
    [0,0,4,0,1,3,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //"7.sınıfa giden bireyler"
    [0,0,0,6,2,4,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //"8.sınıfa giden bireyler"
    [3,2,1,2,5,2,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //"LOL oynayan bireyler"
    [1,1,1,0,3,2,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //"PUBG oynayan bireyler"
    [2,2,0,2,5,2,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //"Valorant oynayan bireyler"
    [2,1,2,3,4,2,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //"CS-GO oynayan bireyler"
    [3,4,1,3,10,3,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //Not ortlaması 78'den düşük bireyler"
    [5,2,3,3,7,5,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //Not ortlaması 78'den yüksek bireyler"
    [2,3,2,2,5,2,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //"Ankara'da yaşayan bireyler"
    [1,2,0,2,3,2,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //"İstanbul'da yaşayan bireyler"
    [2,1,0,2,3,2,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //"Konya'da yaşayan bireyler"
    [3,0,0,0,6,2,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //"Kahramanmaraş'ta yaşayan bireyler"
    [4,2,0,4,10,4,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //"Gözlük kullanan bireyler"
    [4,4,2,2,7,4,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //"Gözlük kullanmayan bireyler"
    [6,5,2,5,12,8,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //"Ebeveynleri evli olan bireyler"
    [2,1,0,1,4,0,4,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //"Ebeveynleri evli olmayan bireyler"
   ];

  ////////////////////////////////////////////////////////////
  /////////// Create scale and layout functions //////////////
  ////////////////////////////////////////////////////////////

  var colors = d3.scaleOrdinal()
      .domain(d3.range(names.length))
    .range(colors);

  var chord = d3.chord()
    .padAngle(.15)
    .sortChords(d3.descending)

    var arc = d3.arc()
    .innerRadius(innerRadius*1.01)
    .outerRadius(outerRadius);

  var path = d3.ribbon()
  .radius(innerRadius);

////////////////////////////////////////////////////////////
////////////////////// Create SVG //////////////////////////
////////////////////////////////////////////////////////////

var svg = d3.select("#chart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + (width/2 + margin.left) + "," + (height/2 + margin.top) + ")")
  .datum(chord(matrix));

////////////////////////////////////////////////////////////
////////////////// Draw outer Arcs /////////////////////////
////////////////////////////////////////////////////////////

var outerArcs = svg.selectAll("g.group")
  .data(function(chords) { return chords.groups; })
  .enter().append("g")
  .attr("class", "group")
  .on("mouseover", fade(.1))
  .on("mouseout", fade(opacityDefault))

  // text popups
  .on("click", mouseoverChord)
  .on("mouseout", mouseoutChord);

outerArcs.append("path")
  .style("fill", function(d) { return colors(d.index); })
  .attr("d", arc);

////////////////////////////////////////////////////////////
////////////////////// Append names ////////////////////////
////////////////////////////////////////////////////////////

//Append the label names on the outside
outerArcs.append("text")
  .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
  .attr("dy", ".35em")
  .attr("class", "titles")
  .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
  .attr("transform", function(d) {
    return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
    + "translate(" + (outerRadius + 10) + ")"
    + (d.angle > Math.PI ? "rotate(180)" : "");
  })
  .text(function(d,i) { return names[i]; });


////////////////////////////////////////////////////////////
////////////////// Draw inner chords ///////////////////////
////////////////////////////////////////////////////////////

svg.selectAll("path.chord")
  .data(function(chords) { return chords; })
  .enter().append("path")
  .attr("class", "chord")
  .style("fill", function(d) { return colors(d.source.index); })
  .style("opacity", opacityDefault)
  .attr("d", path);

////////////////////////////////////////////////////////////
////////////////// Extra Functions /////////////////////////
////////////////////////////////////////////////////////////

function popup() {
  return function(d,i) {
    console.log("love");
  };
}//popup

//Returns an event handler for fading a given chord group.
function fade(opacity) {
  return function(d,i) {
    svg.selectAll("path.chord")
        .filter(function(d) { return d.source.index != i && d.target.index != i; })
    .transition()
        .style("opacity", opacity);
  };
}//fade

  //Highlight hovered over chord
function mouseoverChord(d,i) {

  //Decrease opacity to all
  svg.selectAll("path.chord")
    .transition()
    .style("opacity", 0.1);
  //Show hovered over chord with full opacity
  d3.select(this)
    .transition()
        .style("opacity", 1);

  //Define and show the tooltip over the mouse location
  $(this).popover({
    //placement: 'auto top',
    title: 'test',
    placement: 'right',
    container: 'body',
    animation: false,
    offset: "20px -100px",
    followMouse: true,
    trigger: 'click',
    html : true,
    content: function() {
      return "<p style='font-size: 11px; text-align: center;'><span style='font-weight:900'>"  +
           "</span> text <span style='font-weight:900'>"  +
           "</span> folgt hier <span style='font-weight:900'>" + "</span> movies </p>"; }
  });
  $(this).popover('show');
}
//Bring all chords back to default opacity
function mouseoutChord(d) {
  //Hide the tooltip
  $('.popover').each(function() {
    $(this).remove();
  })
  //Set opacity back to default for all
  svg.selectAll("path.chord")
    .transition()
    .style("opacity", opacityDefault);
  }      //function mouseoutChord
  