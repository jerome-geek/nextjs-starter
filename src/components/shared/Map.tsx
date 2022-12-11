import { useEffect, useRef } from 'react';
import { useScript } from 'usehooks-ts';

const KaKaoMap = ({ address }: { address?: string }) => {
    const container = useRef(null);
    const scriptStatus = useScript(
        `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false&libraries=services`,
    );

    useEffect(() => {
        if (scriptStatus === 'ready') {
            const kakao = window.kakao;
            kakao.maps.load(() => {
                const mapContainer = container.current;
                const mapOption = {
                    center: new kakao.maps.LatLng(37.4825, 127.0424),
                    level: 1,
                };

                const map = new kakao.maps.Map(mapContainer, mapOption);
                const geocoder = new kakao.maps.services.Geocoder();

                if (address) {
                    geocoder.addressSearch(
                        address,
                        (result: any, status: any) => {
                            if (status === kakao.maps.services.Status.OK) {
                                const coords = new kakao.maps.LatLng(
                                    result[0].y,
                                    result[0].x,
                                );
                                const marker = new kakao.maps.Marker({
                                    map: map,
                                    position: coords,
                                });
                                map.setCenter(coords);
                                marker.setMap(map);
                            }
                        },
                    );
                } else {
                    const polygonPath = [
                        new kakao.maps.LatLng(37.482441, 127.0424808),
                        new kakao.maps.LatLng(37.482739, 127.042359),
                        new kakao.maps.LatLng(37.48261, 127.041961),
                        new kakao.maps.LatLng(37.482509, 127.04201),
                        new kakao.maps.LatLng(37.48259, 127.04224),
                        new kakao.maps.LatLng(37.482326, 127.04236),
                    ];

                    const polygon = new kakao.maps.Polygon({
                        path: polygonPath,
                        strokeWeight: 3,
                        strokeColor: '#E15F42',
                        strokeOpacity: 1,
                        strokeStyle: 'solid',
                        fillColor: '#E15F42',
                        fillOpacity: 0.5,
                    });

                    kakao.maps.event.addListener(map, 'click', () => {
                        window.open('http://kko.to/bZadVZhX1d');
                    });

                    polygon.setMap(map);
                }
            });
        }
    }, [address, scriptStatus]);

    return <div ref={container}></div>;
};

export default KaKaoMap;
