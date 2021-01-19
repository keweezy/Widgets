import { useEffect, useState} from 'react'



const Route = ({ path, children }) => {

    const [currentpath, setCurrentpath] = useState(window.location.pathname)
    
    useEffect(() => {
        const onLocationChange = () => {
            console.log('Location Change')
            setCurrentpath(window.location.pathname)
        }
        window.addEventListener('popstate', onLocationChange);

        return () => {
            window.removeEventListener('popstate', onLocationChange)
        }
    }, []);

  return currentpath === path ? children : null;
};

export default Route;