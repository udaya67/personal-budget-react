import React, { useEffect, useRef, useCallback } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import * as d3 from 'd3';

ChartJS.register(ArcElement, Tooltip, Legend);

function BudgetCharts({ data }) {
    const d3Container = useRef(null);

    const createD3Chart = useCallback(() => {
        if (!d3Container.current) return;

        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;

        d3.select(d3Container.current).selectAll("*").remove();

        const svg = d3.select(d3Container.current)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.title))
            .range([
                '#ffcd56', '#ff6384', '#36a2eb', '#fd6b19',
                '#4bc0c0', '#e74c3c', '#9b59b6', '#2ecc71'
            ]);

        const pie = d3.pie()
            .value(d => d.budget);

        const arc = d3.arc()
            .innerRadius(100)
            .outerRadius(radius);

        const arcs = svg.selectAll('.arc')
            .data(pie(data))
            .enter()
            .append('g')
            .attr('class', 'arc');

        arcs.append('path')
            .attr('d', arc)
            .attr('fill', d => color(d.data.title));

        arcs.append('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .attr('text-anchor', 'middle')
            .attr('font-size', '12px')
            .attr('fill', 'white')
            .text(d => d.data.title);
    }, [data]);

    useEffect(() => {
        if (data && data.length > 0) {
            createD3Chart();
        }
    }, [data, createD3Chart]);

    const chartData = {
        datasets: [{
            data: data.map(item => item.budget),
            backgroundColor: [
                '#ffcd56', '#ff6384', '#36a2eb', '#fd6b19',
                '#4bc0c0', '#9966ff', '#ff9f40', '#2ecc71'
            ]
        }],
        labels: data.map(item => item.title)
    };

    if (!data || data.length === 0) {
        return <div>Loading charts...</div>;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
            <div style={{ width: '400px', height: '400px' }}>
                <h2>Chart.js Pie Chart</h2>
                <Pie data={chartData} />
            </div>
            <div>
                <h2>D3.js Pie Chart</h2>
                <div ref={d3Container}></div>
            </div>
        </div>
    );
}

export default BudgetCharts;