import './App.css';
import Chat from'./page/chat/chat'
import Main from'./page/main/main'
import { BrowserRouter, Routes, Route} from "react-router-dom";
function App() {
  return (
    <div className="App">
<BrowserRouter>
<Routes>
<Route path='/' element={<Main/>}/>
<Route path='/chat/:id' element={<Chat/>}/>
</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
