import * as React from 'react'
import { Box } from '../../components/Box'
import { FaCheck } from 'react-icons/fa'
import { iife } from '../../utils/misc'
import { shell  } from 'electron/common';

interface Props {}

export const AutoUpdater: React.FC<Props> = ({}) => {
  const [isChecking, setIsChecking] = React.useState(false)
  const [isUpdateAvailable, setIsUpdateAvailable] = React.useState(false)

  // Function to check if there is an update available in the git repo
  const checkForUpdates = async () => {
    setIsChecking(true)
    console.log(`Checking for updates...`)

    // Fetch remote updates (without merging)
    // await os.execCommand('git fetch')

    // // Compare local and remote branches
    // const localCommit = await os.execCommand('git rev-parse HEAD')
    // const remoteCommit = await os.execCommand('git rev-parse @{u}')

    // const isUpdateAvailable = localCommit !== remoteCommit
    // console.log('checkForUpdates result:', { localCommit, remoteCommit, isUpdateAvailable })
    // setIsUpdateAvailable(isUpdateAvailable)
    // setIsChecking(false)
  }

  // UseEffect to periodically check for updates
  React.useEffect(() => {
    const intervalId = setInterval(
      () => checkForUpdates().catch((e) => console.error('Error checking for updates', e)),
      60000
    ) // Check every 60 seconds
    return () => clearInterval(intervalId) // Cleanup on component unmount
  }, [])

  React.useEffect(() => {
    if (!isUpdateAvailable) return

    // iife(async () => {
    //   await os.execCommand('git pull')
    //   app.restartProcess()
    // }).catch((e) => console.error('Error updating app', e))
  }, [isUpdateAvailable])

  return (
    <Box style={{ fontSize: '0.7em' }}>
      {iife(() => {
        if (isChecking) return <Box>Checking for updates...</Box>

        if (isUpdateAvailable) return <Box>Update available! Restarting in 5 seconds..</Box>

        return (
          <Box>
            <FaCheck /> Mirror up to date
          </Box>
        )
      })}
    </Box>
  )
}
