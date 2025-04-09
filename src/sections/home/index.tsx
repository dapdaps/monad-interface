import useIsMobile from '@/hooks/use-isMobile';
import Laptop from './laptop';
import Mobile from './mobile';

const Home = () => {

  const isMobile = useIsMobile()

    return (
        <>
            {
                isMobile ? <Mobile /> : <Laptop />
            }
        </>
    )
}
export default Home;