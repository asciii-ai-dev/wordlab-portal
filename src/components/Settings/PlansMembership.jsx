import React from 'react'
import { useGetUsersUsageQuery } from '../../features/auth/authApi'
import { formatNumber } from '../../utils/helpers/formatText';

const PlansMembership = () => {
  const {data, isLoading} = useGetUsersUsageQuery()
  console.log(data)
  const usage = data?.payload;
  const words_used = parseFloat(usage?.words_used_perc)+10
  if(isLoading) return "loading...";
  return (
    <div>
        {data ? (
          <div className="flex flex-col gap-y-12 justify-center items-center">
          <div className="radial-progress items-center justify-center flex gap-y-1 flex-col text-primary font-[400]" style={{"--value": words_used, "--size": "150px", "--thickness": "0.5rem"}}>
              <p className='text-base-content text-[19px] font-[500]'>{"" ||usage?.words_used_perc}</p>
              <p className='text-[11px] text-light font-[400]'>Words Used</p>
          </div>
          <p className='text-base-content font-[600] text-[16px]'>{"" || formatNumber(usage?.words_used)} out of {"" ||  formatNumber(usage?.total_words)} words used</p>
          </div>
        ): (<h5 className='text-center uppercase text-base-content'>No data to show!</h5>)}
    </div>
  )
}

export default PlansMembership