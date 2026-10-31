
const mapDataElement = document.getElementById('campgrounds-data');

if (!mapDataElement) {
    console.error('Campgrounds map data not found.');
} else {
    const mapData = JSON.parse(mapDataElement.textContent);

    const maptilerApiKey = mapData.maptilerApiKey;
    const campgrounds = mapData.campgrounds;

    maptilersdk.config.apiKey = maptilerApiKey;

    const map = new maptilersdk.Map({
        container: 'cluster-map',
        style: maptilersdk.MapStyle.BRIGHT,
        center: [138.2529, 36.2048],
        zoom: 6
    });

    map.on('load', function () {
        map.addSource('campgrounds', {
            type: 'geojson',
            data: campgrounds,
            cluster: true,
            clusterMaxZoom: 14,
            clusterRadius: 50
        });

        // Cluster circles
        map.addLayer({
            id: 'clusters',
            type: 'circle',
            source: 'campgrounds',
            filter: ['has', 'point_count'],
            paint: {
                'circle-color': [
                    'step',
                    ['get', 'point_count'],
                    '#899b88',
                    10,
                    '#526e5c',
                    30,
                    '#263b32'
                ],
                'circle-radius': [
                    'step',
                    ['get', 'point_count'],
                    15,
                    10,
                    20,
                    30,
                    25
                ],
                'circle-stroke-width': 2,
                'circle-stroke-color': '#f5f3ed'
            }
        });

        // Cluster numbers
        map.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: 'campgrounds',
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12
            },
            paint: {
                'text-color': '#ffffff'
            }
        });

        // Individual campground markers
        map.addLayer({
            id: 'unclustered-point',
            type: 'circle',
            source: 'campgrounds',
            filter: ['!', ['has', 'point_count']],
            paint: {
                'circle-color': '#c7a77b',
                'circle-radius': 6,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff'
            }
        });

        // Zoom into a cluster when clicked
        map.on('click', 'clusters', async (e) => {
            const features = map.queryRenderedFeatures(e.point, {
                layers: ['clusters']
            });

            if (!features.length) return;

            const clusterId = features[0].properties.cluster_id;

            const zoom = await map
                .getSource('campgrounds')
                .getClusterExpansionZoom(clusterId);

            map.easeTo({
                center: features[0].geometry.coordinates,
                zoom
            });
        });

        // Open campground popup when an individual marker is clicked
        map.on('click', 'unclustered-point', function (e) {
            const { popUpMarkup } = e.features[0].properties;
            const coordinates = e.features[0].geometry.coordinates.slice();

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            if (popUpMarkup) {
                new maptilersdk.Popup()
                    .setLngLat(coordinates)
                    .setHTML(popUpMarkup)
                    .addTo(map);
            }
        });

        // Pointer cursor on hover
        map.on('mouseenter', 'clusters', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'clusters', () => {
            map.getCanvas().style.cursor = '';
        });

        map.on('mouseenter', 'unclustered-point', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'unclustered-point', () => {
            map.getCanvas().style.cursor = '';
        });
    });
}
