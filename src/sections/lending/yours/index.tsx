import dynamic from 'next/dynamic';
import Loading from '@/components/loading';

const dynamicLoading = {
  loading: () => (
    <div className="w-full h-[100px] flex justify-center items-center">
      <Loading size={16} />
    </div>
  )
};

const LendingYours: any = {
  timeswap: dynamic(() => import("./timeswap"), { ...dynamicLoading }),
};

export default LendingYours;
