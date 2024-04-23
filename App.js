import { GameProvider } from './src/context/GameContext';
import AppNavigation from './src/routes/AppNavigation';
import GameScreen from './src/views/GameScreen';

export default function App() {
  return (
    <GameProvider>
      <AppNavigation/>
    </GameProvider>
  );
}
