var sideInputSlitOptions = ['Manual Slit Assembly', 'SR-ASM-8011', 'ACC-SR-ASM-8003', 'SR-ASZ-0035', 'SR-ASZ-0086',  'SR-ASM-8053', 'SR-ASM-8055', 'SR-ASM-8054'];
var directInputSlitOptions = ['Manual Slit Assembly', 'SR-ASM-8011', 'ACC-SR-ASM-8003', 'SR-ASZ-0032', 'SR-ASZ-0095',  'SR-ASM-8053', 'SR-ASM-8055', 'SR-ASM-8054'];

var motorizedSlitCoverPlates = [ 'SR-ASM-0016 (Included)', 'SR-ASM-0017', 'SR-ASM-0010', 'SR-ASM-0011','SR-ASM-0072', 'SR-ASM-0107', ];
var wideApertureSlitCoverPlates = ['SR-ASM-0072 (Included)', 'SR-ASM-0016', 'SR-ASM-0017', 'SR-ASM-0010', 'SR-ASM-0011', 'SR-ASM-0107', ]
var manualSlitCoverPlates = ['SR-ASM-0025', 'SR-ASM-0026', 'SR-ASM-0027', 'SR-ASM-0028', 'SR-ASM-0029', 'SR-ASM-0100', 'SR-ASM-0106'];
var gratings = ['Empty Grating Slot','SR-GRT-0150-0300', 'SR-GRT-0150-0500', 'SR-GRT-0150-0800','SR-GRT-0150-1250', ];
var cameraFlanges = ['MFL-SR-CCD', 'MFL-SR-IKON-M', 'MFL-SR-IXON', 'MFL-SR-ISTAR-DIRECT', 'MFL-SR-ZYLA', 'MFL-SR-MARANA'];
var slitMountableAccessories = ['-', 'ACC-SR-ASZ-0056', 'SR-ASM-0038', 'SR-ASM-8006', 'SR-ASM-8001', 'SR-ASM-0065', 'SR-ASM-0013', 'SR-ASM-0002', 'SR-ASM-0021', 'SR-ASM-0014', 'SR-ASM-8056', 'SR-ASM-8052', 'SR-ASM-8069']
var sideOutputSlits = ['Manual Slit Assembly', 'SR-ASZ-0036', 'SR-ASM-0065', 'SR-ASM-8053', 'SR-ASM-8055','SR-ASM-8054', ]    


// define a ky328i parent node

