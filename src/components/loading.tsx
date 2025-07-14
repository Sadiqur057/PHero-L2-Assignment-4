import { cn } from '@/lib/utils';

const Loading = ({ fullScreen = false, className = '' }) => {
  return (
    <div
      className={cn(
        fullScreen && 'min-h-screen w-full flex items-center justify-center',
        className
      )}
    >
      <div className='anim-box'>
        <div className='anim-interieur'>
          {
            Array.from({ length: 5 }, (_, i) => (
              <div key={i} className={`rect rect${i+1}`}/>

            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Loading;
