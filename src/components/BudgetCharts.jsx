import React, { useEffect, useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import * as d3 from 'd3';
import axios from '../api/axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

function BudgetCharts() {
    const d3Container = useRef(null);
    const [chartData, setChartData] = useState({
        datasets: [{
            data: [30, 20, 15, 10, 10, 8, 7],
            backgroundColor: [
                '#ffcd56', '#ff6384', '#36a2eb', '#fd6b19', 
                '#4bc0c0', '#9966ff', '#ff9f40'
            ]
        }],
        labels: ['Rent', 'Food', 'Transport', 'Entertainment', 'Utilities', 'Insurance', 'Others']
    });

    const createD3Chart = () => {
        if (!d3Container.current) return;

        // Sample data
        const data = [
            { title: 'Rent', budget: 30 },
            { title: 'Food', budget: 20 },
            { title: 'Transport', budget: 15 },
            { title: 'Entertainment', budget: 10 },
            { title: 'Utilities', budget: 10 },
            { title: 'Insurance', budget: 8 },
            { title: 'Others', budget: 7 }
        ];

        d3.select(d3Container.current).selectAll("*").remove();

        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;

        const svg = d3.select(d3Container.current)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.title))
            .range(['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19', '#4bc0c0', '#9966ff', '#ff9f40']);

        const pie = d3.pie()
            .value(d => d.budget)
            .sort(null);

        const arc = d3.arc()
            .innerRadius(100)
            .outerRadius(radius);

        const arcs = svg.selectAll("arc")
            .data(pie(data))
            .enter()
            .append("g");

        arcs.append("path")
            .attr("d", arc)
            .attr("fill", d => color(d.data.title))
            .attr("stroke", "white")
            .style("stroke-width", "2px");

        arcs.append("text")
            .attr("transform", d => `translate(${arc.centroid(d)})`)
            .attr("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("fill", "white")
            .text(d => d.data.title);
    };

    useEffect(() => {
        createD3Chart();
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
            <div style={{ width: '400px', height: '400px' }}>
                <h2>Chart.js Pie Chart</h2>
                <Pie 
                    data={chartData}
                    options={{
                        plugins: {
                            legend: {
                                position: 'bottom'
                            }
                        },
                        responsive: true,
                        maintainAspectRatio: false
                    }}
                />
            </div>
            <div>
                <h2>D3.js Donut Chart</h2>
                <svg ref={d3Container}></svg>
            </div>
        </div>
    );
}

export default BudgetCharts;