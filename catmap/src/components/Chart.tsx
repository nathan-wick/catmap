import React, {FC, useContext} from 'react';
import {FacilitiesContext} from '../contexts/Facilities';
import {Facility} from '../types/Facility';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const Chart: FC<{thisFacilityData: Facility}> = ({thisFacilityData}) => {
  const {todayFacilityData} = useContext(FacilitiesContext);
  const chartData = todayFacilityData.map((hour, index) => {
    const militaryTime = index + 1;
    const time = militaryTime <= 12 ?
      `${militaryTime}am` : `${militaryTime - 12}pm`;
    const {capacity} = thisFacilityData.occupancy;
    const available = Number(hour.find((facility) =>
      facility.name === thisFacilityData.name)?.occupancy.available);
    const occupancy = capacity - available;

    return {
      time,
      occupancy,
    };
  });
  const {available, capacity} = thisFacilityData.occupancy;
  const lineColor = available < capacity / 4 ?
    '#EF476F' :
    available < capacity / 2 ?
      '#FFD166' :
      '#06D6A0';

  return <ResponsiveContainer
    width='90%'
    height={200}>
    <AreaChart
      data={chartData}>
      <defs>
        <linearGradient
          id='occupancy'
          x1='0'
          y1='0'
          x2='0'
          y2='1'>
          <stop
            offset='5%'
            stopColor={lineColor}
            stopOpacity={0.8}/>
          <stop
            offset='95%'
            stopColor={lineColor}
            stopOpacity={0.4}/>
        </linearGradient>
      </defs>
      <XAxis
        dataKey='time' />
      <YAxis
        domain={[0, thisFacilityData.occupancy.capacity]}/>
      <CartesianGrid
        stroke='#f5f5f5' />
      <Tooltip />
      <Area
        type='monotone'
        dataKey='occupancy'
        stroke={lineColor}
        fillOpacity={1}
        fill='url(#occupancy)' />
    </AreaChart>
  </ResponsiveContainer>;
};

export default Chart;
