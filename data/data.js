

//le but est de créer une liste qui contient des listes donc le nombre d'accident des communes ou de d'epartement qu'elle regroupe <10000 

export class Dep{  
    constructor(nom_dep,list_com,count){
        this.count=count
        this.nom_dep=nom_dep  
        this.list_com=list_com
        
        //this.list_com_optimise=list_com_optimise
    }
    
}












export async function getDep(){
    var liste_dep_reg=[]
    
    const res = await fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=1&facet=dep_name")

   
    const data=await res.json()

    //recuperer les données(nom,nombre d'accident) de tous les dep
    
    for(var i=0;i<data.facet_groups[0].facets.length;i++){ //iterer tous les dep
        if(data.facet_groups[0].facets[i].count>=10000){ //si le nombre d'accident dans un dep >10000 on peut pas recuperer ses accident donc on va recuperer ses departement
            const res1=await fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=1&facet=nom_com&refine.dep_name="+data.facet_groups[0].facets[i].name)
            const data1=await res1.json()
            //recuperer les données(nom,nombre d'accident) de toutes les com  du dep
            
            
            //creer un obj de type dep on lui associe un tableau de ses com 
            var dep=new Dep(data.facet_groups[0].facets[i].name,data1.facet_groups[0].facets,data.facet_groups[0].facets[i].count)
            liste_dep_reg.push(dep) 
           
        }
        else{ //sinon on ajoute directement le dep dans la liste
            liste_dep_reg.push(data.facet_groups[0].facets[i])
        }
    }

    
    //console.log(liste_dep)
    return liste_dep_reg
}
    
    //for(var i=0;i<data.facet_groups[0].facets.length;i++){
               //console.log(liste_dep[i])
           // }


    //print(liste_dep)


    /*var liste_dep=[]
    fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=1&facet=dep_name")
        .then((res)=>{return res.json()})
        .then((data)=>{ //console.log(data.facet_groups[0].facets)
            for(var i=0;i<data.facet_groups[0].facets.length;i++){
                liste_dep.push(data.facet_groups[0].facets[i].name)
            }
            getCom(liste_dep)
            //for(var i=0;i<data.facet_groups[0].facets.length;i++){
               //console.log(liste_dep[i])
            //}
            
            })    

}
*/
async function regroupe(){ //creer une liste qui va contenire des briques de com ou de dep donc le nombre d'accident <10000
    var compter=0
    var list=[]
   
    var list_regroupe_resultat_dep=[]
    var list_regroupe_resultat_com=[]
    var list_regroupe_dep=[] //une liste pour regrouper les dep
    var list_regroupe_com=[] //une liste pour regrouper les com
    
    var liste_dep=await getDep()  //recuperer la liste des dep 
    
    for(var i=0;i<liste_dep.length;i++){ //iterer la liste des dep
       
        if(liste_dep[i].count>=10000){ //si le nombre d'accident danas un dep >10000 on doit regrouper ses com
            
            for(var n=0;n<liste_dep[i].list_com.length;n++){
                
                compter=compter+liste_dep[i].list_com[n].count
                if(compter<=10000){
                    
                    list_regroupe_com.push(liste_dep[i].list_com[n])
                } //on regroupe les com une fois que le nombre d'accident >10000 on creer une autre liste
                else{
                    
                    list_regroupe_resultat_com.push(list_regroupe_com) //ajouter la liste de com regrouper 
                    list_regroupe_com=[liste_dep[i].list_com[n]]    //sauvgarder la valeur pour le prochain tour de boucle 
                    compter=0 //initialisation
                    compter=liste_dep[i].list_com[n].count
                }
            }
        }
        else{ //sinon on regrouper les dep donc le nombre d'accident <10000
            compter=compter+liste_dep[i].count
            if(compter<=10000){
                list_regroupe_dep.push(liste_dep[i])
                
            }
            else{
                //liste_dep.push(list_regroupe)
                list_regroupe_resultat_dep.push(list_regroupe_dep)
                list_regroupe_dep=[liste_dep[i]] //sauvgarder la valeur pour le prochain tour de boucle 
                compter=0 //initialisation
                compter=liste_dep[i].count
            }
        }
        
    }
    
    //console.log(list_regroupe_resultat_com)
    //onsole.log(list_regroupe_resultat_dep)
    list.push(list_regroupe_resultat_com)
    list.push(list_regroupe_resultat_dep)

    
    //console.log(list)
    return list
}





