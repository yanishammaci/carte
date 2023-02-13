

function initMap() {
    var location=[{lat:48.88, lng:2.33},{lat:47.886, lng:2.00}]
    const infoWindow = new google.maps.InfoWindow({content:"n_accident=123"}) //infoWindow.setContent("n_accident=123")
    var map= new google.maps.Map(document.getElementById("map"),{
        zoom:11,
        center: location[0]
        })
        var marker1,marker2
        

        

        
        marker1 = new google.maps.Marker({
            position: location[0],
            map,  //marker.setMap(map);
            label:"A",
            title: "Accident1",
            
        })

        marker2=new google.maps.Marker({
            position: location[1],
            map,  //marker.setMap(map);
            label:"A",
            title: "Accident2",
            
        })

        marker1.addListener("click",()=>{
            infoWindow.open(map, marker1);
        })

        marker2.addListener("click",()=>{
            infoWindow.open(map, marker2);
        } );




        

        

        


        
        
            
       
        console.log(marker)
        
        
       
    
    // To add the marker to the map, call setMap();
   
}



