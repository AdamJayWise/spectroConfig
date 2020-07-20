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

var sideInputSlitOptions = ['Manual Slit Assembly', 'SR-ASM-8011', 'ACC-SR-ASM-8003', 'SR-ASZ-0032', 'SR-ASZ-0095',  'SR-ASM-8053', 'SR-ASM-8055', 'SR-ASM-8054'];
var motorizedSlitCoverPlates = ['SR-ASM-0016'];
var manualSlitCoverPlates = ['SR-ASM-0025', 'SR-ASM-0026', 'SR-ASM-0027', 'SR-ASM-0028', 'SR-ASM-0029', 'SR-ASM-0100', 'SR-ASM-0106'];

// define a ky328i parent node

var nodeDefs = {
    'ky328i' : {
        'master' : true,
        'name' : 'Kymera 328',
        'partType' : 'spectrometer',
        'partNumber' : '',
        'options' : { 
            'Chassis Configuration' : ['A','B1']
        },
        'div' : d3.select('#configDiv'),
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
        'name' : 'A - 1 Slit Input, 1 Camera Output',
        'partType' : 'chassis',
        'partNumber' : 'KYMERA-328i-A',
        'options' : { 
            'Side Input Filter Wheel' : ['Spacer Only','ACC-SR-ASZ-7006'],
            'Side Input' : sideInputSlitOptions,
            'Direct Output' : ['MFL-SR-CCD']
        },
    },

    'B1' : {
        'name' : 'B1 - 1 Slit Input, 1 Camera Output, 1 Slit Output ',
        'partType' : 'chassis',
        'partNumber' : 'KYMERA-328i-B1',
        'options' : { 
            'Side Input Filter Wheel' : ['Spacer Only','ACC-SR-ASZ-7006'],
            'Side Input' : sideInputSlitOptions,
            'Direct Output' : ['MFL-SR-CCD'],
            'Side Output' : ['Manual Slit Assembly', 'SR-ASZ-0036']
        },
    },

// =========== filter wheels ===========================

'ACC-SR-ASZ-7006' : {
    'name' : 'Filter Wheel Assembly',
    'partType' : 'filter wheel',
    'partNumber' : 'ACC-SR-ASZ-7006',
    'options' : { 
    },
},

'Spacer Only' : {
    'name' : 'Spacer Only',
    'partType' : 'filter wheel',
    'partNumber' : '-',
    'options' : { 
    },
},

// =========== input flanges ===========================

'SR-ASM-8011' : {
    'name' : 'Fixed FC Fibre Adapter',
    'partType' : 'input flange',
    'partNumber' : 'SR-ASM-8011',
    'options' : { 
        
    },
},

'ACC-SR-ASM-8003' : {
    'name' : 'Fixed SMA Fibre Adapter',
    'partType' : 'input flange',
    'partNumber' : 'ACC-SR-ASM-8003',
    'options' : { 
        
    },
},

'SR-ASM-8053' : {
    'name' : 'Direct X-Y FC Fibre Coupler',
    'partType' : 'input flange',
    'partNumber' : 'SR-ASM-8053',
    'options' : { 
        
    },
},

'SR-ASM-8055' : {
    'name' : 'Direct X-Y FC-APC Fibre Coupler',
    'partType' : 'input flange',
    'partNumber' : 'SR-ASM-8055',
    'options' : { 
        
    },
},

'SR-ASM-8054' : {
    'name' : 'Direct X-Y SMA Fibre Coupler',
    'partType' : 'input flange',
    'partNumber' : 'SR-ASM-8054',
    'options' : { 
        
    },
},

// =========== slits ===================================

    'Manual Slit Assembly' : {
        'name' : 'Manual Slit Assembly',
        'partType' : 'slit',
        'partNumber' : '',
        'options' : { 
            'Cover Plate' : manualSlitCoverPlates,
            
        },
    },

    'SR-ASZ-0032' : {
        'name' : 'Motorized Slit Assembly',
        'partType' : 'slit',
        'partNumber' : 'SR-ASZ-0032',
        'options' : { 
            'cover plate' : motorizedSlitCoverPlates,
        },
    },

    'SR-ASZ-0036' : {
        'name' : 'Motorized Output Slit Assembly',
        'partType' : 'slit',
        'partNumber' : 'SR-ASZ-0036',
        'options' : { 
            'cover plates' : motorizedSlitCoverPlates,
        },
    },

    'SR-ASZ-0095' : {
        'name' : 'Wide Aperture Slit',
        'partType' : 'slit',
        'partNumber' : 'SR-ASZ-0095',
        'options' : { 

        },
    },

// =========== slit cover plates ===================================

    'SR-ASM-0025' : {
        'name' : '6 x 4 mm (W x H) Slit Cover Plate (included) ',
        'partType' : 'cover plate',
        'partNumber' : '', // SR-ASM-0025 but always included as default when an options
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

    'SR-ASM-0106' : {
        'name' : '&#8960;32 mm Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0106',
        'options' : { 
            
        },
    },

    // motorized 

    'SR-ASM-0016' : {
        'name' : '6 x 4 mm (W x H) Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : '', // SR-ASM-0016 but always included as default when an options
        'options' : { 
            
        },
    },

    'SR-ASM-0017' : {
        'name' : '6 x 6 mm (W x H) Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0017',
        'options' : { 
            
        },
    },

    'SR-ASM-0010' : {
        'name' : '6 x 8 mm (W x H) Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0010',
        'options' : { 
            
        },
    },

    'SR-ASM-0011' : {
        'name' : '6 x 14 mm (W x H) Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0011',
        'options' : {        
        },
    },

    'SR-ASM-0027' : {
        'name' : '&#8960;27 mm Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0027',
        'options' : {        
        },
    },

    'SR-ASM-0107' : {
        'name' : '&#8960;32 mm Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0107',
        'options' : { 
            
        },
    },



// =================== Output Flanges ===================  

'MFL-SR-CCD' : {
    'name' : 'Multichannel Detector Flange',
    'partType' : 'output flange',
    'partNumber' : 'MFL-SR-CCD',
    'options' : { 
        
    },
}, 

'SR-ASM-0065' : {
    'name' : 'Optical Cage System Adapter',
    'partType' : 'output flange',
    'partNumber' : 'SR-ASM-0065',
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