/*export async function getCom(){
    var liste_dep=[]
   
    //console.log(list_dep)
    var liste_dep=await getDep()
    //console.log(liste_dep)   

    
    
    var liste_com=[]
    for(var i=0;i<liste_dep.length;i++){
        
        
           
            //console.log(i)
            
                
                    if(liste_dep[i].count>=10000){
                        
                        
                        
        
                        
                        const res=await fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=9999&facet=nom_com&refine.dep_name="+liste_dep[i].nom_dep)
                        const data=await res.json()
                        for(var n=0;n<data.facet_groups[0].facets.length;n++){
                            var res1=await fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=9999&facet=nom_com&refine.nom_com="+data.facet_groups[0].facets[n].name)
                            var data1=await res1.json()
                            console.log(data1.nhits)
                            for(var t=0;t<data1.nhits;t++){
                                
                                var commune=new Com(data1.records[t].fields.nom_com,data1.records[t].fields.coordonnees)
                                liste_com.push(commune)
                                //console.log(liste_com)
                            }
                            
                        }
                        liste_dep[i].list_com=liste_com
                        console.log(liste_dep[i])
                        liste_com=[]
                        
                        //console.log(data.facet_groups[0].facets[n].name)  //17344     communes
                        
                        
                    }
                
        
                
            
    

    
    
    }
    //return liste_dep
    console.log(liste_dep)
    //console.log(appel)
    
}*/


async function click(){
    
    var nAccident=0 //compter le nombre d'accident
   
    var list_accidents=[]
    var requete=""
    const list_rubriques=await regroupe() //recuperer la liste ordonnée
    var list_rubriques_com=list_rubriques[0] //separer les deux listes
    var list_rubriques_dep=list_rubriques[1]
    for(var i=0;i<list_rubriques_com.length;i++){ //iterer la 1er liste 
        for(var j=0;j<list_rubriques_com[i].length;j++){ //iterer chaque liste de la liste_com
            requete=requete+"&refine.nom_com="+list_rubriques_com[i][j].name //cerer une requete avec les noms des com
        }
        //console.log(requete)
        const res=await fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=10000"+requete+"&disjunctive.nom_com=true")
        const data=await res.json() //recuperer les donner 
        requete="" //initialisation
        list_accidents.push(data.records) //ajouter tous les accident de toutes les commune de la liste
        nAccident+=data.records.length
        console.log(list_accidents) //afficher la liste chaque fois qu'on rajoute une liste qui regroupe des com donc le nombre d'accident<10000
        console.log("nombre d'accident retrouvés"+nAccident)
            
            
        
        
        
    }
    for(var i=0;i<list_rubriques_dep.length;i++){
        for(var j=0;j<list_rubriques_dep[i].length;j++){
            requete=requete+"&refine.dep_name="+list_rubriques_dep[i][j].name //creer la requete
        }
        //console.log(requete)
        const res=await fetch("https://public.opendatasoft.com/api/records/1.0/search/?dataset=accidents-corporels-de-la-circulation-millesime&q=&rows=10000"+requete+"&disjunctive.dep_name=true")
        const data=await res.json() //recuperer les données
        requete="" //initialisation
        list_accidents.push(data.records) //ajouter tous les accident de toutes les dep de la liste
        nAccident+=data.records.length
        console.log(list_accidents) //afficher la liste chaque fois qu'on rajoute une liste qui regroupe des dep donc le nombre d'accident<10000
        console.log("nombre d'accident retrouvés"+nAccident)
    }
    console.log(list_accidents)
    const fId=document.getElementById("finale")
    fId.style.color="green"
    fId.innerText=time

}

click()



//un timer pour calculer la durée sinon ouvrir la fenetre network 
var time=0
const tId=document.getElementById("time")
tId.style.color="red"
function timer() {
    time++
    tId.innerText=time+"s"

}
setInterval(timer, 1000)
  
  









