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


        // function to create a node based on the value of option when select is changed
        function nodeFromOption(){
            console.log(this.value);
            //remove all child nodes when option changes
            self.children.forEach(function(child){child.close()})
            self.children = [];
            // create a new node based on selected option
            self.children.push(new Node(nodeDefs[this.value]));
            //updatePartsList(rootNode);
            if (app.masterNode){
                updatePartsList(app.masterNode)
            }
        }
    
        // create a select for each group of options available
        this.selects = [];  
        var optionGroups = Object.keys(this.options);
        if (optionGroups.length > 0){
            for (var i in optionGroups){
                var thisSelect = d3.select('body').append('select');
                thisSelect.on('change', nodeFromOption)
                this.selects.push(thisSelect);
                thisSelect
                    .selectAll('option')
                    .data(this.options[optionGroups[i]])
                    .enter()
                    .append('option')
                    .text(d=>d)
                    
                nodeFromOption.call(thisSelect.node());


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
        l.push(this.partNumber);
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
        'partNumber' : 'ky328i',
        'options' : { 
            'chassis' : ['A','B1']
        },
    },

    'A' : {
        'name' : 'A Congfiguration',
        'partType' : 'chassis',
        'partNumber' : 'KYMERA-328i-A',
        'options' : { 
            'slit' : ['Manual Slit Assembly','Motorized Slit Assembly']
        },
    },

    'B1' : {
        'name' : 'A Congfiguration',
        'partType' : 'chassis',
        'partNumber' : 'KYMERA-328i-B1',
        'options' : { 
            
        },
    },

    'Manual Slit Assembly' : {
        'name' : 'Manual Slit Assembly',
        'partType' : 'slit',
        'partNumber' : 'standard',
        'options' : { 
            
        },
    },

    'Motorized Slit Assembly' : {
        'name' : 'Motorized Slit Assembly',
        'partType' : 'slit',
        'partNumber' : 'SR-ASZ-0035',
        'options' : { 
            'cover plate' : ['cover plate 1', 'cover plate 2']
        },
    },

    'cover plate 1' : {
        'name' : 'Slit Cover Plate 1',
        'partType' : 'cover plate',
        'partNumber' : '...',
        'options' : { 
            
        },
    },

    'cover plate 2' : {
        'name' : 'Slit Cover Plate 2',
        'partType' : 'cover plate',
        'partNumber' : '...',
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
    console.log(l)
    d3.select('#partsList').selectAll('div').remove();
    l.forEach(function(d){
        d3.select('#partsList').append('div').text(d);
    })
}

updatePartsList(rootNode)