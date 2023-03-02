let baseUrl = 'https://bf04-89-151-178-203.eu.ngrok.io'
let dataSecond;

$(function() 
{
    $.ajax({
        url: baseUrl + '/api/test-floors?populate[tests][populate]=ImageCab',
        method: 'get',
        dataType: 'json',
        success: function(data)
        {   
            dataSecond = data.data; 
        }
    });

    $.ajax({
        url: baseUrl + '/api/test-floors?populate=*',
        method: 'get',
        dataType: 'json',
        success: function(data)
        {   
            RenderMap(data); 
        }
    });

    async function RenderMap(floors)
    {
        console.log(floors.data)
        console.log("dataSecond:", dataSecond)
        floors = floors.data
        let [divRenderMap, navTab, navTabContent] = [$("#renderMap"), $("#nav-tab"), $("#nav-tabContent")]
        for(var x in floors)
        {
            let checkAcniveFloors = (x == 0)? "active" : '' ;
            
                navTab.append(`
                <button class="nav-link ${checkAcniveFloors}" id="nav-${floors[x].attributes.Floors}-tab" data-bs-toggle="tab" 
                data-bs-target="#nav-${floors[x].attributes.Floors}" type="button" role="tab" aria-controls="nav-${floors[x].attributes.Floors}" 
                aria-selected="true">${floors[x].attributes.Name}</button>
                `)

                navTabContent.append(`
                <div class="tab-pane fade show ${checkAcniveFloors}" id="nav-${floors[x].attributes.Floors}" role="tabpanel" aria-labelledby="nav-${floors[x].attributes.Floors}-tab" tabindex="0">
                <p>${floors[x].attributes.Floors}</p>
                <div class="col-sm-12">
                <img src="${baseUrl + floors[x].attributes.ImageFloors.data.attributes.formats.medium.url}" alt="${floors[x].attributes.Floors}" style="width: 100%;height: 100%;object-fit: contain;">
                </div>
                </div>
                `)

            for(var z in floors[x].attributes.tests.data)
            {
                let testsAtribute = "#" + "nav-" + floors[x].attributes.Floors;
                let urlImg = (dataSecond[x].attributes.tests.data[z].attributes.ImageCab.data != null) ? dataSecond[x].attributes.tests.data[z].attributes.ImageCab.data.attributes.url : '' ;
                let position_x = (dataSecond[x].attributes.tests.data[z].attributes.ImageCab.data != null) ? dataSecond[x].attributes.tests.data[z].attributes.position_point_x : '' ;
                let position_y = (dataSecond[x].attributes.tests.data[z].attributes.ImageCab.data != null) ? dataSecond[x].attributes.tests.data[z].attributes.position_point_y : '' ;
                $(testsAtribute).append(`
                <input class="favorite styled"
                type="button" style="z-index: 2;object-fit: contain;position: absolute;left: ${position_y}%;top: ${position_x}%;"
                value="${floors[x].attributes.tests.data[z].attributes.Name}" link="${urlImg}" onclick="EditImage(this);">
                `)
            }
        }
    }
});

function EditImage(el, urlLink)
{
    let link = $(el).attr('link')
    console.log(el, link)
    $("a-sky").attr('src', baseUrl + link);
}