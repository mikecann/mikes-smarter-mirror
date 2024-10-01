import { $ } from 'bun'
import { resolve } from 'path'
import { exec } from 'child_process'
import { promisify } from 'util'

// Promisify exec to use async/await
const execAsync = promisify(exec)

// Get the project root directory relative to the current script
const projectRoot = resolve(__dirname, '..')

console.log(`[INFO] Starting pre-launch update process from: ${projectRoot}`)

// Function to get the current status of the Git repository
const getGitStatus = async () => {
  console.log(`[INFO] Fetching latest changes from Git in directory: ${projectRoot}`)
  const fetchResult = await $`git fetch --verbose`.cwd(projectRoot).text()
  console.log(`[INFO] Fetch result: ${fetchResult}`)

  console.log(`[INFO] Checking Git status...`)
  const gitStatus = await $`git status -uno`.cwd(projectRoot).text()
  console.log(`[INFO] Git status output:\n${gitStatus}`)

  return gitStatus
}

// Function to determine if the local branch is behind the remote
const isBranchBehind = (status: string) => {
  return status.includes('Your branch is behind')
}

// Function to pull the latest Git changes and install dependencies using Bun
const pullGitAndInstallDependencies = async () => {
  console.log(`[INFO] Pulling the latest changes from the remote repository...`)
  const pullResult = await $`git pull`.cwd(projectRoot).text()
  console.log(`[INFO] Pull result: ${pullResult}`)

  console.log(`[INFO] Installing dependencies using Bun...`)
  const installResult = await $`bun install`.cwd(projectRoot).text()
  console.log(`[INFO] Bun install result: ${installResult}`)
}

// Function to check for updates and update if needed
const checkAndUpdateIfNeeded = async () => {
  console.log(`[INFO] Checking for updates and updating if needed...`)
  const gitStatus = await getGitStatus()
  if (isBranchBehind(gitStatus)) await pullGitAndInstallDependencies()
  console.log(`[INFO] No updates found.`)
}

// Function to launch the Electron app without blocking the main flow
const launchElectronApp = () => {
  console.log(`[INFO] Launching the Electron app from: ${projectRoot}`)
  // Launch Electron as a background process without blocking
  const process = $`bun electron-vite preview . -- --fullscreen`.cwd(projectRoot)
  process
    .then(() => console.log(`[INFO] Electron app launched successfully.`))
    .catch((err) => console.error(`[ERROR] Electron app exited with error: ${err.message}`))
}

// Function to periodically check for updates and restart the app if needed
const startPeriodicUpdateCheck = async (interval: number) => {
  console.log(`[INFO] Starting periodic update checks every ${interval / 1000} seconds...`)
  setInterval(async () => {
    console.log(`[INFO] Periodic update check initiated...`)
    const status = await getGitStatus()
    if (!isBranchBehind(status)) {
      console.log(`[INFO] No updates found, skipping...`)
      return
    }

    console.log(`[INFO] Looks like there is an update available!`)

    if (process.platform === 'win32') {
      console.log(`[INFO] This is windows, not going to do anything right now.`)
      return
    }

    console.log(`[INFO] Rebooting..`)
    await $`sudo reboot`.cwd(projectRoot).text()

    launchElectronApp() // Launch the app in the background
  }, interval)
}

// Start the initial process
try {
  await checkAndUpdateIfNeeded()
  launchElectronApp() // Launch the app in the background
  // Start periodic update checks
  await startPeriodicUpdateCheck(10 * 1000)
} catch (error) {
  console.error(`[ERROR] Failed to complete the pre-launch process: ${(error as Error).message}`)
  process.exit(1) // Exit with an error code
}
