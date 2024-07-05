import  {useState ,useEffect} from 'react'

const useGetSingleProduct = (id) => {
    const [obj, setObj] = useState(null);

    let getData = async () => {
        let data = await fetch(`https://dummyjson.com/products/${id}`);
        let jsondata = await data.json();
        setObj(jsondata);
        console.log(jsondata)
    }

    useEffect(() => {
        getData()
    },[])

    return obj ;

}

export default useGetSingleProduct
