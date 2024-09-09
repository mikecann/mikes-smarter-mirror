import * as React from "react";
import { app, window as W, os } from "@neutralinojs/lib";
import { Box } from "../../components/Box";
import { FaCheck } from "react-icons/fa";
import { iife } from "../../utils/misc";

interface Props {}

export const AutoUpdater: React.FC<Props> = ({}) => {
  const [isUpdating, setIsUpdating] = React.useState(false);
  const [updateAvailable, setUpdateAvailable] = React.useState(false);

  // Helper function to run git commands via Neutralino's process API
  const runGitCommand = async (command: string) => {
    try {
      console.log("Executing git command:", command);
      const result = await os.execCommand(command);
      return result.stdOut;
    } catch (error) {
      console.error("Error executing git command", error);
      return null;
    }
  };

  // Function to check if there is an update available in the git repo
  const checkForUpdates = async () => {
    setIsUpdating(true);
    // Fetch remote updates (without merging)
    await runGitCommand("git fetch");

    // Compare local and remote branches
    const localCommit = await runGitCommand("git rev-parse HEAD");
    const remoteCommit = await runGitCommand("git rev-parse @{u}");

    const isUpdateAvailable = localCommit !== remoteCommit;
    console.log("checkForUpdates result:", { localCommit, remoteCommit, isUpdateAvailable });
    setUpdateAvailable(isUpdateAvailable);
    setIsUpdating(false);
  };

  // Function to pull the updates and restart the app
  const pullAndRestart = async () => {
    if (updateAvailable) {
      setIsUpdating(true);
      // Pull updates
      await runGitCommand("git pull");
      // Restart the app using Neutralino API
      app.restartProcess();
    }
  };

  // UseEffect to periodically check for updates
  React.useEffect(() => {
    const intervalId = setInterval(checkForUpdates, 60000); // Check every 60 seconds
    checkForUpdates();
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <Box style={{ fontSize: "0.7em" }}>
      {iife(() => {
        if (isUpdating) return <Box>Checking for updates...</Box>;

        if (updateAvailable) return <Box>Update available!</Box>;

        return (
          <Box>
            <FaCheck /> Mirror up to date
          </Box>
        );
      })}
    </Box>
  );
};
