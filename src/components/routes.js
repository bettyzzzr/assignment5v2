import React from "react";

function Routes({ projection, routes, selectedAirlineID }) {
    // 如果 selectedAirlineID 为 null，返回空的 <g></g>
    if (selectedAirlineID === null) {
        return <g></g>;
    }

    // 筛选出符合 selectedAirlineID 的航线
    const selectedRoutes = routes.filter(route => route.airlineID === selectedAirlineID);

    return (
        <g>
            {selectedRoutes.map((route, index) => {
                const [x1, y1] = projection([route.sourceLongitude, route.sourceLatitude]);
                const [x2, y2] = projection([route.destinationLongitude, route.destinationLatitude]);

                return (
                    <line
                        key={index}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#2a5599"
                        strokeWidth={0.5}
                    />
                );
            })}
        </g>
    );
}

export { Routes };
