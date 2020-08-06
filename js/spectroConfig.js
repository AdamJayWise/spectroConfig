// notes for a spectrometer configuration utility
/*
The idea here is to have a guide for quoting a spectrograph, with potentially the option to do some kind of performance
simulation as well, maybe?

the first stage would be working through how to 'confgigurate' a 328i.  The first choice would be to choose the chassis configuration

1. choose chassis config
2. choose gratings (and calculate resolution)
3.  Choose input coupling
4.  Choose output option (front port)
5. Choose output option (side port if relevant)
6.  Choose software option (if req'd, maybe optional)

SO how does this work?  Maybe there's a big row of buttons for chassis types, which then draw a spectrometer on-screen.
The chassis type adds 'slit' slots to the output and input ports

E.g., "A" config is slit (which can be upgraded) at the side input port, and a camera at the mount at the exit port
(and you have to choose the camera) which have a camera/slit icon at exit and entrance ports

Alternatively, "B2" has a slit at the side port, which can be upgraded, and two camera ports

So I'm pictureing an SVG with a kymera drawn on it.  Clicking on the kymera body lets you configure the chassis type.
The chassis would then determine what slots are available - e.g., C would have two input slit slots (side and direct)
and one camera output port.  You could click on the camera output port, because it's not configured yet, and pick which part would
apply.

Clicking on the turret would let you choose which gratings are chosen

Adding an accesory checks it's requirements?  (E.g., you )

Notes:
- clicking on a slit slot, you can upgrade or add an accessory.  some accessories might have their own accessories
- clicking on a camera slot would let you choose the flange
- would be nice to have a "target camera" option that would pick the output accessory for a particular camera
- The output is a laundry list of p/n's for that configuration


*/

// global spectrometer configuration


console.log('spectroQuip.js Adam Wise 2020');
var app = {'rectSize' :  10 }

// OK what's first maybe an SVG to display an icon for the spectrometer

class Node {
    constructor(configObj){
        var configKeys = Object.keys(configObj);
        var self = this;
        self.children = [];
        configKeys.forEach(function(k){
            self[k] = configObj[k];
        })

        //self.div = self.parent.div.append('div').attr('id',self.name + 'made during init')
        
        // function to create a node based on the value of option when select is changed
        self.nodeFromOption = function nodeFromOption(){
            console.log('self is ', self);
            console.log('this is', this)
            var selectHandle = d3.select(this).attr('handle');
            var parentSelect = d3.select(this.parentNode)
            //remove all child nodes when option changes
            var newChildren = [];
            self.children.forEach(function(child){
                console.log('this is', this)
                if (child.handle==selectHandle){
                    child.close()
                }
                else {
                    newChildren.push(child)
                }
            })
            self.children = newChildren;
            
            // create a new node based on selected option

            var newNodeDefs = nodeDefs[this.value];
            newNodeDefs.div = parentSelect.append('div');
            var newNode = new Node(newNodeDefs);
            newNode.handle = selectHandle;  
            console.log('newnode is ', newNode)
            // if current node doesn't have parents, make a parents property with current node as only thing
            self.children.push(newNode);
            //updatePartsList(rootNode);
            if (app.masterNode){
                formatNodes(app.masterNode)
                updatePartsList(app.masterNode)
                updateViz()
            }

            
        } // end nodefromoption
    
        // create a select for each group of options available
        this.selects = [];  
        var optionGroups = Object.keys(this.options);
        if (optionGroups.length > 0){
            for (var i in optionGroups){

                console.log('nodefromoption self is now ', self)
                
                var selectDiv = self.div.append('div').classed('configDiv', true).attr('id',optionGroups[i] + ' made during initialization');
                var selectLabel = selectDiv.append('div').html(optionGroups[i])
                
                var thisSelect = selectDiv.append('select');
                thisSelect.attr('handle',Math.random())
                thisSelect.on('change', self.nodeFromOption)
                this.selects.push(selectDiv);
                thisSelect
                    .selectAll('option')
                    .data(this.options[optionGroups[i]])
                    .enter()
                    .append('option')
                    .property('value', d=>d)
                    .html(function(d){
                        console.log(d)
                        return nodeDefs[d].name})
                    
                self.nodeFromOption.call(thisSelect.node());

            }
        }

        

    // for first option of each group of options, create a new node

    }

    close() {
          this.div.remove();
          //this.selects.forEach(d=>d.remove())  
          this.children.forEach(c=>c.close())
          delete this;
    }

    gatherParts(l = []){
        l.push(this);
        this.children.forEach(c=>c.gatherParts(l))
        return l;
    }
}







