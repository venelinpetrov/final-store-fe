import { useFetchProductsQuery } from "./store/products/api";

function App() {
    const { data } = useFetchProductsQuery();
    console.log(data?.content);
    return <>hi</>;
}

export default App;
