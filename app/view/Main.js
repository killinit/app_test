Ext.define('test2.view.Main', {
extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        tabBarPosition: 'bottom',
        // layout: 'vbox',

        items: [
            {
                title: 'Welcome',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Welcome to Sencha Touch 2'
                },

                html: [
                    "You've just generated a new Sencha Touch 2 project. What you're looking at right now is the ",
                    "contents of <a target='_blank' href=\"app/view/Main.js\">app/view/Main.js</a> - edit that file ",
                    "and refresh to change what's rendered here."
                ].join("")
            },
            {
                title: 'Get Started',
                iconCls: 'action',

                items: [
                       
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Getting Started'
                    },
                    {
                        xtype: 'panel',
                        id: 'Panelik',
                        padding: 10,
                        cls: 'x-floating',
                        centered: true,
                        html: 'Consola',
                        items: [{
                            xtype: 'map',
                            useCurrentLocation: true,
                            id: 'map',
                            hidden: false,
                            height: 300,
                            width : 300,
                        },{
                            xtype: 'img',
                            id: 'obrazek',
                            width: 600,
                            height: 200,
                            hidden: true
                        }]
                    },
                    {
                        xtype: 'button',
                        id: 'geo',
                        text: 'geolocation test',
                        geocodeString: function(str, callback) {

                            // Build a Google Maps geocoder and its options
                            var geocoder = new google.maps.Geocoder(),
                                options = { address: str };

                            // Turn the string into a location
                            geocoder.geocode(options, function(results, status) {
                                if (status == "OK") {
                                    // callback(results[0].geometry.location);
                                    console.log(results[0].geometry.location);
                                } else {
                                    // callback(null);
                                }
                            });
                        },
                        handler: function() {
                            Ext.device.Geolocation.getCurrentPosition({
                                success: function(position) {
                                    console.log(position.coords);
                                    var imageView = Ext.getCmp('obrazek');
                                    imageView.hide();
                                    var panel = Ext.getCmp('Panelik');
                                    panel.setHtml('<strong>latitude: </strong>' + position.coords.latitude + '<br><strong>longitude: </strong>'+ position.coords.longitude + '<br>');
                                    
                                    // location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                                    var me  = Ext.getCmp('geo');
                                    Ext.getCmp('geo').geocodeString('warszawa', function(position) {

                                    });
                                    var map = Ext.getCmp('map').getMap();
                                    if (!me.markers) {
                                        me.markers = [];
                                    }
                                    // Drop a marker
                                    var marker = new google.maps.Marker({
                                        position: position,
                                        map: map,
                                        animation: google.maps.Animation.DROP
                                    });
                                    me.markers.push(marker);

                                    // Move the map there
                                    map.setOptions({
                                        center: position
                                    });
                                },
                                failure: function() {
                                    console.log('something went wrong!');
                                }
                            });
                        }
                    },{
                        xtype :'button',
                        iconCls: 'scan',
                        text: 'scan',
                        handler: function(){
                            Ext.device.Scanner.scan({
                                success: function(result){
                                    // console.log(result.format);
                                    // console.log(result.text);
                                    // alert(result);
                                    var panel = Ext.getCmp('Panelik');
                                    panel.setHtml("<strong>Format: </strong>" + result.format + "<br><strong>Text :</strong>" + result.text);
                                },
                                fail: function(error){
                                    alert("Scan failed");
                                }
                            })
                        }
                    },{
                        xtype: 'button',
                        id: 'code',
                        docked: 'bottom',
                        text: 'Camera test',
                        handler: function(){
                            var panel = Ext.getCmp('Panelik');
                            panel.setHtml('<strong>NSA cie widzi</strong>');
                            var imageView = Ext.getCmp('obrazek');
                            imageView.show();
                            Ext.device.Camera.capture({
                                success: function(image) {
                                    console.log(image);
                                    imageView.setSrc(image);
                            },
                            quality: 75,
                            width: 200,
                            height: 200,
                            destination: 'data'
                        });
                            
                        }
                    }
                ]
            }, 
        ]
    },
    //     initialize: function() {
    //     Ext.Viewport.add(
    //         {
    //             xtype: 'tabsidebar',
    //             indicator: {
    //                 text: 'Sencha sandbox',
    //                 iconMask: true,
    //                 iconCls: 'list',
    //                 iconAlign: 'left',
    //                 width: '35%'
    //             },
    //             header: 'Maciej sidebar',
    //             items: [
    //                 {
    //                     text: 'Home'
    //                 },
    //                 {
    //                     text: 'Imprint'
    //                 }
    //             ]
    //         }
    //     )
    // }
});
                                    
