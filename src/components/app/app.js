import AppHeader from "../app-header/app-header";
import appStyles from './app.module.css'
import Main from "../main/main";
function App() {
    return (
        <div className={appStyles.app}>
            <AppHeader />
            <Main />
        </div>
    )
}

export default App;