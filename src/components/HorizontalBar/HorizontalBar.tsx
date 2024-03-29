import './HorizontalBar.css';

export const HorizontalBar = ({ text }: { text?: string }) => {
  return (
    <div className='bar'>
      <div className='left'></div>
      { text ? <div className='text'>{ text }</div> : null }
      <div className='right'></div>
    </div>
  );
};
