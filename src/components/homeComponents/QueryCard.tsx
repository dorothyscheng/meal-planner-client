import { Link } from 'react-router-dom';

interface queryOption {
    parameter: string,
    query: string
}

const QueryCard = (props: queryOption): JSX.Element => {
    const link = '/recipes?' + props.parameter + '=' + props.query;
    return (
        <Link to={link}>
            <div className="query-card">
                {props.query.toUpperCase()}
            </div>
        </Link>
    );
}

export default QueryCard