import React from 'react';
import UnService from './UnService';
// import menu2 from '../assets/img/menu2.jpg'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import traiteur from '../assets/img/cloche.png';
import son from '../assets/img/son.png';
import deco from '../assets/img/decoration.png';
import esth from '../assets/img/maquillage.png';
import secu from '../assets/img/securite.png';
import anim from '../assets/img/animateur.png';
import photo from '../assets/img/photographe.png';
import trans from '../assets/img/transport.png';
import habi from '../assets/img/habille.png';
import fleur from '../assets/img/fleuriste.png';
import sal from '../assets/img/ecole.png';
import lec from '../assets/img/lecole.png';


const SecondeSection = () => {
    return (
        <div className="bg-light py-6">
            <h1 className="texte-S">Quelques services proposés ! </h1>
            <Container>
                <Row  >
                    <Col xs={3}>
                        <UnService serviceName="Traiteur" serviceImg={traiteur} />
                    </Col>
                    <Col xs={3}>
                        <UnService serviceName="Sonorisation" serviceImg={son} />
                    </Col>
                    <Col xs={3}>
                        <UnService serviceName="Décoration" serviceImg={deco} />
                    </Col>
                    <Col xs={3}>
                        <UnService serviceName="Esthétique" serviceImg={esth} />
                    </Col>
                </Row >
                <Row  >
                    <Col xs={3}>
                        <UnService serviceName="Securité" serviceImg={secu} />
                    </Col>
                    <Col xs={3}>
                        <UnService serviceName="Animation" serviceImg={anim} />
                    </Col>
                    <Col xs={3}>
                        <UnService serviceName="Photographie" serviceImg={photo} />
                    </Col>
                    <Col xs={3}>
                        <UnService serviceName="Transport" serviceImg={trans} />
                    </Col>
                </Row >
                <Row  >
                    <Col xs={3}>
                        <UnService serviceName="Habillement" serviceImg={habi} />
                    </Col>
                    <Col xs={3}>
                        <UnService serviceName="Fleuriste" serviceImg={fleur} />
                    </Col>
                    <Col xs={3}>
                        <UnService serviceName="Main d'oeuvre" serviceImg={lec} />
                    </Col>
                    <Col xs={3}>
                        <UnService serviceName="Salle d'événement" serviceImg={sal} />
                    </Col>
                </Row>
                {/* <Row  >
                    <Col xs={3}>
                        <UnService serviceName="Traiteur" serviceImg={menu2} />
                    </Col>
                    <Col xs={3}>
                        <UnService serviceName="Traiteur" serviceImg={menu2} />
                    </Col>
                    <Col xs={3}>
                        <UnService serviceName="Traiteur" serviceImg={menu2} />
                    </Col>
                    <Col xs={3}>
                        <UnService serviceName="Traiteur" serviceImg={menu2} />
                    </Col>
                </Row> */}
            </Container>
        </div>    
    );
};

export default SecondeSection;