var rootNode = new Node(nodeDefs['ky328i'])
app.masterNode = rootNode;


function updatePartsList(someNode){
    console.log('toot')
    var l = someNode.gatherParts();
    d3.select('#partsList').selectAll('table').remove();
    var partTable = d3.select('#partsList').append('table')
    l.forEach(function(d){
        if (d.partNumber!==''){
            var partTr = partTable.append('tr')
            partTr.append('td').html(d.name);
            partTr.append('td').html(d.partNumber)
        }
    })
}


function formatNodes(someNode, marg = 0){
    someNode.selects.forEach(d=>d.style('margin-left', marg + 'px'));
    someNode.children.forEach(c=>formatNodes(c, marg + 20))
}


formatNodes(app.masterNode)
updatePartsList(app.masterNode)


// first get all the node into a flat list


function marshalNodes(someNode = null, ouput = []){
    someNode.x0 = Math.random()*100;
    someNode.y0 = Math.random()*100;
    someNode.r = app.rectSize;
    if (someNode.name != '-'){
        output.push(someNode);
    }
    someNode.children.forEach(d=>marshalNodes(d, output))
    return output
}

function marshalLinks(someNode = null, ouput = []){
    var thisHandle = someNode.handle;
    var thisNode = someNode;
    someNode.children.forEach(function(c){
        var newLink = {'source': thisHandle, 'target' : c.handle, 'dist' : app.rectSize * 2}
        if (thisNode.name != '-' && c.name != '-' ){
            output.push(newLink)
            marshalLinks(c, output)
        }
    })
    
    return output
}

var nodeList = marshalNodes(rootNode, output = [])
var linkList = marshalLinks(rootNode, output = [])

var dSVG = d3.select('#displaySvg')
var ws = d3.select('#displaySvg').style('width').split('px')[0]
var hs = d3.select('#displaySvg').style('height').split('px')[0]



var sim = d3.forceSimulation(nodeList)
    .force('center', d3.forceCenter(ws/2,hs/2))
    .force('charge', d3.forceManyBody().strength(-200))
    .force('collide', d3.forceCollide(d=>30))
    .force('links', d3.forceLink(linkList).id(d=>d.handle).distance(d=>d.dist))
    .on('tick', ticked);

var web = d3.select('svg')
    .selectAll('line')
    .data(linkList)
    .enter()
    .append('line')

function ticked(){
    
    u = d3.selectAll('g').attr('transform',d=>`translate(${d.x+','+d.y})`)

    var t = d3.selectAll('line')
                .attr('x1', d=>d.target.x)
                .attr('y1', d=>d.target.y)
                .attr('x2', d=>d.source.x)
                .attr('y2', d=>d.source.y)
                .attr('stroke', 'black')
                .style('stroke-width', '4px')
                .style('stroke-opacity', 0.1)
        
    
}

function equipmentTooltip(d,n,i){
    d3.select('body')
        .append('div')
        .classed('equipTip', true)
        .text(d)
}

function updateViz(){
    console.log('viz updating')
    var nodeList = marshalNodes(rootNode, output = [])
    var linkList = marshalLinks(rootNode, output = [])

    var lines = d3.select('svg')
        .selectAll('line')
        .data(linkList)
        
    lines.exit().remove();
    lines.enter().append('line')

    var vizGs = d3.select('svg')
                .selectAll('g')
                .data(nodeList, d=>d.handle + d.name)

    vizGs
        .exit()
        .remove()

    var vizGs = vizGs
        .enter()
        .append('g')
        //.on('mouseover', equipmentTooltip)
        .attr('transform',d=>`translate(${d.x0+','+d.y0})`)
        .append('text')
    

       
    d3.selectAll('g').selectAll('text')
        //.attr('text-anchor', 'start')
        .text(d=>(d.graphLabel))
        .attr('y',0)
        .attr('x', -app.rectSize * 1.5  )
        .attr('font-size', 10)

    console.log('poog')
    
    //d3.selectAll('g').selectAll('text').remove()
    //d3.selectAll('g').append('text').text(d=>d.name)

    d3.selectAll('g').selectAll('rect').remove()



    d3.selectAll('g').append('rect')
        .attr('width', app.rectSize)
        .attr('height', app.rectSize)
        .attr('x', -app.rectSize/2)
        .attr('y', -app.rectSize/2)
        .style('fill', 'none')
        .style('stroke', 'none')
        .style("z",1000)

    sim.nodes(nodeList)
    sim.force('links').links(linkList)

    sim.alpha(1).restart()
}

updateViz();