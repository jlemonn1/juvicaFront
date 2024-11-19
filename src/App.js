import React from 'react';
import AppRoutes from './routes';

import TrabajoProvider from './context/TrabajoContext';
import CategoryProvider from './context/CategoryContext';

function App() {
    
    const config = {
        apiUrl : "https://juvicamove.es"
    }

    return (
        <div className="App">
            <CategoryProvider config={config}>
                <TrabajoProvider config={config}>
                    <AppRoutes config={config}/>
                </TrabajoProvider>
            </CategoryProvider>
            
        </div>
    );
}

export default App;
