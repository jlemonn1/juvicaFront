import React from 'react';
import AppRoutes from './Routes';

import TrabajoProvider from './context/TrabajoContext';

function App() {
    return (
        <div className="App">
            <TrabajoProvider>
                <AppRoutes />
            </TrabajoProvider>
            
        </div>
    );
}

export default App;
