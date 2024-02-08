import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleFeedbackForm } from '../../features/common/commonSlice'

const useFeedbackForm = () => {
  const dispatch = useDispatch()
  
   const handleVisible = (type) => {
    dispatch(handleFeedbackForm({type}))
   }
  return [
     handleVisible
  ]
}

export default useFeedbackForm