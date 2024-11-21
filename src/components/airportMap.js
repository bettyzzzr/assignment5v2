import React, { useRef, useEffect } from "react";
import { geoPath, geoMercator } from "d3-geo";
import { select } from "d3-selection";
import { Routes } from './routes';

function AirportMap(props) {
    const { width, height, countries, airports, routes, selectedAirlineID } = props;
    
    const svgRef = useRef();

    useEffect(() => {
        const svg = select(svgRef.current);
        
        // 1. 定义投影
        const projection = geoMercator()
            .scale(97)
            .translate([width / 2, height / 2 + 20]);
        
        // 2. 定义路径生成器
        const pathGenerator = geoPath().projection(projection);

        // 3. 绘制世界地图
        svg.selectAll('path')
            .data(countries.features)
            .join('path')
            .attr('d', pathGenerator)
            .attr('fill', '#eee')
            .attr('stroke', '#ccc');

        // 4. 绘制机场
        svg.selectAll('circle')
            .data(airports)
            .join('circle')
            .attr('cx', d => projection([d.longitude, d.latitude])[0])
            .attr('cy', d => projection([d.longitude, d.latitude])[1])
            .attr('r', 1)
            .attr('fill', '#2a5599');
        
    }, [countries, airports, width, height]);

    return (
        <svg ref={svgRef} width={width} height={height} id="map">
            <g>
                <Routes projection={projection} routes={routes} selectedAirlineID={selectedAirlineID} />
            </g>
        </svg>
    );
}

export { AirportMap };
