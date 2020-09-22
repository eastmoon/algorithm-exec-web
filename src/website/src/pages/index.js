// Style framework
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Modules
import Logo from 'modules/logo'


const boxStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#aaaaaa',
    border: '2px solid white',
    height: '100%'
};

const row1 = {
    height: '40%'
};

const row2 = {
    height: '60%'
};

function HomePage({ stars }) {
    return <Container fluid={true} style={boxStyle}>
        <Row style={row1}>
            <Col lg={6} className="border border-primary">1 of 2 演算項目</Col>
            <Col lg={6} className="border border-secondary">2 of 2 細部選項</Col>
        </Row>
        <Row style={row2}>
            <Col lg={12} className="border border-success">1 of 3 資訊呈現</Col>
        </Row>
    </Container>
}

HomePage.getInitialProps = async ({ req }) => {
    const json = {
        version: "1.0.0.0"
    }
    console.log(`> Server-Side render : ${json}`)
    return { stars: json }
}

export default HomePage
