//TODO
//redo data dictionary
//add the graphics
//complete all of habitats, get a better of an idea of how complex a whole unit will be (also, querying the db)
//start relationships again


//Sail.app.groupchatRoom to get room. Currently ie "wallcology-julia-fall2011"



WallCology = {
    rollcallURL: '/rollcall', //'http://rollcall.proto.encorelab.org',
    xmppDomain: 'proto.encorelab.org',
    groupchatRoom: null,
    
    init: function() {
        console.log("Initializing...")
        
        Sail.app.run = JSON.parse($.cookie('run'))
        if (Sail.app.run) {
            Sail.app.groupchatRoom = Sail.app.run.name+'@conference.'+Sail.app.xmppDomain
        }
        
        Sail.modules
            .load('Rollcall.Authenticator', {mode: 'multi-picker'})
            .load('Strophe.AutoConnector')
            .load('AuthStatusWidget')
            .thenRun(function () {
                Sail.autobindEvents(WallCology)
                
                $(document).ready(function() {
                    $('#reload').click(function() {
                        console.log("Disconnecting...")
                        Sail.Strophe.disconnect()
                        console.log("Reloading "+location+"...")
                        location.reload()
                    })

                    $('#connecting').show()
                    
                    $('#class-selection button').click(function() {
                        runName = $(this).data('run')
                        Sail.app.rollcall.fetchRun(runName, function(data) {
                            Sail.app.run = data.run
                            $.cookie('run', JSON.stringify(Sail.app.run))
                            location.href = '/observations.html'
                        })
                    })
                })

                $(Sail.app).trigger('initialized')
                return true
            })
    },
   
    
    observations: {
        
        init: function() {
            $('#tabs').tabs()
            $('#tabs').show()
            
            $('#new-habitat').hide()
            $('#open-habitat').hide()
            $('#add-to-discussion-habitat').hide()
            $('#new-organism').hide()
            $('#open-organism').hide()
            $('#new-relationship').hide()
            $('#view-relationships').hide()

            $('.jquery-radios').buttonset()
            
            $('.reload-button').click(function(){
            	location.reload()
            })

//**********HABITAT*************************************************************************************************
            $('#landing-habitat .new-button').click(function(){
            	$('#landing-habitat').hide()
            	$('#new-habitat').show()
            })
            $('#landing-habitat .view-button').click(function(){
            	$('#landing-habitat').hide()
            	$('#open-habitat').show()
            })
            
//**********NEW HABITAT*****************************************************************************************
        	$('#new-habitat .save-button').click(Sail.app.observations.newHabitatContent)

            $('#new-habitat .back-button').click(function(){
            	$('#new-habitat').hide()
            	$('#landing-habitat').show()
            })            
            
//**********OPEN HABITAT*********************************************************************************************            
            $('#open-habitat .back-button').click(function(){
            	$('#open-habitat').hide()
            	$('#landing-habitat').show()
            })
            $('#open-habitat .add-button').click(function(){
            	$('#open-habitat').hide()
            	$('#add-to-discussion-habitat').show()
            })
            

 			$.get("/mongoose/foo/bar/_find", 
			  function(data) {
				var resultArray
			    if (data.ok === 1) {
					console.log("Mongoose returned a data set")
					
					resultArray = data.results
					// TODO: loop over result and use it to change content of table
					/*for (var i = 0; i<resultArray.size(); i++) {
						resultArray[i]
					}*/
					
					return true
				}
				else {
					console.log("Mongoose request failed")
					return false
				}
			  }, "json")
			
			$('#table_id').dataTable()
            
/*            $('#open-habitat .habitat-table').dataTable({
					"aaData": [
						[ "Trident", "Internet Explorer 4.0", "Win 95+", 4, "X" ],
						[ "Trident", "Internet Explorer 5.0", "Win 95+", 5, "C" ],
						[ "Trident", "Internet Explorer 5.5", "Win 95+", 5.5, "A" ],
						[ "Trident", "Internet Explorer 6.0", "Win 98+", 6, "A" ],
						[ "Trident", "Internet Explorer 7.0", "Win XP SP2+", 7, "A" ],
						[ "Gecko", "Firefox 1.5", "Win 98+ / OSX.2+", 1.8, "A" ],
						[ "Gecko", "Firefox 2", "Win 98+ / OSX.2+", 1.8, "A" ],
						[ "Gecko", "Firefox 3", "Win 2k+ / OSX.3+", 1.9, "A" ],
						[ "Webkit", "Safari 1.2", "OSX.3", 125.5, "A" ],
						[ "Webkit", "Safari 1.3", "OSX.3", 312.8, "A" ],
						[ "Webkit", "Safari 2.0", "OSX.4+", 419.3, "A" ],
						[ "Webkit", "Safari 3.0", "OSX.4+", 522.1, "A" ]
					],
					"aoColumns": [
						{ "sTitle": "Engine" },
						{ "sTitle": "Browser" },
						{ "sTitle": "Platform" },
						{ "sTitle": "Version", "sClass": "center" },
						{
							"sTitle": "Grade",
							"sClass": "center",
							"fnRender": function(obj) {
								var sReturn = obj.aData[ obj.iDataColumn ];
								if ( sReturn == "A" ) {
									sReturn = "<b>A</b>";
								}
								return sReturn;
							}
						}
					]
			} )
*/          
			
			//these aren't working, correctly... TODO
            $(".select-habitat input[type='radio']").click(function(){
            	console.log("radio1")
            	/*var TEMP = $('#radio .select-habitat input[type='radio']:checked').val()*/
            	//do your database queries here
            })

            $(".select-criteria input[type='radio']").click(function(){
            	console.log("radio2")
            	/*var TEMP = $('#radio .select-habitat input[type='radio']:checked').val()*/
            	//do your database queries here
            })

            
//**********ADD TO DISCUSSION HABITAT*****************************************************************************************
                        
            $('#add-to-discussion-habitat .choose-keywords-button').click(function(){
            	//pop up with all keywords, pulled from discussion area
            })
            
            $('#add-to-discussion-habitat .save-button').click(Sail.app.observations.newDiscussionContent)
            $('#add-to-discussion-habitat .back-button').click(function(){
            	$('#add-to-discussion-habitat').hide()
            	$('#open-habitat').show()
            })         
            
            
//**********ORGANISM****************************************************************************************            

            $('#landing-organism .new-button').click(function(){
            	$('#landing-organism').hide()
            	$('#new-organism').show()
            })
            $('#landing-organism .view-button').click(function(){
            	$('#landing-organism').hide()
            	$('#open-organism').show()
            })
            
//**********NEW ORGANISM****************************************************************************************
            
        	$('#new-organism .save-button').click(Sail.app.observations.newOrganismContent)
            $('#new-organism .back-button').click(function(){
            	$('#new-organism').hide()
            	$('#landing-organism').show()
            })            

//**********OPEN ORGANISM***************************************************************************************
        	
            $('#open-organism .back-button').click(function(){
            	$('#open-organism').hide()
            	$('#landing-organism').show()
            })            
        	
        	
//**********RELATIONSHIPS***********************************************************************************
            $('#landing-relationships .new-button').click(function(){
            	$('#landing-relationships').hide()
            	$('#new-relationship').show()
            })
            $('#landing-relationships .view-button').click(function(){
            	$('#landing-relationships').hide()
            	$('#view-relationships').show()
            })
            
//**********NEW RELATIONSHIP***********************************************************************************          

            $('#new-relationship .save-button').click(Sail.app.observations.newRelationshipContent)
            $('#new-relationship .back-button').click(function(){
            	$('#new-relationships').hide()
            	$('#landing-relationships').show()
            })
            
//**********VIEW RELATIONSHIPS**********************************************************************************            
            
            $('#view-relationships .back-button').click(function(){
            	$('#view-relationships').hide()
            	$('#landing-relationships').show()
            })
			
//**********COUNTS******************************************************************************************			

			$('#new-counts-datepicker').datepicker()
			
			$('#new-counts .save-button').click(Sail.app.observations.newCountsContent)
            $('#new-counts .back-button').click(function(){
            	$('#new-counts').hide()
            	$('#open-counts').show()
            })
			
    	},

//***************************************************************************************************************
    	
        newHabitatContent: function() {
        	sev = new Sail.Event('new_observation',{
        		run:Sail.app.run,
        		type:'habitat',
        		wallscope:$("#new-habitat .select-wallscope-radios input[type='radio']:checked").val(),
        		environmental_conditions:$('#new-habitat .environmental-conditions').val(),
        		structural_features:$('#new-habitat .structural-features').val(),
        		organisms:$('#new-habitat .organisms').val(),
        		comments:$('#new-habitat .comments').val()
        		})
        	WallCology.groupchat.sendEvent(sev)
        },
        
        //this might be more generalizable with passed params
        newDiscussionContent: function() {
        	sev = new Sail.Event('new_discussion_content',{
        		run:Sail.app.run,
        		type:'discussion',
        		//evidence? pieces of habitat content that were queried (by id number?)
        		discussion_thread:'temp', //pulling from the dropdown
        		note:$('#add-to-discussion-habitat .note').val(),
        		headline:$('#add-to-discussion-habitat .headline').val(),
        		keywords:'something' //is this going to be plural? where the fuck do they think these things are going to be displayed?
        		})
        	WallCology.groupchat.sendEvent(sev)
        },
        
        //this is broken right now, waiting on Rokham... #radio-org is wrong (unlabelled)
        newOrganismContent: function() {
	        sev = new Sail.Event('new_observation',{
	        	run:Sail.app.run,
	        	type:'organism',
	        	chosen_organism:$("#radio-organism input[type='radio']:checked").val(),
	        	morphology:$('#new-organism .morphology').val(),
	        	behaviour:$('#new-organism .behaviour').val(),
	        	organisms:$('#new-organism .habitat').val(),
	        	comments:$('#new-organism .comments').val()
	        	})
	        WallCology.groupchat.sendEvent(sev)
        },
        
        newRelationshipContent: function() {
	        sev = new Sail.Event('new_relationship',{
	        	run:Sail.app.run,
	        	type:'relationship',
	        	//some stuff about the relationship
	        	//comments:$('#new-relationship .comments').val()
	        	})
	        WallCology.groupchat.sendEvent(sev)
        },

        newCountsContent: function() {
	        sev = new Sail.Event('new_count', {run:Sail.app.run,
	        	type:'count',
	        	chosen_habitat:$("#new-counts .select-habitat-radios input[type='radio']:checked").val(),
	        	temperature:$("#new-counts .temperature-radios input[type='radio']:checked").val(),
	        	light_level:$("#new-counts .light-level-radios input[type='radio']:checked").val(),
	        	humidity:$("#new-counts .humidity-radios input[type='radio']:checked").val(),
	        	scum_percent:$('#new-counts .count-scum-percent').val(),
	        	mold_percent:$('#new-counts .count-mold-percent').val(),
	        	blue_bug:[{
	        		count1:$('#new-counts .count-blue-bug1').val(),
	        		count2:$('#new-counts .count-blue-bug2').val(),
	        		count3:$('#new-counts .count-blue-bug3').val(),
	        		average:$('#new-counts .count-blue-bug4').val(),
	        		multiplier:$('#new-counts .count-blue-bug5').val(),
	        		final_count:$('#new-counts .count-blue-bug6').val(),
	        		}],
	        	green_bug:[{
	        		count1:$('#new-counts .count-green-bug1').val(),
	        		count2:$('#new-counts .count-green-bug2').val(),
	        		count3:$('#new-counts .count-green-bug3').val(),
	        		average:$('#new-counts .count-green-bug4').val(),
	        		multiplier:$('#new-counts .count-green-bug5').val(),
	        		final_count:$('#new-counts .count-green-bug6').val(),
	        		}],
	        	predator:[{
	        		count1:$('#new-counts .count-predator1').val(),
	        		count2:$('#new-counts .count-predator2').val(),
	        		count3:$('#new-counts .count-predator3').val(),
	        		average:$('#new-counts .count-predator4').val(),
	        		multiplier:$('#new-counts .count-predator5').val(),
	        		final_count:$('#new-counts .count-predator6').val(),
	        		}],
	        	date:$('#new-counts-datepicker').datepicker('getDate'),
	        	hour:$('#new-counts .hour').val(),
	        	minute:$('#new-counts .minute').val(),
	        	ampm:$("#new-counts .ampm-radios input[type='radio']:checked").val()
	        	})
	        WallCology.groupchat.sendEvent(sev)
        },

    },
   
//**********************************************************************************************************************************    
     
    discussion: {
    	init: function() {
    		
    	}
    },
    
    investigation: {
    	init: function() {
    		
    	}
    },
    

    authenticate: function() {
        console.log("Authenticating...")
        
        WallCology.rollcall = new Rollcall.Client(WallCology.rollcallURL)
        WallCology.token = WallCology.rollcall.getCurrentToken()

        if (!WallCology.run) {
            if ($.url.attr('file') != 'index.html')
                window.location.href = "/index.html"
        } else if (!WallCology.token) {
            Rollcall.Authenticator.requestLogin()
        } else {
            WallCology.rollcall.fetchSessionForToken(WallCology.token, function(data) {
                WallCology.session = data.session
                $(WallCology).trigger('authenticated')
            })
        }
    },
    
    events: {
        sail: {
            
        },
        
        initialized: function(ev) {
            WallCology.authenticate()
        },
        
        connected: function(ev) {
            WallCology.groupchat.join()
            $('#username').text(session.account.login)
      	    //$('#connecting').hide()						
        	jQuery('#top-level-dropdown').change(function(e){
        		window.location.href = jQuery('#top-level-dropdown').val();
        	})
            
            if (true) {
            	Sail.app.observations.init()
            } else if (false) {
            	Sail.app.discussions.init()
            } else if (false) {
            	Sail.app.experiment.init()
            }
             
        },
        
        authenticated: function(ev) {
            $('#connecting').hide()
        },
        
        logout: function(ev) {
            Sail.app.run = null
        }
    }
} 
    /*    phonegap: function() {
    $('#camera').click(function() {
        navigator.camera.getPicture(onSuccess, onFail, { quality: 15 }); 

        function onSuccess(imageData) {
          var image = document.getElementById('photo');
          image.src = "data:image/jpeg;base64," + imageData;
        }

        function onFail(message) {
          alert('Failed because: ' + message);
        }
    })
    
    $('#phonegap-info').html(JSON.stringify(navigator.device).replace(/,/g,',<br />'))
    
    navigator.accelerometer.watchAcceleration(
        function(acc) {
            $('#accelerometer').text("x: "+acc.x+", y:"+acc.y+", z:"+acc.z)
        }
    )
    
    navigator.compass.watchHeading(
        function(heading) {
            $('#compass').text(heading)
        }
    )
    
    navigator.geolocation.watchPosition(
        function(position) {
            $('#geolocation').text("Lat: "+acc.coords.latitude+", Long:"+acc.coords.longitude)
        }
    )
    
    $('#alert').click(function() {
        navigator.notification.alert("This is an alert!", null, "Uh oh!", "Okay")
    })
    
    $('#confirm').click(function() {
        navigator.notification.alert("This is a confirmation!", null, "Yay!", "Alright")
    })
    
    $('#beep').click(function() {
        navigator.notification.beep(3)
    })
    
    $('#vibrate').click(function() {
        navigator.notification.vibrate(1000)
    })
},
*/    
