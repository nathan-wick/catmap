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
// @ts-ignore
import colors from '../styles/custom.scss';

const Chart: FC<{thisFacilityData: Facility}> = ({thisFacilityData}) => {
  const {todayFacilityData, estimatedFacilityData} =
    useContext(FacilitiesContext);
  const {available, capacity} = thisFacilityData.occupancy;
  const chartData = estimatedFacilityData?.map((hour, index) => {
    const militaryTime = index + 1;
    const time = militaryTime <= 12 ?
      `${militaryTime}am` : `${militaryTime - 12}pm`;
    const todayHour = todayFacilityData[index];
    const estimatedAvailable =
      Number(estimatedFacilityData[index].find((facility) =>
        facility.name === thisFacilityData.name)?.occupancy.available);
    let actualOccupancy: number | undefined;
    let estimatedOccupancy = capacity - estimatedAvailable;

    if (todayHour) {
      const availableToday = Number(todayHour.find((facility) =>
        facility.name === thisFacilityData.name)?.occupancy.available);
      actualOccupancy = capacity - availableToday;
    }

    if (estimatedOccupancy < 0) {
      estimatedOccupancy = 0; // TODO Problem here
    }

    return {
      time,
      actualOccupancy,
      estimatedOccupancy,
    };
  });
  const lineColor = available < capacity / 4 ?
    colors.danger :
    available < capacity / 2 ?
      colors.warning :
      colors.success;

  return <ResponsiveContainer
    width='90%'
    height={200}>
    <AreaChart
      data={chartData}>
      <defs>
        <linearGradient
          id='actualOccupancy'
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
        <linearGradient
          id='estimatedOccupancy'
          x1='0'
          y1='0'
          x2='0'
          y2='1'>
          <stop
            offset='5%'
            stopColor={colors.secondary}
            stopOpacity={0}/>
          <stop
            offset='95%'
            stopColor={colors.secondary}
            stopOpacity={0}/>
        </linearGradient>
      </defs>
      <XAxis
        dataKey='time' />
      <YAxis
        domain={[0, capacity]}/>
      <CartesianGrid
        stroke='#f5f5f5' />
      <Tooltip />
      <Area
        name='Actual'
        type='monotone'
        dataKey='actualOccupancy'
        stroke={lineColor}
        fillOpacity={1}
        fill='url(#actualOccupancy)' />
      <Area
        name='Estimated'
        type='monotone'
        dataKey='estimatedOccupancy'
        stroke={colors.secondary}
        fillOpacity={1}
        fill='url(#estimatedOccupancy)' />
    </AreaChart>
  </ResponsiveContainer>;
};

export default Chart;
