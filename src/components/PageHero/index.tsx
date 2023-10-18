import { Link } from 'react-router-dom';
import './style.scss';
interface Props {
  title: string;
}
export default function PageHero(props: Props) {
  return (
    <div className="page-hero">
      <div className="page-hero__center container">
        <h3>
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{props.title}</span>
        </h3>
      </div>
    </div>
  );
}
