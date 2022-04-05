//Use the D3 library to read in samples.json
function optionChanged(selectedID){

   //Pathing to JSON file data 
   d3.json("samples.json").then((data) => {
   d3.select("#selDataset").html("");   

   //Grab metadata array data for each item aka "ID" and append each ID to an item
   data.metadata.forEach(item => {
      d3.select ("#selDataset").append('option').attr('value', item.id).text(item.id);
      });

   //Pass the selected value through JSON for filtering
   d3.select("#selDataset").node().value = selectedID;

   //Filter metadata based on selected ID
   var metaDataID = data.metadata.filter(item=> (item.id == selectedID));


   //Advanced Challenge Assignment (Optional)

   //Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ to plot the weekly washing frequency of the individual.
   var gauge = d3.select("#gauge");
   gauge.html(""); 
   var washFrequency = metaDataID[0].wfreq;

   //Create trace for gauge chart and formatting for chart
   var guageData = [{
   domain: { x: [0, 1], y: [0, 1] },
   value: washFrequency,
   title: { text: "<b>Belly Button Washing Frequency</b><br> (Scrubs Per Week)" },
   type: "indicator",
   mode: "gauge+number",     
      gauge: {
      axis: { range: [0,9] },
      bar: { color: "#FFAC61" },
      steps: [
         { range: [0, 1], color: "#6BFFFE" },
         { range: [1, 2], color: "#5DF0EF" },
         { range: [2, 3], color: "#50E1E0" },
         { range: [3, 4], color: "#42D3D2" },
         { range: [4, 5], color: "#35C4C3" },
         { range: [5, 6], color: "#28B5B4" },
         { range: [6, 7], color: "#1AA7A6" },
         { range: [7, 8], color: "#0D9897" },
         { range: [8, 9], color: "#008A89" }
         ],
      threshold: {
      value: washFrequency
      }}}
   ];
   var gaugeLayout = {  width: 500, 
                  height: 500, 
                  margin: { t: 0, b: 0 }, 
                  };
   Plotly.newPlot('gauge', guageData, gaugeLayout); 
   })};

 //This needed to be added also so gauge would display on initial load
 optionChanged(940);
 
 //Added for consistancy
 d3.select("#selDataset").on('change',() => {
 optionChanged(d3.event.target.value);
 });