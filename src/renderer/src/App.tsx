import { Box } from './components/Box'
import { JoshieVids } from './plugins/joshie-vids/JoshieVids'
import { Clock } from './plugins/clock/Clock'
import { Weather } from './plugins/weather/Weather'
import { BattleTabsDash } from './plugins/battletabs-dash/BattleTabsDash'

function App(): JSX.Element {
  return (
    <>
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
        <Box style={{ position: 'absolute', top: '140px', left: '20px', width: "500px", height: "400px" }}>
          <BattleTabsDash />
        </Box>
        <Box style={{ position: 'absolute', bottom: '00px', left: '00px' }}>
          <Weather />
        </Box>
        <Box style={{ position: 'absolute', top: '20px', right: '20px' }}>
        </Box>
      </Box>
    </>
  )
}

export default App
