

import App from "./App";
import GamePrivyProvider from "@/components/privy-provider";
import { LoginContainer } from '@/sections/terminal/login';

export default function Game2048() {

    return (
        <LoginContainer>
            <GamePrivyProvider>
                <App />
            </GamePrivyProvider>
        </LoginContainer>
    );
}