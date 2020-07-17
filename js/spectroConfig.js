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
var app = {}

// OK what's first maybe an SVG to display an icon for the spectrometer

class Node {
    constructor(configObj){
        var configKeys = Object.keys(configObj);
        var self = this;
        self.children = [];
        configKeys.forEach(function(k){
            self[k] = configObj[k];
        })

        if (self.master = true){
            self.indentLevel = 0;
        }

        // function to create a node based on the value of option when select is changed
        self.nodeFromOption = function nodeFromOption(){
            console.log('self is ', self);
            console.log('this is', this)
            //remove all child nodes when option changes
            self.children.forEach(function(child){child.close()})
            self.children = [];
            // create a new node based on selected option

            var newNode = new Node(nodeDefs[this.value]);
            newNode.indentLevel = self.indentLevel + 10;
            // if current node doesn't have parents, make a parents property with current node as only thing
            self.children.push(newNode);
            //updatePartsList(rootNode);
            if (app.masterNode){
                formatNodes(app.masterNode)
                updatePartsList(app.masterNode)
            }
        }
    
        // create a select for each group of options available
        this.selects = [];  
        var optionGroups = Object.keys(this.options);
        if (optionGroups.length > 0){
            for (var i in optionGroups){
                var thisSelect = d3.select('#configDiv').append('select');
                thisSelect.on('change', self.nodeFromOption)
                thisSelect.style('margin-left', 10*self.indentLevel + 'px')
                this.selects.push(thisSelect);
                thisSelect
                    .selectAll('option')
                    .data(this.options[optionGroups[i]])
                    .enter()
                    .append('option')
                    .property('value', d=>d)
                    .html(d=>nodeDefs[d].name)
                    
                self.nodeFromOption.call(thisSelect.node());


            }
        }

        

    // for first option of each group of options, create a new node

    }

    close() {
          this.selects.forEach(d=>d.remove())  
          this.children.forEach(c=>c.close())
          delete this;
    }

    gatherParts(l = []){
        l.push(this);
        this.children.forEach(c=>c.gatherParts(l))
        return l;
    }
}

// define a ky328i parent node

var nodeDefs = {
    'ky328i' : {
        'master' : true,
        'name' : 'Kymera 328',
        'partType' : 'spectrometer',
        'partNumber' : '',
        'options' : { 
            'chassis' : ['A','B1']
        },
        'parents' : [],
    },

// =========== blank def ========================================

'-' : {
    'name' : '-',
    'partType' : '',
    'partNumber' : '',
    'options' : { 
    },
},

// =========== configurations ===================================

    'A' : {
        'name' : 'A Congfiguration',
        'partType' : 'chassis',
        'partNumber' : 'KYMERA-328i-A',
        'options' : { 
            'slit' : ['Manual Slit Assembly','SR-ASZ-0032']
        },
    },

    'B1' : {
        'name' : 'B1 Congfiguration',
        'partType' : 'chassis',
        'partNumber' : 'KYMERA-328i-B1',
        'options' : { 
            
        },
    },

// =========== slits ===================================

    'Manual Slit Assembly' : {
        'name' : 'Manual Slit Assembly',
        'partType' : 'slit',
        'partNumber' : 'standard',
        'options' : { 
            'cover plate' : ['SR-ASM-0025', 'SR-ASM-0026', 'SR-ASM-0027', 'SR-ASM-0028', 'SR-ASM-0029', 'SR-ASM-0100'],
        },
    },

    'SR-ASZ-0032' : {
        'name' : 'Motorized Slit Assembly',
        'partType' : 'slit',
        'partNumber' : 'SR-ASZ-0032',
        'options' : { 
            'cover plate' : ['SR-ASM-0016']
        },
    },

    'Wide Aperture Slit' : {
        'name' : 'Wide Aperture Slit',
        'partType' : 'slit',
        'partNumber' : 'SR-ASZ-0095',
        'options' : { 

        },
    },

// =========== slit cover plates ===================================

    'SR-ASM-0025' : {
        'name' : '6 x 4 mm (W x H) Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0025',
        'options' : { 
            
        },
    },

    'SR-ASM-0026' : {
        'name' : '6 x 6 mm (W x H) Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0026',
        'options' : { 
            
        },
    },

    'SR-ASM-0027' : {
        'name' : '6 x 8 mm (W x H) Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0027',
        'options' : { 
            
        },
    },

    'SR-ASM-0028' : {
        'name' : '6 x 10 mm (W x H) Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0028',
        'options' : { 
            
        },
    },

    'SR-ASM-0029' : {
        'name' : '6 x 14 mm (W x H) Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0029',
        'options' : {        
        },
    },

    'SR-ASM-0100' : {
        'name' : '&#8960;27 mm Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0100',
        'options' : {        
        },
    },

    'SR-ASM-0016' : {
        'name' : '6 x 4 mm (W x H) Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : '',
        'options' : { 
            
        },
    }
}

var testObj = {'a':100,'b':200}

var rootNode = new Node(nodeDefs['ky328i'])
app.masterNode = rootNode;


function updatePartsList(someNode){
    console.log('toot')
    var l = someNode.gatherParts();
    d3.select('#partsList').selectAll('ul').remove();
    var partUl = d3.select('#partsList').append('ul')
    l.forEach(function(d){
        if (d.partNumber!==''){
            partUl.append('li').html(d.name + ' , ' + d.partNumber);
        }
    })
}


function formatNodes(someNode, marg = 0){
    someNode.selects.forEach(d=>d.style('margin-left', marg + 'px'));
    someNode.children.forEach(c=>formatNodes(c, marg + 10))
}


formatNodes(app.masterNode)
updatePartsList(app.masterNode)


