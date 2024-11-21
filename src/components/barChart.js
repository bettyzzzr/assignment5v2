import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import YAxis from "./axes";
import XAxis from "./axes";

export function BarChart(props) {
    const {
        offsetX,
        offsetY,
        data,
        height,
        width,
        selectedAirlineID,
        setSelectedAirlineID,
    } = props;

    const svgRef = useRef();

    // 1. 定义 color 函数
    const color = (airlineID) =>
        airlineID === selectedAirlineID ? "#992a5b" : "#2a5599";

    // 2. 定义 onMouseOver 函数
    const onMouseOver = (airlineID) => {
        setSelectedAirlineID(airlineID);
    };

    // 3. 定义 onMouseOut 函数
    const onMouseOut = () => {
        setSelectedAirlineID(null);
    };

    // 获取最大路线数量用于定义 x 轴的范围
    const maxRoutes = d3.max(data, (d) => d.count);

    // 定义 xScale 和 yScale
    const xScale = d3.scaleLinear().domain([0, maxRoutes]).range([0, width - offsetX]);

    const yScale = d3
        .scaleBand()
        .domain(data.map((d) => d.airline))
        .range([0, height - offsetY])
        .padding(0.2);

    // 绘制条形图
    useEffect(() => {
        const svg = d3.select(svgRef.current);

        svg.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", offsetX)
            .attr("y", (d) => yScale(d.airline))
            .attr("width", (d) => xScale(d.count))
            .attr("height", yScale.bandwidth())
            .attr("fill", (d) => color(d.airlineID)) // 使用 color 函数设置颜色
            .on("mouseover", (event, d) => onMouseOver(d.airlineID)) // 鼠标悬停事件
            .on("mouseout", onMouseOut) // 鼠标移出事件
            .attr("cursor", "pointer");
    }, [data, xScale, yScale, offsetX, selectedAirlineID]);

    return (
        <svg ref={svgRef} width={width} height={height} id="barchart">
            <XAxis scale={xScale} transform={`translate(${offsetX}, ${height - offsetY})`} />
            <YAxis scale={yScale} transform={`translate(${offsetX}, 0)`} />
        </svg>
    );
}
