import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import { Box } from './components/Box'
import { JoshieVids } from './plugins/joshie-vids/JoshieVids'
import { Clock } from './plugins/clock/Clock'
import { Weather } from './plugins/weather/Weather'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
        &nbsp;and <span className="ts">TypeScript</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <Box
        style={{
          position: 'relative',
          padding: '0px',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        <Box style={{ position: 'absolute', top: '0px', right: '0px', height: '100%' }}>
          <JoshieVids />
        </Box>
        <Box style={{ position: 'absolute', top: '20px', left: '20px' }}>
          <Clock />
        </Box>
        <Box style={{ position: 'absolute', bottom: '00px', left: '00px' }}>
          <Weather />
        </Box>
        <Box style={{ position: 'absolute', top: '20px', right: '20px' }}>
          {/* <AutoUpdater /> */}
        </Box>
      </Box>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
