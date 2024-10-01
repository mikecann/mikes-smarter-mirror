// scripts/prelaunch.ts

import { $ } from 'bun'
import { resolve } from 'path'

// Get the project root directory relative to the current script
const projectRoot = resolve(__dirname, '..')

console.log(`[INFO] Starting pre-launch update process from: ${projectRoot}`)

try {
  // Step 1: Fetch the latest changes from Git
  console.log(`[INFO] Fetching latest changes from Git in directory: ${projectRoot}`)
  const fetchResult = await $`git fetch --verbose`.cwd(projectRoot).text()
  console.log(`[INFO] Fetch result: ${fetchResult}`)

  // Step 2: Check the status of the repository
  console.log(`[INFO] Checking Git status...`)
  const gitStatus = await $`git status -uno`.cwd(projectRoot).text()
  console.log(`[INFO] Git status output:\n${gitStatus}`)

  if (gitStatus.includes('Your branch is behind')) {
    console.log(`[INFO] New updates found. Pulling changes...`)
    const pullResult = await $`git pull`.cwd(projectRoot).text()
    console.log(`[INFO] Pull result: ${pullResult}`)

    console.log(`[INFO] Updates pulled successfully. Installing dependencies using Bun...`)
    const installResult = await $`bun install`.cwd(projectRoot).text()
    console.log(`[INFO] Bun install result: ${installResult}`)

    console.log(`[INFO] Dependencies installed successfully.`)
  } else {
    console.log(`[INFO] No updates found.`)
  }

  // Step 3: Launch the Electron app from the root directory
  console.log(`[INFO] Launching the Electron app from: ${projectRoot}`)
  await $`bun electron-vite preview . -- --fullscreen`.cwd(projectRoot)
} catch (error) {
  console.error(`[ERROR] Failed to complete the pre-launch process: ${(error as Error).message}`)
  process.exit(1) // Exit with an error code
}
