let baseUrl = 'https://slowbag.github.io/Diplom/';
let recvestUrl = 'http://localhost:1337';

let dataFloors;



$(function() 
{
    // ModelFloors
    $.ajax({
        url: recvestUrl + '/api/floors?populate=*',
        method: 'get',
        dataType: 'json',
        success: function(data)
        {   
            dataFloors = data.data; 
            renderMap();
        }
    });

    async function renderMap()
    {
        let [id, map, numberFloor, Opisanie, rooms] = ['', '', '', ''];
        for(let x in dataFloors)
        {
            id = dataFloors[x].id;
            map = dataFloors[x].attributes.Map.data.attributes;
            numberFloor = dataFloors[x].attributes.NumberFloor;
            Opisanie = dataFloors[x].attributes.Opisanie;
            rooms = dataFloors[x].attributes.rooms.data

            let activeTab = (x == 0) ? 'nav-link active':'nav-link';
            let activeTabPane = (x == 0) ? 'tab-pane fade show active':'tab-pane fade';
            let imageUrl = recvestUrl + map.formats.medium.url;

            $('#pills-tab').append(`
                <li class="nav-item" role="presentation">
                    <button class="${activeTab}" id="pills-${id}-tab" data-bs-toggle="pill" data-bs-target="#pills-${id}" type="button" role="tab" aria-controls="pills-${id}" aria-selected="true">${numberFloor}</button>
                </li>
            `)

            $('#pills-tabContent').append(`
                <div class="${activeTabPane}" id="pills-${id}" role="tabpanel" aria-labelledby="pills-${id}-tab" tabindex="0">
                    <img class="img-fluid" src="${imageUrl}">
                </div>
            `)
            for(let y in rooms)
            {
                let idRooms = rooms[y].id;
                let nameRoom = rooms[y].attributes.NomerRoom;
                let pointX = rooms[y].attributes.PointX;
                let pointY = rooms[y].attributes.PointY;

                $("#pills-"+id).append(`
                    <a style="position:absolute;z-index: 2; top:${pointY}px; left:${pointX}px;cursor: pointer;" val="${idRooms}" onclick="renderMain(this)" alt="${nameRoom}">
                        <img src="${baseUrl}src/content/image/geo-alt-fill.svg" alt="Bootstrap" width="32" height="32">
                    </a>
                `);
            }
        }
        console.log(dataFloors)
    }

    
});

