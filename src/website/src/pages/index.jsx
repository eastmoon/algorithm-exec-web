// JavaScript framework
import dynamic from 'next/dynamic';

// Style framework
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Modules
import Logo from 'modules/logo';

//import Questionnaire from "modules/questionnaire";
const Questionnaire = dynamic(() => import('modules/questionnaire'), {
  ssr: false
});

// Layout style
const boxStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#aaaaaa',
    border: '2px solid white',
    width: '100%',
    height: '100%'
};

function HomePage({ stars }) {
    return <div style={boxStyle}>
        <Questionnaire />
    </div>
}

HomePage.getInitialProps = async ({ req }) => {
    const json = {
        version: "1.0.0.0"
    }
    console.log(`> Server-Side render : ${json}`)
    return { stars: json }
}

export default HomePage
