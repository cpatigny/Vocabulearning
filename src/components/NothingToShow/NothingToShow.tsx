import './NothingToShow.css';

interface NothingToShowProps {
  message: string;
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}

export const NothingToShow = ({ message, src, alt, className = '', children }: NothingToShowProps) => (
  <div className={`nothing-to-show ${className}`}>
    <img src={src} alt={alt}/>
    <p className='nothing-to-show-message'>{ message }</p>
    { children }
  </div>
);
