// pages/dynamic.tsx

import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { Col, Container, Row } from "reactstrap";
import { useEffect, useState } from "react";

interface ApiResponse {
  name: string;
  timestamp: Date;
  staticData?: ApiResponse;
}

export const getStaticProps: GetStaticProps = async () => {
  const staticData = await fetch(
    `${process.env.NEXT_PUBLIC_APIURL}/api/hello`
  ).then((res) => res.json());
  return {
    props: {
      staticData,
    },
    revalidate: 10,
  };
};

const Static: NextPage = (props: {
  staticData?: ApiResponse;
  children?: React.ReactNode;
}) => {
  const [clientSideData, setClientSideData] = useState<ApiResponse>();

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setClientSideData(data));
  }, []);

  const fetchData = async () => {
    const data = await fetch("/api/hello").then((res) => res.json());
    setClientSideData(data);
  };
  return (
    <Container tag="main">
      <h1 className="my-5">Como funcionam as renderizações do Next.js</h1>

      <Row>
        <Col>
          <h3>Gerado estáticamente durante o build:</h3>
          <h2>{props.staticData?.timestamp.toString()}</h2>
        </Col>

        <Col>
          <h3>Gerado no cliente:</h3>
          <h2>{clientSideData?.timestamp.toString()}</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default Static;
