import { $ } from 'bun'
import { resolve } from 'path'

// Get the project root directory relative to the current script
const projectRoot = resolve(__dirname, '..')

console.log(`[INFO] Starting pre-launch update process from: ${projectRoot}`)

const getGitStatus = async () => {
  console.log(`[INFO] Fetching latest changes from Git in directory: ${projectRoot}`)
  const fetchResult = await $`git fetch --verbose`.cwd(projectRoot).text()
  console.log(`[INFO] Fetch result: ${fetchResult}`)

  // Step 2: Check the status of the repository
  console.log(`[INFO] Checking Git status...`)
  const gitStatus = await $`git status -uno`.cwd(projectRoot).text()
  console.log(`[INFO] Git status output:\n${gitStatus}`)

  return gitStatus
}

const isBranchBehind = (status: string) => {
  return status.includes('Your branch is behind')
}

const pullGitAndInstallDependencies = async () => {
  // Pull the latest changes from the remote repository
  console.log(`[INFO] Pulling the latest changes from the remote repository...`)
  const pullResult = await $`git pull`.cwd(projectRoot).text()
  console.log(`[INFO] Pull result: ${pullResult}`)

  // Install the dependencies using Bun
  console.log(`[INFO] Installing dependencies using Bun...`)
  const installResult = await $`bun install`.cwd(projectRoot).text()
  console.log(`[INFO] Bun install result: ${installResult}`)
}

const checkAndUpdateIfNeeded = async () => {
  // Check for updates and update if needed
  console.log(`[INFO] Checking for updates and updating if needed...`)
  // Step 1: Fetch the latest changes from Git
  const gitStatus = await getGitStatus()

  if (isBranchBehind(gitStatus)) await pullGitAndInstallDependencies()
  else console.log(`[INFO] No updates found.`)
}

const launchElectronApp = async () => {
  // Step 3: Launch the Electron app from the root directory
  console.log(`[INFO] Launching the Electron app from: ${projectRoot}`)
  await $`bun electron-vite preview . -- --fullscreen`.cwd(projectRoot)
}

try {
  await checkAndUpdateIfNeeded()
  await launchElectronApp()
} catch (error) {
  console.error(`[ERROR] Failed to complete the pre-launch process: ${(error as Error).message}`)
  process.exit(1) // Exit with an error code
}