var nodeDefs = {
    'ky328i' : {
        'master' : true,
        'handle' : 0,
        'name' : 'Kymera 328',
        'partType' : 'spectrometer',
        'partNumber' : '',
        'options' : { 
            'Configuration' : ['A','B1', 'B2', 'C']
        },
        'div' : d3.select('#configDiv'),
        'graphLabel' : '',
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
        'graphLabel' : 'A Chassis',
        'options' : { 
            'Side Input Filter Wheel' : ['Spacer Only','ACC-SR-ASZ-7006'],
            'Side Input Shutter' : ['-','Side Input Shutter'],
            'Side Input TrueRes' : ['-','Side Input TruRes Iris'],
            'Side Input' : sideInputSlitOptions,
            'Direct Output' : cameraFlanges,
            'Turret' : ['4-Position Grating Turret'],
        },
    },

    'B1' : {
        'name' : 'B1 - 1 Slit Input, 1 Camera Output, 1 Slit Output ',
        'partType' : 'chassis',
        'partNumber' : 'KYMERA-328i-B1',
        'graphLabel' : 'B1 Chassis',
        'options' : { 
            'Side Input Filter Wheel' : ['Spacer Only','ACC-SR-ASZ-7006'],
            'Side Input' : sideInputSlitOptions,
            'Side Input Shutter' : ['-','Side Input Shutter'],
            'Side Input TrueRes' : ['-','Side Input TruRes Iris'],
            'Direct Output' : cameraFlanges,
            'Side Output' : sideOutputSlits,
            'Turret' : ['4-Position Grating Turret'],
        },
    },

    'B2' : {
        'name' : 'B2 - 1 Slit Input, 2 Camera Outputs ',
        'partType' : 'chassis',
        'partNumber' : 'KYMERA-328i-B2',
        'graphLabel' : 'B2 Chassis',
        'options' : { 
            'Side Input Filter Wheel' : ['Spacer Only','ACC-SR-ASZ-7006'],
            'Side Input Shutter' : ['-','Side Input Shutter'],
            'Side Input TrueRes' : ['-','Side Input TruRes Iris'],
            'Side Input' : sideInputSlitOptions,
            'Direct Output' : cameraFlanges,
            'Side Output' : cameraFlanges,
            'Turret' : ['4-Position Grating Turret'],

        },
    },

    'C' : {
        'name' : 'C - 2 Slit Inputs, 1 Camera Outputs ',
        'partType' : 'chassis',
        'partNumber' : 'KYMERA-328i-B2',
        'graphLabel' : 'C Chassis',
        'options' : { 

            'Direct Input Shutter' : ['-','Direct Input Shutter'],
            'Direct Input TrueRes' : ['-','Direct Input TruRes Iris'],
            'Direct Input' : directInputSlitOptions,

            'Side Input Filter Wheel' : ['Spacer Only','ACC-SR-ASZ-7006'],
            'Side Input Shutter' : ['-','Side Input Shutter'],
            'Side Input TrueRes' : ['-','Side Input TruRes Iris'],
            'Side Input' : sideInputSlitOptions,
            'Direct Output' : cameraFlanges,
            'Turret' : ['4-Position Grating Turret'],

        },
    },


// =========== grating turret =========================


'4-Position Grating Turret' : {
    'name' : '4-Position Grating Turret',
    'partType' : 'turret',
    'partNumber' : '',
    'graphLabel' : 'Turret',
    //'fx' : 150,
    //'fy' : 250,
    'options' : { 
        'Grating 1' : gratings,
        'Grating 2' : gratings,
        'Grating 3' : gratings,
        'Grating 4' : gratings,
        },
    }
,



// =========== filter wheels ===========================

'ACC-SR-ASZ-7006' : {
    'name' : 'Filter Wheel Assembly',
    'partType' : 'filter wheel',
    'partNumber' : 'ACC-SR-ASZ-7006',
    'graphLabel' : 'Filter Wheel',
    'options' : { 
        'Filters' : ['Misc Filters']
        },
    }
,

'Misc Filters' : {
    'name' : '25mm Dia. Filters',
    'partNumber' : '*',
    'graphLabel' : 'Filters',
    'options' : {},

},

'Spacer Only' : {
    'name' : 'Spacer Only, No Filter Wheel',
    'partType' : 'filter wheel',
    'partNumber' : '',
    'options' : { 
    },
},

// =========== Trueres irises and shutters

'Side Input TruRes Iris' : {
    'name' : 'Side Input TruRes Iris',
    'partType' : 'iris',
    'partNumber' : 'SR-IRIS-SIDE',
    'graphLabel' : 'TrueRes Iris',
    'options' : { 
    },
},

'Direct Input TruRes Iris' : {
    'name' : 'Direct Input TruRes Iris',
    'partType' : 'iris',
    'partNumber' : 'SR-IRIS-DIR',
    'graphLabel' : 'TrueRes Iris',
    'options' : { 
    },
},

'Side Input Shutter' : {
    'name' : 'Side Input Shutter',
    'partType' : 'shutter',
    'partNumber' : 'SR-SHT-9006',
    'graphLabel' : 'Shutter',
    'options' : { 
    },
},

'Direct Input Shutter' : {
    'name' : 'Direct Input Shutter',
    'partType' : 'shutter',
    'partNumber' : 'SR-SHT-9007',
    'graphLabel' : 'Shutter',
    'options' : { 
    },
},




// =========== input flanges ===========================

'SR-ASM-8011' : {
    'name' : 'Fixed FC Fibre Adapter',
    'partType' : 'input flange',
    'partNumber' : 'SR-ASM-8011',
    'graphLabel' : 'Fixed FC Fibre Adapter',
    'options' : { 
        
    },
},

'ACC-SR-ASM-8003' : {
    'name' : 'Fixed SMA Fibre Adapter',
    'partType' : 'input flange',
    'partNumber' : 'ACC-SR-ASM-8003',
    'graphLabel' : 'Fixed SMA Adapter',
    'options' : { 
        
    },
},      

'SR-ASM-8053' : {
    'name' : 'Direct X-Y FC Fibre Coupler',
    'partType' : 'input flange',
    'partNumber' : 'SR-ASM-8053',
    'graphLabel' : 'Direct XY FC Adapter',
    'options' : { 
        
    },
},

'SR-ASM-8055' : {
    'name' : 'Direct X-Y FC-APC Fibre Coupler',
    'partType' : 'input flange',
    'partNumber' : 'SR-ASM-8055',
    'graphLabel' : 'Direct XY FC-APC Adapter',
    'options' : { 
        
    },
},

'SR-ASM-8054' : {
    'name' : 'Direct X-Y SMA Fibre Coupler',
    'partType' : 'input flange',
    'partNumber' : 'SR-ASM-8054',
    'graphLabel' : 'Direct XY SMA Adapter',
    'options' : { 
        
    },
},

'SR-ASM-8056' : {
    'name' : 'X-Y FC Fibre Coupler',
    'partType' : 'input flange',
    'partNumber' : 'SR-ASM-8056',
    'graphLabel' : 'XY FC Adapter',
    'options' : { 
        
    },
},

'SR-ASM-8052' : {
    'name' : 'X-Y SMA Fibre Coupler',
    'partType' : 'input flange',
    'partNumber' : 'SR-ASM-8052',
    'options' : { 
        
    },
},

'SR-ASM-8069' : {
    'name' : 'X-Y Ferrule Fibre Coupler',
    'partType' : 'input flange',
    'partNumber' : 'SR-ASM-8069',
    'options' : { 
        
    },
},



// =========== slits ===================================

    'Manual Slit Assembly' : {
        'name' : 'Manual Slit Assembly',
        'partType' : 'slit',
        'partNumber' : '',
        'graphLabel' : 'Manual Slit',
        'options' : { 
            'Cover Plate' : manualSlitCoverPlates,
            'Input Accessory' : slitMountableAccessories,
            
        },
    },

    

    // direct input port version
    'SR-ASZ-0032' : {
        'name' : 'Motorized Slit Assembly',
        'partType' : 'slit',
        'partNumber' : 'SR-ASZ-0032',
        'graphLabel' : 'Motorized Slit',
        'options' : { 
            'cover plate' : motorizedSlitCoverPlates,
            'Input Accessory' : slitMountableAccessories,
        },
    },

    // side input port version
    'SR-ASZ-0035' : {
        'name' : 'Motorized Slit Assembly',
        'partType' : 'slit',
        'partNumber' : 'SR-ASZ-0035',
        'graphLabel' : 'Motorized Slit',
        'options' : { 
            'cover plate' : motorizedSlitCoverPlates,
            'Input Accessory' : slitMountableAccessories,
        },
    },

    'SR-ASZ-0036' : {
        'name' : 'Motorized Output Slit Assembly',
        'partType' : 'slit',
        'partNumber' : 'SR-ASZ-0036',
        'options' : { 
            'Cover Plate' : motorizedSlitCoverPlates,
        },
    },

    // side input wide aperture slit
    'SR-ASZ-0086' : {
        'name' : 'Wide Aperture Slit',
        'partType' : 'slit',
        'partNumber' : 'SR-ASZ-0086',
        'options' : { 
            'Cover Plate' : wideApertureSlitCoverPlates,
            'Input Accessory' : slitMountableAccessories,
        },
    },

    // direct input wide aperture slit
    'SR-ASZ-0095' : {
        'name' : 'Wide Aperture Slit',
        'partType' : 'slit',
        'partNumber' : 'SR-ASZ-0095',
        'options' : { 
            'Cover Plate' : wideApertureSlitCoverPlates,
            'Input Accessory' : slitMountableAccessories,
        },
    },

// =========== slit-mountable exit attachments ===================================

'ACC-SR-ASZ-0056' : {
    'name' : 'Sample Chamber',
    'partType' : 'exit port accessory',
    'partNumber' : 'ACC-SR-ASZ-0056', 
    'options' : { 
        
    },
},

'SR-ASM-0038' : {
    'name' : 'F/# Matcher for NA = 0.22 Fibre',
    'partType' : 'exit port accessory',
    'partNumber' : 'SR-ASM-0038', 
    'options' : { 
        'F/# Adapter' : ['SR-ASM-0041', 'SR-ASM-0064'],
    },
},

'SR-ASM-0041' : {
    'name' : 'SMA Adapter for F/# Matcher',
    'partType' : 'exit port accessory',
    'partNumber' : 'SR-ASM-0041', 
    'options' : { 
    },
},

'SR-ASM-0064' : {
    'name' : 'FC Adapter for F/# Matcher',
    'partType' : 'exit port accessory',
    'partNumber' : 'SR-ASM-0064', 
    'options' : { 
    },
},

'SR-ASM-8006' : {
    'name' : 'X Adjustable Fibre Adapter, Ferrule Input',
    'partType' : 'exit port accessory',
    'partNumber' : 'SR-ASM-8006', 
    'options' : { 
    },
},

'SR-ASM-8001' : {
    'name' : 'Fixed Fibre Adapter, Ferrule Input',
    'partType' : 'exit port accessory',
    'partNumber' : 'SR-ASM-8001', 
    'options' : { 
    },
},

'SR-ASM-0065' : {
    'name' : 'Optical Cage System Adapter',
    'partType' : 'exit port accessory',
    'partNumber' : 'SR-ASM-0065', 
    'options' : { 
    },
},

'SR-ASM-0013' : {
    'name' : 'F-Mount Camera Lens Adapter',
    'partType' : 'exit port accessory',
    'partNumber' : 'SR-ASM-0013', 
    'options' : { 
    },
},

'SR-ASM-0002' : {
    'name' : '1.5" Flange Adapter for Newport Oriel Accessories',
    'partType' : 'exit port accessory',
    'partNumber' : 'SR-ASM-0002', 
    'options' : { 
    },
},


'SR-ASM-0021' : {
    'name' : 'C-Mount Adapter',
    'partType' : 'exit port accessory',
    'partNumber' : 'SR-ASM-0021', 
    'options' : { 
    },
},

'SR-ASM-0014' : {
    'name' : 'Pen-Ray Lamp Mount',
    'partType' : 'exit port accessory',
    'partNumber' : 'SR-ASM-0014', 
    'options' : { 
    },
},



// =========== slit cover plates ===================================

    'SR-ASM-0025' : {
        'name' : '6 x 4 mm (W x H) Slit Cover Plate (included) ',
        'partType' : 'cover plate',
        'partNumber' : '', // SR-ASM-0025 but always included as default when an options
        'graphLabel' : '6x4mm Cover Plate',
        'options' : { 
            
        },
    },

    'SR-ASM-0026' : {
        'name' : '6 x 6 mm (W x H) Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0026',
        'graphLabel' : '6x6mm Cover Plate',
        'options' : { 
            
        },
    },

    'SR-ASM-0027' : {
        'name' : '6 x 8 mm (W x H) Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0027',
        'graphLabel' : '6x8mm Cover Plate',
        'options' : { 
            
        },
    },

    'SR-ASM-0028' : {
        'name' : '6 x 10 mm (W x H) Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0028',
        'graphLabel' : '6x10mm Cover Plate',
        'options' : { 
            
        },
    },

    'SR-ASM-0029' : {
        'name' : '6 x 14 mm (W x H) Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0029',
        'graphLabel' : '6x14mm Cover Plate',
        'options' : {        
        },
    },

    'SR-ASM-0100' : {
        'name' : '&#8960;27 mm Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0100',
        'graphLabel' : '27mm-dia Cover Plate',
        'options' : {        
        },
    },

    'SR-ASM-0106' : {
        'name' : '&#8960;32 mm Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0106',
        'graphLabel' : '32mm-dia Cover Plate',
        'options' : { 
            
        },
    },

    // motorized 

    'SR-ASM-0016' : {
        'name' : '6 x 4 mm (W x H) Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0016', 
        'graphLabel' : '6x4mm Cover Plate',
        'options' : { 
            
        },
    },

    'SR-ASM-0016 (Included)' : {
        'name' : '6 x 4 mm (W x H) Slit Cover Plate (Included)',
        'partType' : 'cover plate',
        'partNumber' : '', // SR-ASM-0016 but always included as default when an options
        'graphLabel' : '6x4mm Cover Plate',
        'options' : { 
            
        },
    },

    'SR-ASM-0017' : {
        'name' : '6 x 6 mm (W x H) Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0017',
        'graphLabel' : '6x6mm Cover Plate',
        'options' : { 
            
        },
    },

    'SR-ASM-0010' : {
        'name' : '6 x 8 mm (W x H) Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0010',
        'graphLabel' : '6x8mm Cover Plate',
        'options' : { 
            
        },
    },

    'SR-ASM-0011' : {
        'name' : '6 x 14 mm (W x H) Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0011',
        'graphLabel' : '6x14mm Cover Plate',
        'options' : {        
        },
    },

    'SR-ASM-0072' : {
        'name' : '&#8960;27 mm Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-072',
        'graphLabel' : '27mm-dia Cover Plate',
        'options' : {        
        },
    },

    'SR-ASM-0072 (Included)' : {
        'name' : '&#8960;27 mm Slit Cover Plate (Included)',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0027',
        'graphLabel' : '27mm-dia Cover Plate',
        'options' : {        
        },
    },   

    'SR-ASM-0107' : {
        'name' : '&#8960;32 mm Slit Cover Plate',
        'partType' : 'cover plate',
        'partNumber' : 'SR-ASM-0107',
        'graphLabel' : '32mm-dia Cover Plate',
        'options' : { 
            
        },
    },



// =================== Output Flanges ===================  

'MFL-SR-CCD' : {
    'name' : 'Multichannel Detector Flange',
    'partType' : 'output flange',
    'partNumber' : 'MFL-SR-CCD',
    'graphLabel' : 'Camera Flange',
    'options' : { 
        
    },
}, 

'MFL-SR-IKON-M' : {
    'name' : 'iKon-M Mounting Flange',
    'partType' : 'output flange',
    'partNumber' : 'MFL-SR-IKON-M',
    'graphLabel' : 'iKon-M Flange',
    'options' : { 
        
    },
}, 

'MFL-SR-IXON' : {
    'name' : 'iXon Mounting Flange',
    'partType' : 'output flange',
    'partNumber' : 'MFL-SR-IXON',
    'graphLabel' : 'iXon Flange',
    'options' : { 
        
    },
}, 

'MFL-SR-ISTAR-DIRECT' : {
    'name' : 'iStar Mounting Flange',
    'partType' : 'output flange',
    'partNumber' : 'MFL-SR-ISTAR-DIRECT',
    'graphLabel' : 'iStar Flange',
    'options' : { 
        
    },
}, 

'MFL-SR-ZYLA' : {
    'name' : 'Zyla Mounting Flange',
    'partType' : 'output flange',
    'partNumber' : 'MFL-SR-ZYLA',
    'graphLabel' : 'Zyla Flange',
    'options' : { 
        
    },
}, 

'MFL-SR-MARANA' : {
    'name' : 'Marana Mounting Flange',
    'partType' : 'output flange',
    'partNumber' : 'MFL-SR-MARANA',
    'graphLabel' : 'Marana Flange',
    'options' : { 
        
    },
}, 

'SR-ASM-0065' : {
    'name' : 'Optical Cage System Adapter',
    'partType' : 'output flange',
    'partNumber' : 'SR-ASM-0065',
    'graphLabel' : 'Cage Adapter',
    'options' : { 
        
    },
},


/////////////////////// Gratings ///////////////////////

'Empty Grating Slot' : {
    'name' : '-',
    'partType' : 'grating',
    'partNumber' : '',
    'options' : { 
        
    },
},

'SR-GRT-0150-0300' : {
    'name' : '150 l/mm, 300nm Blaze, SR-GRT-0150-0300',
    'partType' : 'grating',
    'partNumber' : 'SR-GRT-0150-0300',
    'graphLabel' : '150l/mm, 300nm Blaze',
    'options' : { 
        
    },
},

'SR-GRT-0150-0500' : {
    'name' : '150 l/mm, 500nm Blaze, SR-GRT-0150-0500',
    'partType' : 'grating',
    'partNumber' : 'SR-GRT-0150-0500',
    'graphLabel' : '150l/mm, 500nm Blaze',
    'options' : { 
        
    },
},

'SR-GRT-0150-0800' : {
    'name' : '150 l/mm, 800nm Blaze, SR-GRT-0150-0800',
    'partType' : 'grating',
    'partNumber' : 'SR-GRT-0150-0800',
    'graphLabel' : '150l/mm, 800nm Blaze',
    'options' : { 
        
    },
},

'SR-GRT-0150-1250' : {
    'name' : '150 l/mm, 1250nm Blaze, SR-GRT-0150-1250',
    'partType' : 'grating',
    'partNumber' : 'SR-GRT-0150-1250',
    'graphLabel' : '150l/mm, 1250nm Blaze',
    'options' : { 
        
    },
},

}