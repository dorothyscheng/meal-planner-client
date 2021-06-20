import { Link } from 'react-router-dom';
import CSS from 'csstype';

interface queryOption {
    parameter: string,
    query: string,
    image: string,
}

const QueryCard = (props: queryOption): JSX.Element => {
    const link = '/recipes?' + props.parameter + '=' + props.query + '&health=alcohol-free';
    const style: CSS.Properties = {
        backgroundImage: `url(${props.image})`,
    }
    return (
        <Link className="query-card-link" to={link}>
            <div className="query-container">
                <div className="card query-card" style={style}>
                    {/* <h2 className="query-title">{props.query.toUpperCase()}</h2> */}
                </div>
                <div className="query-overlay">
                    <h2 className="query-title">{props.query.toUpperCase()}</h2>
                </div>
            </div>
        </Link>
    );
}

export default QueryCard