import React from 'react'
import SettingsElement from './SettingsElement'

const ProfileSettings = ({children, editMode, user, register, name, isLoading}) => {
  return (
    <div className='flex flex-col gap-y-6'>
        <SettingsElement isLoading={isLoading} register={register} name="name" inputValue={user?.name || ""} title="Name" editMode={editMode}/>
        <SettingsElement  isLoading={isLoading} inputValue={user?.email} title="Email" />
    </div>
  )
}

export default ProfileSettings