import React from 'react'
import ButtonCommon from '../Common/Button'

const PasswordSecurity = ({handlePasswordModal}) => {
  return (
    <div className='space-y-7'>
        <p className='text-light font-[400] text-[12px]'>Your password was changed on 20th May 2023.</p>
        <ButtonCommon 
         title="Change Password"
         className="!w-fit"
         onClick={handlePasswordModal}
        />
    </div>
  )
}

export default PasswordSecurity