var $ = go.GraphObject.make;

function nodeStyle() {
return [
  new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
  {
    // the Node.location is at the center of each node
    locationSpot: go.Spot.Center
  }
];
}

function makePort(name, align, spot, output, input) {
var horizontal = align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom);
// the port is basically just a transparent rectangle that stretches along the side of the node,
// and becomes colored when the mouse passes over it
return $(go.Shape,
  {
    fill: "transparent",  // changed to a color in the mouseEnter event handler
    strokeWidth: 0,  // no stroke
    width: horizontal ? NaN : 8,  // if not stretching horizontally, just 8 wide
    height: !horizontal ? NaN : 8,  // if not stretching vertically, just 8 tall
    alignment: align,  // align the port on the main Shape
    stretch: (horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical),
    portId: name,  // declare this object to be a "port"
    fromSpot: spot,  // declare where links may connect at this port
    fromLinkable: output,  // declare whether the user may draw links from here
    toSpot: spot,  // declare where links may connect at this port
    toLinkable: input,  // declare whether the user may draw links to here
    cursor: "pointer",  // show a different cursor to indicate potential link point
    mouseEnter: function(e, port) {  // the PORT argument will be this Shape
      if (!e.diagram.isReadOnly) port.fill = "rgba(255,0,255,0.5)";
    },
    mouseLeave: function(e, port) {
      port.fill = "transparent";
    }
  });
}

function textStyle() {
return {
  font: "bold 11pt Lato, Helvetica, Arial, sans-serif",
  stroke: "#F8F8F8"
}
}


// taken from ../extensions/Figures.js:
go.Shape.defineFigureGenerator("File", function(shape, w, h) {
var geo = new go.Geometry();
var fig = new go.PathFigure(0, 0, true); // starting point
geo.add(fig);
fig.add(new go.PathSegment(go.PathSegment.Line, .75 * w, 0));
fig.add(new go.PathSegment(go.PathSegment.Line, w, .25 * h));
fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
var fig2 = new go.PathFigure(.75 * w, 0, false);
geo.add(fig2);
// The Fold
fig2.add(new go.PathSegment(go.PathSegment.Line, .75 * w, .25 * h));
fig2.add(new go.PathSegment(go.PathSegment.Line, w, .25 * h));
geo.spot1 = new go.Spot(0, .25);
geo.spot2 = go.Spot.BottomRight;
return geo;
});

function makeMyDiagram(myFlowchart){
    myFlowchart.nodeTemplateMap.add("",  // the default category
$(go.Node, "Table", nodeStyle(),
  // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
  $(go.Panel, "Auto",
    $(go.Shape, "Rectangle",
      { fill: "#649da8", stroke: "#00A9C9", strokeWidth: 1.5 },
      new go.Binding("figure", "figure")),
    $(go.TextBlock, textStyle(),
      {
        margin: 8,
        maxSize: new go.Size(160, NaN),
        wrap: go.TextBlock.WrapFit,
        editable: true
      },
      new go.Binding("text").makeTwoWay())
  ),
  // four named ports, one on each side:
  makePort("T", go.Spot.Top, go.Spot.TopSide, false, true),
  makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
  makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
  makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, false)
));

myFlowchart.nodeTemplateMap.add("Conditional",
$(go.Node, "Table", nodeStyle(),
  // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
  $(go.Panel, "Auto",
    $(go.Shape, "Diamond",
      { fill: "#c18828", stroke: "#d7b860", strokeWidth: 1.5 },
      new go.Binding("figure", "figure")),
    $(go.TextBlock, textStyle(),
      {
        margin: 8,
        maxSize: new go.Size(160, NaN),
        wrap: go.TextBlock.WrapFit,
        editable: true
      },
      new go.Binding("text").makeTwoWay())
  ),
  // four named ports, one on each side:
  makePort("T", go.Spot.Top, go.Spot.Top, false, true),
  makePort("L", go.Spot.Left, go.Spot.Left, true, true),
  makePort("R", go.Spot.Right, go.Spot.Right, true, true),
  makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false)
));

myFlowchart.nodeTemplateMap.add("Start",
$(go.Node, "Table", nodeStyle(),
  $(go.Panel, "Spot",
    $(go.Shape, "Circle",
      { desiredSize: new go.Size(70, 70), fill: "#64a86d", stroke: "#09d3ac", strokeWidth: 1.5 }),
    $(go.TextBlock, "Start", textStyle(),
      new go.Binding("text"))
  ),
  // three named ports, one on each side except the top, all output only:
  makePort("L", go.Spot.Left, go.Spot.Left, true, false),
  makePort("R", go.Spot.Right, go.Spot.Right, true, false),
  makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false)
));

myFlowchart.nodeTemplateMap.add("End",
$(go.Node, "Table", nodeStyle(),
  $(go.Panel, "Spot",
    $(go.Shape, "Circle",
      { desiredSize: new go.Size(60, 60), fill: "#a86a64", stroke: "#DC3C00", strokeWidth: 1.5 }),
    $(go.TextBlock, "End", textStyle(),
      new go.Binding("text"))
  ),
  // three named ports, one on each side except the bottom, all input only:
  makePort("T", go.Spot.Top, go.Spot.Top, false, true),
  makePort("L", go.Spot.Left, go.Spot.Left, false, true),
  makePort("R", go.Spot.Right, go.Spot.Right, false, true)
));

myFlowchart.nodeTemplateMap.add("Comment",
$(go.Node, "Auto", nodeStyle(),
  $(go.Shape, "File",
    { fill: "#828484", stroke: "#c4c9c9", strokeWidth: 2 }),
  $(go.TextBlock, textStyle(),
    {
      margin: 8,
      maxSize: new go.Size(200, NaN),
      wrap: go.TextBlock.WrapFit,
      textAlign: "center",
      editable: true
    },
    new go.Binding("text").makeTwoWay())
  // no ports, because no links are allowed to connect with a comment
));

myFlowchart.linkTemplate =
$(go.Link,  // the whole link panel
{
routing: go.Link.AvoidsNodes,
curve: go.Link.JumpOver,
corner: 5, toShortLength: 4,
relinkableFrom: true,
relinkableTo: true,
reshapable: true,
resegmentable: true,
// mouse-overs subtly highlight links:
mouseEnter: function(e, link) { link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)"; },
mouseLeave: function(e, link) { link.findObject("HIGHLIGHT").stroke = "transparent"; },
selectionAdorned: false
},
new go.Binding("points").makeTwoWay(),
$(go.Shape,  // the highlight shape, normally transparent
{ isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT" }),
$(go.Shape,  // the link path shape
{ isPanelMain: true, stroke: "gray", strokeWidth: 2 },
new go.Binding("stroke", "isSelected", function(sel) { return sel ? "dodgerblue" : "gray"; }).ofObject()),
$(go.Shape,  // the arrowhead
{ toArrow: "standard", strokeWidth: 0, fill: "gray" }),
$(go.Panel, "Auto",  // the link label, normally not visible
{ visible: false, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5 },
new go.Binding("visible", "visible").makeTwoWay(),
$(go.Shape, "RoundedRectangle",  // the label shape
    { fill: "#F8F8F8", strokeWidth: 0 }),
$(go.TextBlock, "Yes",  // the label
    {
    textAlign: "center",
    font: "10pt helvetica, arial, sans-serif",
    stroke: "#333333",
    editable: true
    },
    new go.Binding("text").makeTwoWay())
)
);

myFlowchart.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
myFlowchart.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;

return myFlowchart;
}

export default makeMyDiagram