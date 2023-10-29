import {Routes, Route} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store";
import Layout from "./pages/Layout/Layout.tsx";



const App = () => {
  return (
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Layout/>}>

          </Route>
        </Routes>
      </Provider>
  );
};

export default App;
