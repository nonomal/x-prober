import React, { useCallback } from 'react'
import { StyledTitleLink } from '@/Title/src/components'
import store from '../stores'
import {
  OK,
  INSUFFICIENT_STORAGE,
  INTERNAL_SERVER_ERROR,
} from '@/Restful/src/http-status'
import { gettext } from '@/Language/src'
import serverFetch from '@/Fetch/src/server-fetch'
import { observer } from 'mobx-react-lite'

const UpdaterLink = observer(() => {
  const onClick = useCallback(async () => {
    const { setIsUpdating, setIsUpdateError } = store

    setIsUpdating(true)

    const { status } = await serverFetch('update')

    switch (status) {
      case OK:
        location.reload()
        return
      case INSUFFICIENT_STORAGE:
      case INTERNAL_SERVER_ERROR:
        alert(
          gettext(
            'Can not update file, please check the server permissions and space.'
          )
        )
        setIsUpdating(false)
        setIsUpdateError(true)
        return
    }

    alert(gettext('Network error, please try again later.'))
    setIsUpdating(false)
    setIsUpdateError(true)
  }, [])

  return (
    <StyledTitleLink title={gettext('Click to update')} onClick={onClick}>
      {store.notiText}
    </StyledTitleLink>
  )
})

export default UpdaterLink
